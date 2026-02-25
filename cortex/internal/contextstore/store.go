package contextstore

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
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
	schemaVersion = 3
	// DefaultSelectLimit bounds selector response size when no explicit limit is provided.
	DefaultSelectLimit = 200
	// MaxSelectLimit is the upper bound accepted for selector limits.
	MaxSelectLimit        = 500
	maxSelectorNamespaces = 32
	maxSelectorKeys       = 128
)

var (
	// ErrConsistencyFault indicates indexed metadata pointing at a missing/corrupt payload file.
	ErrConsistencyFault = errors.New("contextstore consistency fault")
	// ErrAuthTokenInvalid indicates token not found.
	ErrAuthTokenInvalid = errors.New("auth token invalid")
	// ErrAuthTokenRevoked indicates token has been revoked.
	ErrAuthTokenRevoked = errors.New("auth token revoked")
	// ErrAuthTokenExpired indicates token has expired.
	ErrAuthTokenExpired = errors.New("auth token expired")
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
	dbPath     string
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

// ConsistencyIssue reports a deterministic storage/index inconsistency finding.
type ConsistencyIssue struct {
	Type      string `json:"type"`
	Namespace string `json:"namespace,omitempty"`
	Key       string `json:"key,omitempty"`
	RecordID  string `json:"record_id,omitempty"`
	Revision  int64  `json:"revision,omitempty"`
	FilePath  string `json:"file_path,omitempty"`
	Detail    string `json:"detail,omitempty"`
}

// AuditEvent captures structured operation metadata for observability/audit queries.
type AuditEvent struct {
	ID        int64           `json:"id"`
	EventType string          `json:"event_type"`
	Actor     string          `json:"actor"`
	Namespace string          `json:"namespace"`
	Key       string          `json:"key"`
	Revision  int64           `json:"revision"`
	RecordID  string          `json:"record_id,omitempty"`
	CreatedAt string          `json:"created_at"`
	Metadata  json.RawMessage `json:"metadata,omitempty"`
}

// AuthToken stores local token lifecycle metadata.
type AuthToken struct {
	TokenID   string `json:"token_id"`
	Label     string `json:"label"`
	CreatedAt string `json:"created_at"`
	ExpiresAt string `json:"expires_at,omitempty"`
	RevokedAt string `json:"revoked_at,omitempty"`
}

type backupRecord struct {
	RecordID  string          `json:"record_id"`
	Namespace string          `json:"namespace"`
	Key       string          `json:"key"`
	Revision  int64           `json:"revision"`
	Actor     string          `json:"actor"`
	CreatedAt string          `json:"created_at"`
	FilePath  string          `json:"file_path"`
	Payload   json.RawMessage `json:"payload"`
}

type backupAuthToken struct {
	TokenID   string `json:"token_id"`
	TokenHash string `json:"token_hash"`
	Label     string `json:"label"`
	CreatedAt string `json:"created_at"`
	ExpiresAt string `json:"expires_at,omitempty"`
	RevokedAt string `json:"revoked_at,omitempty"`
}

type backupSnapshot struct {
	Version     int               `json:"version"`
	ExportedAt  string            `json:"exported_at"`
	Records     []backupRecord    `json:"records"`
	AuditEvents []AuditEvent      `json:"audit_events"`
	AuthTokens  []backupAuthToken `json:"auth_tokens"`
}

// ReadinessReport summarizes operational readiness in a stable shape.
type ReadinessReport struct {
	Healthy           bool   `json:"healthy"`
	DBPath            string `json:"db_path"`
	RecordsDir        string `json:"records_dir"`
	RecordsDirExists  bool   `json:"records_dir_exists"`
	SchemaVersion     int    `json:"schema_version"`
	ConsistencyIssues int    `json:"consistency_issues"`
	GeneratedAt       string `json:"generated_at"`
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

	s := &Store{db: db, recordsDir: cfg.RecordsDir, dbPath: cfg.DBPath}
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
		case 2:
			if _, err = tx.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS audit_events (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	event_type TEXT NOT NULL,
	actor TEXT NOT NULL,
	namespace TEXT NOT NULL,
	key_name TEXT NOT NULL,
	revision INTEGER NOT NULL,
	record_id TEXT,
	created_at TEXT NOT NULL,
	metadata_json TEXT
)`); err != nil {
				return err
			}
			if _, err = tx.ExecContext(ctx, `CREATE INDEX IF NOT EXISTS idx_audit_events_created ON audit_events(created_at, id)`); err != nil {
				return err
			}
		case 3:
			if _, err = tx.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS auth_tokens (
	token_id TEXT PRIMARY KEY,
	token_hash TEXT NOT NULL UNIQUE,
	label TEXT NOT NULL,
	created_at TEXT NOT NULL,
	expires_at TEXT,
	revoked_at TEXT
)`); err != nil {
				return err
			}
			if _, err = tx.ExecContext(ctx, `CREATE INDEX IF NOT EXISTS idx_auth_tokens_created ON auth_tokens(created_at, token_id)`); err != nil {
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
	if err := validateSelector(&sel); err != nil {
		return nil, err
	}
	scope := normalizedScope(sel.RevisionScope)

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

// ScanConsistency reports deterministic consistency findings between index rows and payload files.
func (s *Store) ScanConsistency(ctx context.Context) ([]ConsistencyIssue, error) {
	type recRow struct {
		namespace string
		key       string
		revision  int64
		recordID  string
		filePath  string
	}

	rows, err := s.db.QueryContext(ctx, `
SELECT namespace, key_name, revision, record_id, file_path
FROM records
ORDER BY namespace, key_name, revision ASC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	issues := make([]ConsistencyIssue, 0)
	maxHeads := map[string]recRow{}
	recordByID := map[string]recRow{}

	for rows.Next() {
		var rr recRow
		if err := rows.Scan(&rr.namespace, &rr.key, &rr.revision, &rr.recordID, &rr.filePath); err != nil {
			return nil, err
		}
		recordByID[rr.recordID] = rr

		compoundKey := rr.namespace + "\x00" + rr.key
		prev, ok := maxHeads[compoundKey]
		if !ok || rr.revision > prev.revision {
			maxHeads[compoundKey] = rr
		}

		abs := filepath.Join(s.recordsDir, rr.filePath)
		payload, err := os.ReadFile(abs)
		if err != nil {
			if errors.Is(err, os.ErrNotExist) {
				issues = append(issues, ConsistencyIssue{
					Type:      "missing_payload",
					Namespace: rr.namespace,
					Key:       rr.key,
					RecordID:  rr.recordID,
					Revision:  rr.revision,
					FilePath:  rr.filePath,
					Detail:    "record index points to missing payload file",
				})
				continue
			}
			return nil, err
		}
		if !json.Valid(payload) {
			issues = append(issues, ConsistencyIssue{
				Type:      "invalid_payload_json",
				Namespace: rr.namespace,
				Key:       rr.key,
				RecordID:  rr.recordID,
				Revision:  rr.revision,
				FilePath:  rr.filePath,
				Detail:    "payload file is not valid JSON",
			})
		}
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	headRows, err := s.db.QueryContext(ctx, `
SELECT namespace, key_name, head_revision, head_record_id
FROM heads
ORDER BY namespace, key_name ASC`)
	if err != nil {
		return nil, err
	}
	defer headRows.Close()

	seenHeads := map[string]bool{}
	for headRows.Next() {
		var ns, key, headRecordID string
		var headRev int64
		if err := headRows.Scan(&ns, &key, &headRev, &headRecordID); err != nil {
			return nil, err
		}
		compoundKey := ns + "\x00" + key
		seenHeads[compoundKey] = true

		maxRec, ok := maxHeads[compoundKey]
		if !ok {
			issues = append(issues, ConsistencyIssue{
				Type:      "orphan_head",
				Namespace: ns,
				Key:       key,
				Revision:  headRev,
				RecordID:  headRecordID,
				Detail:    "head exists but no records exist for namespace/key",
			})
			continue
		}
		if maxRec.recordID != headRecordID || maxRec.revision != headRev {
			issues = append(issues, ConsistencyIssue{
				Type:      "head_mismatch",
				Namespace: ns,
				Key:       key,
				Revision:  headRev,
				RecordID:  headRecordID,
				Detail:    "head does not point to latest indexed revision",
			})
		}
		if _, ok := recordByID[headRecordID]; !ok {
			issues = append(issues, ConsistencyIssue{
				Type:      "head_missing_record",
				Namespace: ns,
				Key:       key,
				Revision:  headRev,
				RecordID:  headRecordID,
				Detail:    "head references a non-existent record_id",
			})
		}
	}
	if err := headRows.Err(); err != nil {
		return nil, err
	}

	for compoundKey, rec := range maxHeads {
		if !seenHeads[compoundKey] {
			issues = append(issues, ConsistencyIssue{
				Type:      "missing_head",
				Namespace: rec.namespace,
				Key:       rec.key,
				Revision:  rec.revision,
				RecordID:  rec.recordID,
				Detail:    "records exist but no head entry found",
			})
		}
	}

	sort.SliceStable(issues, func(i, j int) bool {
		a, b := issues[i], issues[j]
		if a.Type != b.Type {
			return a.Type < b.Type
		}
		if a.Namespace != b.Namespace {
			return a.Namespace < b.Namespace
		}
		if a.Key != b.Key {
			return a.Key < b.Key
		}
		if a.Revision != b.Revision {
			return a.Revision < b.Revision
		}
		return a.RecordID < b.RecordID
	})

	return issues, nil
}

// RebuildHeads rebuilds heads from latest records for each namespace/key pair.
func (s *Store) RebuildHeads(ctx context.Context) (int64, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return 0, err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	if _, err = tx.ExecContext(ctx, `DELETE FROM heads`); err != nil {
		return 0, err
	}
	res, err := tx.ExecContext(ctx, `
INSERT INTO heads (namespace, key_name, head_revision, head_record_id, updated_at)
SELECT r.namespace, r.key_name, r.revision, r.record_id, ?
FROM records r
JOIN (
	SELECT namespace, key_name, MAX(revision) AS max_revision
	FROM records
	GROUP BY namespace, key_name
) latest
ON latest.namespace = r.namespace AND latest.key_name = r.key_name AND latest.max_revision = r.revision
`, time.Now().UTC().Format(time.RFC3339))
	if err != nil {
		return 0, err
	}
	if err = tx.Commit(); err != nil {
		return 0, err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return 0, nil
	}
	return n, nil
}

// RecordAuditEvent stores structured metadata for operational audit queries.
func (s *Store) RecordAuditEvent(ctx context.Context, event AuditEvent) error {
	if strings.TrimSpace(event.EventType) == "" {
		return errors.New("event_type required")
	}
	if strings.TrimSpace(event.Actor) == "" {
		return errors.New("actor required")
	}
	if strings.TrimSpace(event.Namespace) == "" {
		return errors.New("namespace required")
	}
	if strings.TrimSpace(event.Key) == "" {
		return errors.New("key required")
	}
	if event.Revision <= 0 {
		return errors.New("revision must be > 0")
	}
	if strings.TrimSpace(event.CreatedAt) == "" {
		event.CreatedAt = time.Now().UTC().Format(time.RFC3339)
	}
	metadata := event.Metadata
	if len(metadata) > 0 && !json.Valid(metadata) {
		return errors.New("metadata must be valid JSON")
	}
	_, err := s.db.ExecContext(ctx, `
INSERT INTO audit_events (event_type, actor, namespace, key_name, revision, record_id, created_at, metadata_json)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		event.EventType,
		event.Actor,
		event.Namespace,
		event.Key,
		event.Revision,
		event.RecordID,
		event.CreatedAt,
		string(metadata),
	)
	return err
}

// ListAuditEvents returns newest-first audit events with deterministic ordering.
func (s *Store) ListAuditEvents(ctx context.Context, limit int) ([]AuditEvent, error) {
	if limit <= 0 {
		limit = 50
	}
	if limit > 500 {
		limit = 500
	}

	rows, err := s.db.QueryContext(ctx, `
SELECT id, event_type, actor, namespace, key_name, revision, record_id, created_at, metadata_json
FROM audit_events
ORDER BY id DESC
LIMIT ?`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := make([]AuditEvent, 0, limit)
	for rows.Next() {
		var event AuditEvent
		var metadata string
		if err := rows.Scan(&event.ID, &event.EventType, &event.Actor, &event.Namespace, &event.Key, &event.Revision, &event.RecordID, &event.CreatedAt, &metadata); err != nil {
			return nil, err
		}
		if strings.TrimSpace(metadata) != "" {
			event.Metadata = json.RawMessage(metadata)
		}
		out = append(out, event)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return out, nil
}

// IssueAuthToken creates a new token and returns the plaintext token plus stored metadata.
func (s *Store) IssueAuthToken(ctx context.Context, label string, ttl time.Duration) (string, AuthToken, error) {
	label = strings.TrimSpace(label)
	if label == "" {
		label = "default"
	}
	now := time.Now().UTC()
	expiresAt := ""
	if ttl > 0 {
		expiresAt = now.Add(ttl).Format(time.RFC3339)
	}

	token, err := generateToken()
	if err != nil {
		return "", AuthToken{}, err
	}
	tokenID, err := generateTokenID()
	if err != nil {
		return "", AuthToken{}, err
	}

	meta := AuthToken{
		TokenID:   tokenID,
		Label:     label,
		CreatedAt: now.Format(time.RFC3339),
		ExpiresAt: expiresAt,
	}
	_, err = s.db.ExecContext(ctx, `
INSERT INTO auth_tokens (token_id, token_hash, label, created_at, expires_at, revoked_at)
VALUES (?, ?, ?, ?, ?, NULL)`,
		meta.TokenID,
		hashToken(token),
		meta.Label,
		meta.CreatedAt,
		meta.ExpiresAt,
	)
	if err != nil {
		return "", AuthToken{}, err
	}
	return token, meta, nil
}

// RotateAuthToken revokes the old token and issues a replacement token.
func (s *Store) RotateAuthToken(ctx context.Context, oldToken, label string, ttl time.Duration) (string, AuthToken, error) {
	if err := s.ValidateAuthToken(ctx, oldToken); err != nil {
		return "", AuthToken{}, err
	}
	if err := s.RevokeAuthToken(ctx, oldToken); err != nil {
		return "", AuthToken{}, err
	}
	return s.IssueAuthToken(ctx, label, ttl)
}

// RevokeAuthToken marks a token revoked.
func (s *Store) RevokeAuthToken(ctx context.Context, token string) error {
	hash := hashToken(strings.TrimSpace(token))
	if hash == "" {
		return ErrAuthTokenInvalid
	}
	now := time.Now().UTC().Format(time.RFC3339)
	res, err := s.db.ExecContext(ctx, `
UPDATE auth_tokens
SET revoked_at = ?
WHERE token_hash = ? AND revoked_at IS NULL`, now, hash)
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return nil
	}
	if n == 0 {
		return ErrAuthTokenInvalid
	}
	return nil
}

// ValidateAuthToken verifies token presence and lifecycle state.
func (s *Store) ValidateAuthToken(ctx context.Context, token string) error {
	hash := hashToken(strings.TrimSpace(token))
	if hash == "" {
		return ErrAuthTokenInvalid
	}
	var expiresAt, revokedAt string
	err := s.db.QueryRowContext(ctx, `
SELECT COALESCE(expires_at, ''), COALESCE(revoked_at, '')
FROM auth_tokens
WHERE token_hash = ?
LIMIT 1`, hash).Scan(&expiresAt, &revokedAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return ErrAuthTokenInvalid
		}
		return err
	}
	if strings.TrimSpace(revokedAt) != "" {
		return ErrAuthTokenRevoked
	}
	if strings.TrimSpace(expiresAt) != "" {
		t, err := time.Parse(time.RFC3339, expiresAt)
		if err != nil {
			return err
		}
		if time.Now().UTC().After(t) {
			return ErrAuthTokenExpired
		}
	}
	return nil
}

// ListAuthTokens returns token metadata newest-first.
func (s *Store) ListAuthTokens(ctx context.Context, limit int) ([]AuthToken, error) {
	if limit <= 0 {
		limit = 50
	}
	if limit > 500 {
		limit = 500
	}
	rows, err := s.db.QueryContext(ctx, `
SELECT token_id, label, created_at, COALESCE(expires_at, ''), COALESCE(revoked_at, '')
FROM auth_tokens
ORDER BY created_at DESC, token_id DESC
LIMIT ?`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []AuthToken
	for rows.Next() {
		var token AuthToken
		if err := rows.Scan(&token.TokenID, &token.Label, &token.CreatedAt, &token.ExpiresAt, &token.RevokedAt); err != nil {
			return nil, err
		}
		out = append(out, token)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return out, nil
}

// ExportBackup writes a deterministic JSON snapshot containing records, audit events, and auth token metadata.
func (s *Store) ExportBackup(ctx context.Context, outPath string) error {
	if strings.TrimSpace(outPath) == "" {
		return errors.New("backup output path required")
	}
	snap := backupSnapshot{
		Version:    1,
		ExportedAt: time.Now().UTC().Format(time.RFC3339),
	}

	rows, err := s.db.QueryContext(ctx, `
SELECT record_id, namespace, key_name, revision, actor, created_at, file_path
FROM records
ORDER BY namespace, key_name, revision ASC`)
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		var rec backupRecord
		if err := rows.Scan(&rec.RecordID, &rec.Namespace, &rec.Key, &rec.Revision, &rec.Actor, &rec.CreatedAt, &rec.FilePath); err != nil {
			return err
		}
		payload, err := os.ReadFile(filepath.Join(s.recordsDir, rec.FilePath))
		if err != nil {
			return err
		}
		rec.Payload = payload
		snap.Records = append(snap.Records, rec)
	}
	if err := rows.Err(); err != nil {
		return err
	}

	auditRows, err := s.db.QueryContext(ctx, `
SELECT id, event_type, actor, namespace, key_name, revision, record_id, created_at, metadata_json
FROM audit_events
ORDER BY id ASC`)
	if err != nil {
		return err
	}
	defer auditRows.Close()
	for auditRows.Next() {
		var ev AuditEvent
		var metadata string
		if err := auditRows.Scan(&ev.ID, &ev.EventType, &ev.Actor, &ev.Namespace, &ev.Key, &ev.Revision, &ev.RecordID, &ev.CreatedAt, &metadata); err != nil {
			return err
		}
		if strings.TrimSpace(metadata) != "" {
			ev.Metadata = json.RawMessage(metadata)
		}
		snap.AuditEvents = append(snap.AuditEvents, ev)
	}
	if err := auditRows.Err(); err != nil {
		return err
	}

	tokenRows, err := s.db.QueryContext(ctx, `
SELECT token_id, token_hash, label, created_at, COALESCE(expires_at, ''), COALESCE(revoked_at, '')
FROM auth_tokens
ORDER BY created_at ASC, token_id ASC`)
	if err != nil {
		return err
	}
	defer tokenRows.Close()
	for tokenRows.Next() {
		var tk backupAuthToken
		if err := tokenRows.Scan(&tk.TokenID, &tk.TokenHash, &tk.Label, &tk.CreatedAt, &tk.ExpiresAt, &tk.RevokedAt); err != nil {
			return err
		}
		snap.AuthTokens = append(snap.AuthTokens, tk)
	}
	if err := tokenRows.Err(); err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		return err
	}
	data, err := json.MarshalIndent(snap, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(outPath, data, 0o644)
}

// RestoreBackup loads snapshot JSON and reconstructs records/heads/audit/auth tables.
func (s *Store) RestoreBackup(ctx context.Context, inPath string) error {
	if strings.TrimSpace(inPath) == "" {
		return errors.New("backup input path required")
	}
	data, err := os.ReadFile(inPath)
	if err != nil {
		return err
	}
	var snap backupSnapshot
	if err := json.Unmarshal(data, &snap); err != nil {
		return err
	}
	if snap.Version != 1 {
		return fmt.Errorf("unsupported backup version %d", snap.Version)
	}

	if err := os.RemoveAll(s.recordsDir); err != nil {
		return err
	}
	if err := os.MkdirAll(s.recordsDir, 0o755); err != nil {
		return err
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	for _, stmt := range []string{
		`DELETE FROM heads`,
		`DELETE FROM records`,
		`DELETE FROM audit_events`,
		`DELETE FROM auth_tokens`,
	} {
		if _, err = tx.ExecContext(ctx, stmt); err != nil {
			return err
		}
	}

	for _, rec := range snap.Records {
		abs := filepath.Join(s.recordsDir, rec.FilePath)
		if err = os.MkdirAll(filepath.Dir(abs), 0o755); err != nil {
			return err
		}
		if err = os.WriteFile(abs, rec.Payload, 0o644); err != nil {
			return err
		}
		if _, err = tx.ExecContext(ctx, `
INSERT INTO records (record_id, namespace, key_name, revision, actor, created_at, checksum, file_path)
VALUES (?, ?, ?, ?, ?, ?, '', ?)`,
			rec.RecordID, rec.Namespace, rec.Key, rec.Revision, rec.Actor, rec.CreatedAt, rec.FilePath); err != nil {
			return err
		}
	}

	for _, ev := range snap.AuditEvents {
		if _, err = tx.ExecContext(ctx, `
INSERT INTO audit_events (id, event_type, actor, namespace, key_name, revision, record_id, created_at, metadata_json)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			ev.ID, ev.EventType, ev.Actor, ev.Namespace, ev.Key, ev.Revision, ev.RecordID, ev.CreatedAt, string(ev.Metadata)); err != nil {
			return err
		}
	}

	for _, tk := range snap.AuthTokens {
		if _, err = tx.ExecContext(ctx, `
INSERT INTO auth_tokens (token_id, token_hash, label, created_at, expires_at, revoked_at)
VALUES (?, ?, ?, ?, ?, ?)`,
			tk.TokenID, tk.TokenHash, tk.Label, tk.CreatedAt, tk.ExpiresAt, tk.RevokedAt); err != nil {
			return err
		}
	}

	if err = tx.Commit(); err != nil {
		return err
	}
	_, err = s.RebuildHeads(ctx)
	return err
}

// Readiness returns deterministic operational readiness status.
func (s *Store) Readiness(ctx context.Context) (ReadinessReport, error) {
	report := ReadinessReport{
		DBPath:      s.dbPath,
		RecordsDir:  s.recordsDir,
		GeneratedAt: time.Now().UTC().Format(time.RFC3339),
	}
	if _, err := os.Stat(s.recordsDir); err == nil {
		report.RecordsDirExists = true
	} else if errors.Is(err, os.ErrNotExist) {
		report.RecordsDirExists = false
	} else {
		return ReadinessReport{}, err
	}

	if err := s.db.QueryRowContext(ctx, `SELECT COALESCE(MAX(version), 0) FROM schema_version`).Scan(&report.SchemaVersion); err != nil {
		return ReadinessReport{}, err
	}

	issues, err := s.ScanConsistency(ctx)
	if err != nil {
		return ReadinessReport{}, err
	}
	report.ConsistencyIssues = len(issues)
	report.Healthy = report.RecordsDirExists && report.ConsistencyIssues == 0
	return report, nil
}

func generateToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func generateTokenID() (string, error) {
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return "tok_" + hex.EncodeToString(b), nil
}

func hashToken(token string) string {
	token = strings.TrimSpace(token)
	if token == "" {
		return ""
	}
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
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

func validateSelector(sel *Selector) error {
	if sel == nil {
		return errors.New("selector required")
	}
	if len(sel.Namespaces) > maxSelectorNamespaces {
		return fmt.Errorf("too many namespace patterns: max %d", maxSelectorNamespaces)
	}
	for i, pattern := range sel.Namespaces {
		pattern = strings.TrimSpace(pattern)
		if pattern == "" {
			return fmt.Errorf("namespaces[%d] cannot be empty", i)
		}
		if _, err := filepath.Match(pattern, "x"); err != nil {
			return fmt.Errorf("invalid namespaces[%d] pattern: %w", i, err)
		}
		sel.Namespaces[i] = pattern
	}

	if len(sel.Keys) > maxSelectorKeys {
		return fmt.Errorf("too many keys: max %d", maxSelectorKeys)
	}
	for i, key := range sel.Keys {
		key = strings.TrimSpace(key)
		if key == "" {
			return fmt.Errorf("keys[%d] cannot be empty", i)
		}
		sel.Keys[i] = key
	}

	if sel.Limit < 0 {
		return errors.New("limit must be >= 0")
	}
	if sel.Limit == 0 {
		sel.Limit = DefaultSelectLimit
	}
	if sel.Limit > MaxSelectLimit {
		return fmt.Errorf("limit exceeds max %d", MaxSelectLimit)
	}

	if len(sel.Order) == 0 {
		sel.Order = []string{"namespace", "key", "revision"}
	}
	seen := map[string]bool{}
	for _, key := range sel.Order {
		switch key {
		case "namespace", "key", "revision":
			if seen[key] {
				return fmt.Errorf("duplicate order key %q", key)
			}
			seen[key] = true
		default:
			return fmt.Errorf("unsupported order key %q", key)
		}
	}
	return nil
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
