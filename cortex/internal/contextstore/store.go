package contextstore

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	_ "modernc.org/sqlite"
)

const (
	schemaVersion = 1
)

var (
	// ErrConsistencyFault indicates indexed metadata pointing at a missing/corrupt payload file.
	ErrConsistencyFault = errors.New("contextstore consistency fault")
)

// Config defines on-disk layout.
type Config struct {
	RootDir    string
	RecordsDir string
	DBPath     string
}

// Store manages append-only payloads and metadata index/heads.
type Store struct {
	db         *sql.DB
	recordsDir string
}

// Record contains a stored revision.
type Record struct {
	RecordID  string
	Namespace string
	Key       string
	Revision  int64
	Actor     string
	CreatedAt string
	Checksum  string
	Payload   json.RawMessage
}

// Selector defines deterministic record selection criteria.
type Selector struct {
	Namespaces    []string `json:"namespaces,omitempty"`
	Keys          []string `json:"keys,omitempty"`
	RevisionScope string   `json:"revision_scope,omitempty"` // head|all
	Order         []string `json:"order,omitempty"`
	Limit         int      `json:"limit,omitempty"`
}

// Open initializes schema and storage directories.
func Open(ctx context.Context, cfg Config) (*Store, error) {
	if cfg.RootDir == "" {
		cfg.RootDir = "."
	}
	if cfg.RecordsDir == "" {
		cfg.RecordsDir = filepath.Join(cfg.RootDir, "data", "records")
	}
	if cfg.DBPath == "" {
		cfg.DBPath = filepath.Join(cfg.RootDir, "data", "index", "context.db")
	}

	if err := os.MkdirAll(cfg.RecordsDir, 0o755); err != nil {
		return nil, err
	}
	if err := os.MkdirAll(filepath.Dir(cfg.DBPath), 0o755); err != nil {
		return nil, err
	}

	dsn := fmt.Sprintf("file:%s?_busy_timeout=5000&_fk=1", cfg.DBPath)
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}

	s := &Store{db: db, recordsDir: cfg.RecordsDir}
	if err := s.migrate(ctx); err != nil {
		_ = db.Close()
		return nil, err
	}

	return s, nil
}

// Close closes the DB handle.
func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) migrate(ctx context.Context) (err error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	if _, err = tx.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS schema_version (
	version INTEGER PRIMARY KEY,
	applied_at TEXT NOT NULL
)`); err != nil {
		return err
	}

	var version int
	err = tx.QueryRowContext(ctx, `SELECT version FROM schema_version ORDER BY version DESC LIMIT 1`).Scan(&version)
	if err != nil {
		if !errors.Is(err, sql.ErrNoRows) {
			return err
		}
		version = 0
	}

	if version > schemaVersion {
		return fmt.Errorf("db schema version %d newer than supported %d", version, schemaVersion)
	}

	for version < schemaVersion {
		switch version + 1 {
		case 1:
			if _, err = tx.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS records (
	record_id TEXT PRIMARY KEY,
	namespace TEXT NOT NULL,
	key_name TEXT NOT NULL,
	revision INTEGER NOT NULL,
	actor TEXT NOT NULL,
	created_at TEXT NOT NULL,
	checksum TEXT,
	file_path TEXT NOT NULL,
	UNIQUE(namespace, key_name, revision)
)`); err != nil {
				return err
			}

			if _, err = tx.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS heads (
	namespace TEXT NOT NULL,
	key_name TEXT NOT NULL,
	head_revision INTEGER NOT NULL,
	head_record_id TEXT NOT NULL,
	updated_at TEXT NOT NULL,
	PRIMARY KEY(namespace, key_name),
	FOREIGN KEY(head_record_id) REFERENCES records(record_id)
)`); err != nil {
				return err
			}

			if _, err = tx.ExecContext(ctx, `CREATE INDEX IF NOT EXISTS idx_records_ns_key_rev ON records(namespace, key_name, revision)`); err != nil {
				return err
			}
		}

		version++
		if _, err = tx.ExecContext(ctx, `INSERT INTO schema_version (version, applied_at) VALUES (?, ?)`, version, time.Now().UTC().Format(time.RFC3339)); err != nil {
			return err
		}
	}

	return tx.Commit()
}

// AppendInput defines a new write.
type AppendInput struct {
	Namespace string
	Key       string
	Actor     string
	Payload   json.RawMessage
}

// AppendRecord appends a new immutable revision and advances heads atomically in SQLite.
func (s *Store) AppendRecord(ctx context.Context, in AppendInput) (_ Record, err error) {
	ns, err := sanitizePathPart(in.Namespace)
	if err != nil {
		return Record{}, fmt.Errorf("namespace: %w", err)
	}
	key, err := sanitizePathPart(in.Key)
	if err != nil {
		return Record{}, fmt.Errorf("key: %w", err)
	}
	if strings.TrimSpace(in.Actor) == "" {
		return Record{}, errors.New("actor required")
	}
	if len(in.Payload) == 0 {
		return Record{}, errors.New("payload required")
	}
	if !json.Valid(in.Payload) {
		return Record{}, errors.New("payload must be valid JSON")
	}

	now := time.Now().UTC().Format(time.RFC3339)
	recordID := fmt.Sprintf("rec_%d", time.Now().UTC().UnixNano())

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return Record{}, err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	var rev int64
	if err = tx.QueryRowContext(ctx, `SELECT COALESCE(MAX(revision), 0) + 1 FROM records WHERE namespace = ? AND key_name = ?`, ns, key).Scan(&rev); err != nil {
		return Record{}, err
	}

	relPath := filepath.Join(ns, key, fmt.Sprintf("%d.json", rev))
	absPath := filepath.Join(s.recordsDir, relPath)
	if err = os.MkdirAll(filepath.Dir(absPath), 0o755); err != nil {
		return Record{}, err
	}
	if err = os.WriteFile(absPath, in.Payload, 0o644); err != nil {
		return Record{}, err
	}

	_, err = tx.ExecContext(ctx, `
INSERT INTO records (record_id, namespace, key_name, revision, actor, created_at, checksum, file_path)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`, recordID, ns, key, rev, in.Actor, now, "", relPath)
	if err != nil {
		_ = os.Remove(absPath)
		return Record{}, err
	}

	_, err = tx.ExecContext(ctx, `
INSERT INTO heads (namespace, key_name, head_revision, head_record_id, updated_at)
VALUES (?, ?, ?, ?, ?)
ON CONFLICT(namespace, key_name) DO UPDATE SET
	head_revision=excluded.head_revision,
	head_record_id=excluded.head_record_id,
	updated_at=excluded.updated_at
`, ns, key, rev, recordID, now)
	if err != nil {
		_ = os.Remove(absPath)
		return Record{}, err
	}

	if err = tx.Commit(); err != nil {
		_ = os.Remove(absPath)
		return Record{}, err
	}

	return Record{
		RecordID:  recordID,
		Namespace: ns,
		Key:       key,
		Revision:  rev,
		Actor:     in.Actor,
		CreatedAt: now,
		Payload:   append(json.RawMessage(nil), in.Payload...),
	}, nil
}

// Head returns the current head record for namespace/key.
func (s *Store) Head(ctx context.Context, namespace, key string) (Record, error) {
	ns, err := sanitizePathPart(namespace)
	if err != nil {
		return Record{}, fmt.Errorf("namespace: %w", err)
	}
	k, err := sanitizePathPart(key)
	if err != nil {
		return Record{}, fmt.Errorf("key: %w", err)
	}

	var rec Record
	var relPath string
	err = s.db.QueryRowContext(ctx, `
SELECT r.record_id, r.namespace, r.key_name, r.revision, r.actor, r.created_at, r.checksum, r.file_path
FROM heads h
JOIN records r ON r.record_id = h.head_record_id
WHERE h.namespace = ? AND h.key_name = ?
`, ns, k).Scan(&rec.RecordID, &rec.Namespace, &rec.Key, &rec.Revision, &rec.Actor, &rec.CreatedAt, &rec.Checksum, &relPath)
	if err != nil {
		return Record{}, err
	}

	payload, err := os.ReadFile(filepath.Join(s.recordsDir, relPath))
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return Record{}, fmt.Errorf("%w: payload missing for %s", ErrConsistencyFault, rec.RecordID)
		}
		return Record{}, err
	}
	rec.Payload = payload
	return rec, nil
}

// History lists revisions in ascending revision order.
func (s *Store) History(ctx context.Context, namespace, key string, limit int) ([]Record, error) {
	ns, err := sanitizePathPart(namespace)
	if err != nil {
		return nil, fmt.Errorf("namespace: %w", err)
	}
	k, err := sanitizePathPart(key)
	if err != nil {
		return nil, fmt.Errorf("key: %w", err)
	}

	query := `
SELECT record_id, namespace, key_name, revision, actor, created_at, checksum, file_path
FROM records
WHERE namespace = ? AND key_name = ?
ORDER BY revision ASC`
	args := []any{ns, k}
	if limit > 0 {
		query += " LIMIT ?"
		args = append(args, limit)
	}

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []Record
	for rows.Next() {
		var rec Record
		var relPath string
		if err := rows.Scan(&rec.RecordID, &rec.Namespace, &rec.Key, &rec.Revision, &rec.Actor, &rec.CreatedAt, &rec.Checksum, &relPath); err != nil {
			return nil, err
		}
		payload, err := os.ReadFile(filepath.Join(s.recordsDir, relPath))
		if err != nil {
			if errors.Is(err, os.ErrNotExist) {
				return nil, fmt.Errorf("%w: payload missing for %s", ErrConsistencyFault, rec.RecordID)
			}
			return nil, err
		}
		rec.Payload = payload
		out = append(out, rec)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return out, nil
}

// Select evaluates a deterministic selector over indexed records.
func (s *Store) Select(ctx context.Context, sel Selector) ([]Record, error) {
	scope := normalizedScope(sel.RevisionScope)
	if sel.Limit < 0 {
		return nil, errors.New("limit must be >= 0")
	}

	if len(sel.Order) == 0 {
		sel.Order = []string{"namespace", "key", "revision"}
	}
	for _, key := range sel.Order {
		switch key {
		case "namespace", "key", "revision":
		default:
			return nil, fmt.Errorf("unsupported order key %q", key)
		}
	}

	query := `
SELECT r.record_id, r.namespace, r.key_name, r.revision, r.actor, r.created_at, r.checksum, r.file_path
FROM records r`
	if scope == "head" {
		query += `
JOIN heads h ON h.head_record_id = r.record_id`
	}
	query += "\nWHERE 1=1"

	var args []any
	if len(sel.Keys) > 0 {
		query += " AND r.key_name IN (" + placeholders(len(sel.Keys)) + ")"
		for _, key := range sel.Keys {
			args = append(args, strings.TrimSpace(key))
		}
	}

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []Record
	for rows.Next() {
		var rec Record
		var relPath string
		if err := rows.Scan(&rec.RecordID, &rec.Namespace, &rec.Key, &rec.Revision, &rec.Actor, &rec.CreatedAt, &rec.Checksum, &relPath); err != nil {
			return nil, err
		}
		if !matchNamespace(sel.Namespaces, rec.Namespace) {
			continue
		}
		payload, err := os.ReadFile(filepath.Join(s.recordsDir, relPath))
		if err != nil {
			if errors.Is(err, os.ErrNotExist) {
				return nil, fmt.Errorf("%w: payload missing for %s", ErrConsistencyFault, rec.RecordID)
			}
			return nil, err
		}
		rec.Payload = payload
		out = append(out, rec)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	sort.SliceStable(out, func(i, j int) bool {
		a := out[i]
		b := out[j]
		for _, key := range sel.Order {
			switch key {
			case "namespace":
				if a.Namespace != b.Namespace {
					return a.Namespace < b.Namespace
				}
			case "key":
				if a.Key != b.Key {
					return a.Key < b.Key
				}
			case "revision":
				if a.Revision != b.Revision {
					return a.Revision < b.Revision
				}
			}
		}
		return a.RecordID < b.RecordID
	})

	if sel.Limit > 0 && len(out) > sel.Limit {
		return out[:sel.Limit], nil
	}
	return out, nil
}

func sanitizePathPart(in string) (string, error) {
	trimmed := strings.TrimSpace(in)
	if trimmed == "" {
		return "", errors.New("value required")
	}
	clean := filepath.Clean(trimmed)
	if clean == "." || clean == ".." || strings.HasPrefix(clean, "../") {
		return "", fmt.Errorf("invalid path segment: %q", in)
	}
	for _, part := range strings.Split(clean, string(filepath.Separator)) {
		if part == ".." {
			return "", fmt.Errorf("invalid path segment: %q", in)
		}
	}
	if filepath.IsAbs(clean) {
		return "", fmt.Errorf("absolute path not allowed: %q", in)
	}
	return clean, nil
}

func placeholders(n int) string {
	if n <= 0 {
		return ""
	}
	items := make([]string, n)
	for i := range items {
		items[i] = "?"
	}
	return strings.Join(items, ",")
}

func normalizedScope(scope string) string {
	if strings.EqualFold(strings.TrimSpace(scope), "all") {
		return "all"
	}
	return "head"
}

func matchNamespace(patterns []string, namespace string) bool {
	if len(patterns) == 0 {
		return true
	}
	for _, p := range patterns {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		ok, err := filepath.Match(p, namespace)
		if err == nil && ok {
			return true
		}
	}
	return false
}
