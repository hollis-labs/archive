package messaging

import "time"

// Message represents an A2A message between agents (or between user and agent).
type Message struct {
	ID         string     `json:"id"`
	FromAgent  string     `json:"from_agent"`
	ToAgent    string     `json:"to_agent"`
	ThreadID   string     `json:"thread_id"`
	ReplyTo    string     `json:"reply_to,omitempty"`
	Type       string     `json:"type"`
	Subject    string     `json:"subject,omitempty"`
	Body       string     `json:"body"`
	Metadata   string     `json:"metadata,omitempty"`
	Priority   int        `json:"priority"`
	Status     string     `json:"status"`
	CreatedAt  time.Time  `json:"created_at"`
	ReadAt     *time.Time `json:"read_at,omitempty"`
	ResolvedAt *time.Time `json:"resolved_at,omitempty"`
}

// MessageType constants.
const (
	TypeMessage      = "message"
	TypeHelpRequest  = "help_request"
	TypeDirective    = "directive"
	TypeStatusUpdate = "status_update"
	TypeHandoff      = "handoff"
)

// MessageStatus constants.
const (
	StatusUnread       = "unread"
	StatusRead         = "read"
	StatusAcknowledged = "acknowledged"
	StatusResolved     = "resolved"
)

// SendInput is the input for creating a new message.
type SendInput struct {
	FromAgent string `json:"from_agent"`
	ToAgent   string `json:"to_agent"`
	Type      string `json:"type,omitempty"`
	Subject   string `json:"subject,omitempty"`
	Body      string `json:"body"`
	ThreadID  string `json:"thread_id,omitempty"`
	ReplyTo   string `json:"reply_to,omitempty"`
	Metadata  string `json:"metadata,omitempty"`
	Priority  int    `json:"priority,omitempty"`
}

// InboxOptions configures inbox queries.
type InboxOptions struct {
	Status string
	Limit  int
	Offset int
}

// InboxOption is a functional option for inbox queries.
type InboxOption func(*InboxOptions)

// WithStatus filters inbox by message status.
func WithStatus(status string) InboxOption {
	return func(o *InboxOptions) { o.Status = status }
}

// WithLimit sets max results.
func WithLimit(limit int) InboxOption {
	return func(o *InboxOptions) { o.Limit = limit }
}

// WithOffset sets pagination offset.
func WithOffset(offset int) InboxOption {
	return func(o *InboxOptions) { o.Offset = offset }
}
