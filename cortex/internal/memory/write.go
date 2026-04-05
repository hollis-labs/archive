package memory

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"time"
)

// Sentinels for the memory write path.
var (
	ErrInvalidInput = errors.New("invalid memory input")
	ErrNotFound     = errors.New("memory not found")
)

// WriteInput carries all fields for a new revision write.
type WriteInput struct {
	Namespace  string
	MemoryKey  string
	Supersedes string
	Status     Status
	Author     Author
	Trigger    Trigger
	SessionID  string
	Origin     Origin
	Confidence float64
	Tags       []string
	TTL        time.Duration
	Payload    Payload
}

// WriteRevision creates a new revision in the memory store, handling keyed,
// keyless, and supersedes cases within a single transaction.
func (s *Store) WriteRevision(ctx context.Context, in WriteInput) (Revision, error) {
	if err := validateWriteInput(in); err != nil {
		return Revision{}, err
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return Revision{}, fmt.Errorf("begin tx: %w", err)
	}
	defer func() { _ = tx.Rollback() }()

	memoryID, err := resolveOrCreateMemory(ctx, tx, in.Namespace, in.MemoryKey)
	if err != nil {
		return Revision{}, fmt.Errorf("resolve memory: %w", err)
	}

	status := in.Status
	if status == "" {
		status = StatusDraft
	}

	revisionID := NewULID()

	var expiresAt *time.Time
	var ttlSeconds int64
	if in.TTL > 0 {
		ttlSeconds = int64(in.TTL.Seconds())
		exp := time.Now().Add(in.TTL)
		expiresAt = &exp
	}

	tags := in.Tags
	if tags == nil {
		tags = []string{}
	}
	tagsJSON, err := json.Marshal(tags)
	if err != nil {
		return Revision{}, fmt.Errorf("marshal tags: %w", err)
	}

	// Nullable string helpers for the INSERT.
	nullStr := func(s string) sql.NullString {
		if s == "" {
			return sql.NullString{}
		}
		return sql.NullString{String: s, Valid: true}
	}
	nullTime := func(t *time.Time) sql.NullString {
		if t == nil {
			return sql.NullString{}
		}
		return sql.NullString{String: t.UTC().Format(time.DateTime), Valid: true}
	}
	nullInt := func(v int64) sql.NullInt64 {
		if v == 0 {
			return sql.NullInt64{}
		}
		return sql.NullInt64{Int64: v, Valid: true}
	}

	_, err = tx.ExecContext(ctx, `
INSERT INTO memory_revisions (
    revision_id, memory_id, namespace, memory_key, status, supersedes,
    author_agent_id, author_version, trigger, session_id, origin,
    confidence, tags, ttl_seconds, expires_at, payload_summary, payload_body
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		revisionID,
		memoryID,
		in.Namespace,
		nullStr(in.MemoryKey),
		string(status),
		nullStr(in.Supersedes),
		in.Author.AgentID,
		in.Author.AgentVersion,
		string(in.Trigger),
		in.SessionID,
		string(in.Origin),
		in.Confidence,
		string(tagsJSON),
		nullInt(ttlSeconds),
		nullTime(expiresAt),
		nullStr(in.Payload.Summary),
		nullStr(in.Payload.Body),
	)
	if err != nil {
		return Revision{}, fmt.Errorf("insert revision: %w", err)
	}

	// If supersedes is set, auto-deprecate the referenced revision.
	if in.Supersedes != "" {
		if depErr := deprecateRevisionTx(ctx, tx, in.Supersedes); depErr != nil {
			return Revision{}, fmt.Errorf("deprecate superseded: %w", depErr)
		}
	}

	// Point the memory_state current_revision to this new revision.
	_, err = tx.ExecContext(ctx,
		`UPDATE memory_state SET current_revision = ? WHERE memory_id = ?`,
		revisionID, memoryID,
	)
	if err != nil {
		return Revision{}, fmt.Errorf("update state: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return Revision{}, fmt.Errorf("commit: %w", err)
	}

	// Fire-and-forget embed job enqueue; errors are non-fatal.
	_ = s.queue.Enqueue(ctx, Job{
		Kind:    "embed",
		Payload: []byte(fmt.Sprintf(`{"revision_id":%q}`, revisionID)),
	})

	rev := Revision{
		RevisionID: revisionID,
		MemoryID:   memoryID,
		Namespace:  in.Namespace,
		MemoryKey:  in.MemoryKey,
		Status:     status,
		Supersedes: in.Supersedes,
		CreatedAt:  time.Now(),
		Author:     in.Author,
		Trigger:    in.Trigger,
		SessionID:  in.SessionID,
		Origin:     in.Origin,
		Confidence: in.Confidence,
		Tags:       tags,
		TTLSeconds: ttlSeconds,
		ExpiresAt:  expiresAt,
		Payload:    in.Payload,
	}
	return rev, nil
}

// resolveOrCreateMemory finds an existing memory_state by (namespace, key)
// or creates a new one. For keyless writes (key == ""), always creates new.
func resolveOrCreateMemory(ctx context.Context, tx *sql.Tx, namespace, key string) (string, error) {
	if key != "" {
		var existing string
		row := tx.QueryRowContext(ctx,
			`SELECT memory_id FROM memory_state WHERE namespace = ? AND memory_key = ?`,
			namespace, key,
		)
		err := row.Scan(&existing)
		if err == nil {
			return existing, nil
		}
		if !errors.Is(err, sql.ErrNoRows) {
			return "", err
		}
		// Fall through to create.
	}

	memoryID := NewULID()
	var keyVal sql.NullString
	if key != "" {
		keyVal = sql.NullString{String: key, Valid: true}
	}
	_, err := tx.ExecContext(ctx, `
INSERT INTO memory_state (memory_id, namespace, memory_key, activation, access_count)
VALUES (?, ?, ?, 1.0, 0)`,
		memoryID, namespace, keyVal,
	)
	if err != nil {
		return "", fmt.Errorf("insert memory_state: %w", err)
	}
	return memoryID, nil
}

// deprecateRevisionTx is the ONE authorized mutation of
// memory_revisions.status. Guard test enforces this constraint.
func deprecateRevisionTx(ctx context.Context, tx *sql.Tx, revisionID string) error {
	res, err := tx.ExecContext(ctx,
		`UPDATE memory_revisions SET status = ? WHERE revision_id = ? AND status != ?`,
		string(StatusDeprecated), revisionID, string(StatusDeprecated),
	)
	if err != nil {
		return err
	}
	// RowsAffected == 0 is OK (idempotent — already deprecated or does not exist).
	_ = res
	return nil
}

// validateWriteInput checks all required fields before a revision is written.
func validateWriteInput(in WriteInput) error {
	if in.Namespace == "" {
		return fmt.Errorf("%w: namespace is required", ErrInvalidInput)
	}
	if err := ValidateNamespace(in.Namespace); err != nil {
		return fmt.Errorf("%w: %w", ErrInvalidInput, err)
	}
	if in.MemoryKey != "" {
		if err := ValidateKey(in.MemoryKey); err != nil {
			return fmt.Errorf("%w: %w", ErrInvalidInput, err)
		}
	}
	if in.SessionID == "" {
		return fmt.Errorf("%w: session_id is required", ErrInvalidInput)
	}
	if in.Author.AgentID == "" {
		return fmt.Errorf("%w: author.agent_id is required", ErrInvalidInput)
	}
	if in.Origin == "" {
		return fmt.Errorf("%w: origin is required", ErrInvalidInput)
	}
	if !in.Origin.Valid() {
		return fmt.Errorf("%w: invalid origin %q", ErrInvalidInput, in.Origin)
	}
	if in.Trigger == "" {
		return fmt.Errorf("%w: trigger is required", ErrInvalidInput)
	}
	if !in.Trigger.Valid() {
		return fmt.Errorf("%w: invalid trigger %q", ErrInvalidInput, in.Trigger)
	}
	if in.Confidence < 0 || in.Confidence > 1.0 {
		return fmt.Errorf("%w: confidence must be in [0, 1.0], got %f", ErrInvalidInput, in.Confidence)
	}
	if in.Payload.Summary == "" {
		return fmt.Errorf("%w: payload.summary is required", ErrInvalidInput)
	}
	return nil
}

// GetState reads the memory_state row for the given memory_id.
func (s *Store) GetState(ctx context.Context, memoryID string) (State, error) {
	row := s.db.QueryRowContext(ctx, `
SELECT memory_id, namespace, COALESCE(memory_key, ''), COALESCE(current_revision, ''),
       activation, access_count, last_accessed_at, created_at
FROM memory_state WHERE memory_id = ?`, memoryID)

	var st State
	var lastAccessed, created sql.NullString
	err := row.Scan(
		&st.MemoryID, &st.Namespace, &st.MemoryKey, &st.CurrentRevision,
		&st.Activation, &st.AccessCount, &lastAccessed, &created,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return State{}, fmt.Errorf("%w: memory_id %s", ErrNotFound, memoryID)
	}
	if err != nil {
		return State{}, err
	}
	if lastAccessed.Valid {
		t, _ := time.Parse(time.DateTime, lastAccessed.String)
		st.LastAccessedAt = &t
	}
	if created.Valid {
		st.CreatedAt, _ = time.Parse(time.DateTime, created.String)
	}
	return st, nil
}

// GetRevision reads a single memory_revisions row by revision_id.
func (s *Store) GetRevision(ctx context.Context, revisionID string) (Revision, error) {
	row := s.db.QueryRowContext(ctx, `
SELECT revision_id, memory_id, namespace, COALESCE(memory_key, ''),
       status, COALESCE(supersedes, ''), created_at,
       author_agent_id, author_version, trigger, session_id, origin,
       confidence, tags, COALESCE(ttl_seconds, 0), expires_at,
       COALESCE(payload_summary, ''), COALESCE(payload_body, '')
FROM memory_revisions WHERE revision_id = ?`, revisionID)

	var rev Revision
	var createdAt string
	var expiresAt sql.NullString
	var tagsJSON string
	err := row.Scan(
		&rev.RevisionID, &rev.MemoryID, &rev.Namespace, &rev.MemoryKey,
		&rev.Status, &rev.Supersedes, &createdAt,
		&rev.Author.AgentID, &rev.Author.AgentVersion, &rev.Trigger, &rev.SessionID, &rev.Origin,
		&rev.Confidence, &tagsJSON, &rev.TTLSeconds, &expiresAt,
		&rev.Payload.Summary, &rev.Payload.Body,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return Revision{}, fmt.Errorf("%w: revision_id %s", ErrNotFound, revisionID)
	}
	if err != nil {
		return Revision{}, err
	}
	rev.CreatedAt, _ = time.Parse(time.DateTime, createdAt)
	if expiresAt.Valid {
		t, _ := time.Parse(time.DateTime, expiresAt.String)
		rev.ExpiresAt = &t
	}
	if tagsJSON != "" {
		_ = json.Unmarshal([]byte(tagsJSON), &rev.Tags)
	}
	if rev.Tags == nil {
		rev.Tags = []string{}
	}
	return rev, nil
}
