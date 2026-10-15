package messaging

import "context"

// Store defines the interface for A2A message persistence.
// Implemented by PostgresStore (server-side) and Client (MCP consumer).
type Store interface {
	// Send creates and persists a new message.
	Send(ctx context.Context, input SendInput) (Message, error)

	// Inbox returns messages addressed to the given agent.
	Inbox(ctx context.Context, agentID string, opts ...InboxOption) ([]Message, error)

	// Thread returns all messages in a thread, ordered chronologically.
	Thread(ctx context.Context, threadID string) ([]Message, error)

	// Get returns a single message by ID.
	Get(ctx context.Context, msgID string) (Message, error)

	// Ack marks a message as read.
	Ack(ctx context.Context, msgID string) error

	// Resolve marks a message as resolved.
	Resolve(ctx context.Context, msgID string) error

	// UnreadCount returns the number of unread messages for an agent.
	UnreadCount(ctx context.Context, agentID string) (int, error)
}
