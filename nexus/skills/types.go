package skills

import "time"

// Skill is a unit of capability that can be assigned to agents.
type Skill struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Slug        string    `json:"slug"`
	Description string    `json:"description,omitempty"`
	Category    string    `json:"category,omitempty"`    // e.g., "coding", "writing", "ops", "architecture", "review"
	Content     string    `json:"content"`               // Markdown content (the actual skill definition)
	ContentHash string    `json:"content_hash"`          // SHA-256 of content
	Version     int       `json:"version"`
	Tags        string    `json:"tags,omitempty"`         // JSON array of tags
	Status      string    `json:"status"`                 // active, disabled, archived
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// SkillAssignment links a skill to an agent config.
type SkillAssignment struct {
	SkillID   string    `json:"skill_id"`
	AgentID   string    `json:"agent_id"`
	Config    string    `json:"config,omitempty"` // JSON — skill-specific config for this agent
	CreatedAt time.Time `json:"created_at"`
}

// Skill status constants.
const (
	StatusActive   = "active"
	StatusDisabled = "disabled"
	StatusArchived = "archived"
)

// CreateInput for creating or updating a skill.
type CreateInput struct {
	Name        string `json:"name"`
	Slug        string `json:"slug"`
	Description string `json:"description,omitempty"`
	Category    string `json:"category,omitempty"`
	Content     string `json:"content"`
	Tags        string `json:"tags,omitempty"`
}

// ListOptions configures skill list queries.
type ListOptions struct {
	Category string
	Status   string
	Limit    int
	Offset   int
}

// ListOption is a functional option for list queries.
type ListOption func(*ListOptions)

// WithCategory filters skills by category.
func WithCategory(category string) ListOption {
	return func(o *ListOptions) { o.Category = category }
}

// WithStatus filters skills by status.
func WithStatus(status string) ListOption {
	return func(o *ListOptions) { o.Status = status }
}

// WithLimit sets max results.
func WithLimit(limit int) ListOption {
	return func(o *ListOptions) { o.Limit = limit }
}

// WithOffset sets pagination offset.
func WithOffset(offset int) ListOption {
	return func(o *ListOptions) { o.Offset = offset }
}

// SearchOptions for full-text search on skills.
type SearchOptions struct {
	Query    string
	Category string
	Tags     []string
}
