package messaging

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

// PostgresStore implements Store backed by PostgreSQL.
type PostgresStore struct {
	db *sql.DB
}

// NewPostgresStore creates a new Postgres-backed message store.
func NewPostgresStore(db *sql.DB) *PostgresStore {
	return &PostgresStore{db: db}
}

func (s *PostgresStore) Send(ctx context.Context, input SendInput) (Message, error) {
	if input.FromAgent == "" {
		return Message{}, fmt.Errorf("from_agent is required")
	}
	if input.ToAgent == "" {
		return Message{}, fmt.Errorf("to_agent is required")
	}
	if input.Body == "" {
		return Message{}, fmt.Errorf("body is required")
	}

	id := uuid.New().String()
	now := time.Now().UTC()

	if input.Type == "" {
		input.Type = TypeMessage
	}
	if input.Priority == 0 {
		input.Priority = 2
	}
	if input.Metadata == "" {
		input.Metadata = "{}"
	}

	threadID := input.ThreadID
	if threadID == "" {
		threadID = id // New thread starts with the message ID.
	}

	msg := Message{
		ID:        id,
		FromAgent: input.FromAgent,
		ToAgent:   input.ToAgent,
		ThreadID:  threadID,
		ReplyTo:   input.ReplyTo,
		Type:      input.Type,
		Subject:   input.Subject,
		Body:      input.Body,
		Metadata:  input.Metadata,
		Priority:  input.Priority,
		Status:    StatusUnread,
		CreatedAt: now,
	}

	_, err := s.db.ExecContext(ctx, `
		INSERT INTO nexus_messages (id, from_agent, to_agent, thread_id, reply_to, type, subject, body, metadata, priority, status, created_at)
		VALUES ($1, $2, $3, $4, NULLIF($5, ''), $6, NULLIF($7, ''), $8, $9, $10, $11, $12)`,
		msg.ID, msg.FromAgent, msg.ToAgent, msg.ThreadID,
		msg.ReplyTo, msg.Type, msg.Subject, msg.Body,
		msg.Metadata, msg.Priority, msg.Status, msg.CreatedAt,
	)
	if err != nil {
		return Message{}, fmt.Errorf("insert message: %w", err)
	}

	return msg, nil
}

func (s *PostgresStore) Inbox(ctx context.Context, agentID string, opts ...InboxOption) ([]Message, error) {
	options := &InboxOptions{Limit: 50}
	for _, o := range opts {
		o(options)
	}

	var conditions []string
	var args []interface{}
	argN := 1

	conditions = append(conditions, fmt.Sprintf("to_agent = $%d", argN))
	args = append(args, agentID)
	argN++

	if options.Status != "" {
		conditions = append(conditions, fmt.Sprintf("status = $%d", argN))
		args = append(args, options.Status)
		argN++
	}

	query := fmt.Sprintf(`
		SELECT %s FROM nexus_messages
		WHERE %s
		ORDER BY created_at DESC
		LIMIT $%d OFFSET $%d`,
		scanColumns(),
		strings.Join(conditions, " AND "),
		argN, argN+1,
	)
	args = append(args, options.Limit, options.Offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("query inbox: %w", err)
	}
	defer rows.Close()

	return scanMessages(rows)
}

func (s *PostgresStore) Thread(ctx context.Context, threadID string) ([]Message, error) {
	rows, err := s.db.QueryContext(ctx, fmt.Sprintf(`
		SELECT %s FROM nexus_messages
		WHERE thread_id = $1
		ORDER BY created_at ASC`, scanColumns()), threadID)
	if err != nil {
		return nil, fmt.Errorf("query thread: %w", err)
	}
	defer rows.Close()

	return scanMessages(rows)
}

func (s *PostgresStore) Get(ctx context.Context, msgID string) (Message, error) {
	row := s.db.QueryRowContext(ctx, fmt.Sprintf(`
		SELECT %s FROM nexus_messages WHERE id = $1`, scanColumns()), msgID)

	var msg Message
	err := scanMessage(row, &msg)
	if err == sql.ErrNoRows {
		return Message{}, fmt.Errorf("message not found: %s", msgID)
	}
	if err != nil {
		return Message{}, fmt.Errorf("get message: %w", err)
	}
	return msg, nil
}

func (s *PostgresStore) Ack(ctx context.Context, msgID string) error {
	res, err := s.db.ExecContext(ctx, `
		UPDATE nexus_messages SET status = $1, read_at = $2 WHERE id = $3`,
		StatusRead, time.Now().UTC(), msgID)
	if err != nil {
		return fmt.Errorf("ack message: %w", err)
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return fmt.Errorf("message not found: %s", msgID)
	}
	return nil
}

func (s *PostgresStore) Resolve(ctx context.Context, msgID string) error {
	res, err := s.db.ExecContext(ctx, `
		UPDATE nexus_messages SET status = $1, resolved_at = $2 WHERE id = $3`,
		StatusResolved, time.Now().UTC(), msgID)
	if err != nil {
		return fmt.Errorf("resolve message: %w", err)
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		return fmt.Errorf("message not found: %s", msgID)
	}
	return nil
}

func (s *PostgresStore) UnreadCount(ctx context.Context, agentID string) (int, error) {
	var count int
	err := s.db.QueryRowContext(ctx, `
		SELECT COUNT(*) FROM nexus_messages WHERE to_agent = $1 AND status = $2`,
		agentID, StatusUnread).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("unread count: %w", err)
	}
	return count, nil
}

// scanColumns returns the SELECT column list.
func scanColumns() string {
	return "id, from_agent, to_agent, thread_id, COALESCE(reply_to, ''), type, COALESCE(subject, ''), body, COALESCE(metadata, '{}'), priority, status, created_at, read_at, resolved_at"
}

// scanMessage scans a single row into a Message.
func scanMessage(row *sql.Row, msg *Message) error {
	return row.Scan(
		&msg.ID, &msg.FromAgent, &msg.ToAgent, &msg.ThreadID,
		&msg.ReplyTo, &msg.Type, &msg.Subject, &msg.Body,
		&msg.Metadata, &msg.Priority, &msg.Status, &msg.CreatedAt,
		&msg.ReadAt, &msg.ResolvedAt,
	)
}

// scanMessages scans multiple rows into a slice of Messages.
func scanMessages(rows *sql.Rows) ([]Message, error) {
	var messages []Message
	for rows.Next() {
		var msg Message
		err := rows.Scan(
			&msg.ID, &msg.FromAgent, &msg.ToAgent, &msg.ThreadID,
			&msg.ReplyTo, &msg.Type, &msg.Subject, &msg.Body,
			&msg.Metadata, &msg.Priority, &msg.Status, &msg.CreatedAt,
			&msg.ReadAt, &msg.ResolvedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("scan message: %w", err)
		}
		messages = append(messages, msg)
	}
	return messages, rows.Err()
}
