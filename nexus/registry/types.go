package registry

import "time"

// AgentConfig is the versioned blueprint for an agent.
type AgentConfig struct {
	ID              string    `json:"id"`                         // Opaque hash (ADR-032)
	Name            string    `json:"name"`
	Slug            string    `json:"slug"`
	Description     string    `json:"description,omitempty"`
	Avatar          string    `json:"avatar,omitempty"`
	SystemPrompt    string    `json:"system_prompt"`
	DefaultModel    string    `json:"default_model,omitempty"`
	DefaultMode     string    `json:"default_mode,omitempty"`
	Modes           string    `json:"modes,omitempty"`            // JSON array
	MCPServers      string    `json:"mcp_servers,omitempty"`      // JSON array
	ToolPermissions string    `json:"tool_permissions,omitempty"` // JSON object
	CanExecute      bool      `json:"can_execute"`
	Capabilities    string    `json:"capabilities,omitempty"`     // JSON: {domains:[], roles:[], skills:[], tools_expertise:[]}
	Contact         string    `json:"contact,omitempty"`          // JSON: {inbox:, sse_channel:, session_create:}
	Limits          string    `json:"limits,omitempty"`           // JSON: {max_concurrent_sessions:, availability:}
	ModelStrategy   string    `json:"model_strategy,omitempty"`   // JSON: {default:, reasoning:, fast:, selection:}
	Settings        string    `json:"settings,omitempty"`         // JSON object
	ProfileHash     string    `json:"profile_hash"`               // SHA-256 of content
	Version         int       `json:"version"`                    // Monotonic counter
	Status          string    `json:"status"`                     // active, disabled, archived
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// AgentStatus constants.
const (
	StatusActive   = "active"
	StatusDisabled = "disabled"
	StatusArchived = "archived"
)

// Revision represents a historical version of an agent config.
type Revision struct {
	ID          string    `json:"id"`
	AgentID     string    `json:"agent_id"`
	Version     int       `json:"version"`
	ProfileHash string    `json:"profile_hash"`
	ProfileData string    `json:"profile_data"` // Full JSON snapshot
	ChangedBy   string    `json:"changed_by,omitempty"`
	ChangeNote  string    `json:"change_note,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
}

// RegisterInput for creating or updating an agent config.
type RegisterInput struct {
	ID              string `json:"id,omitempty"` // Auto-generated if empty
	Name            string `json:"name"`
	Slug            string `json:"slug"`
	Description     string `json:"description,omitempty"`
	Avatar          string `json:"avatar,omitempty"`
	SystemPrompt    string `json:"system_prompt"`
	DefaultModel    string `json:"default_model,omitempty"`
	DefaultMode     string `json:"default_mode,omitempty"`
	Modes           string `json:"modes,omitempty"`
	MCPServers      string `json:"mcp_servers,omitempty"`
	ToolPermissions string `json:"tool_permissions,omitempty"`
	CanExecute      bool   `json:"can_execute"`
	Capabilities    string `json:"capabilities,omitempty"`
	Contact         string `json:"contact,omitempty"`
	Limits          string `json:"limits,omitempty"`
	ModelStrategy   string `json:"model_strategy,omitempty"`
	Settings        string `json:"settings,omitempty"`
	ChangedBy       string `json:"changed_by,omitempty"`
	ChangeNote      string `json:"change_note,omitempty"`
}

// ListOptions configures agent list queries.
type ListOptions struct {
	Status string
	Limit  int
	Offset int
}

// ListOption is a functional option for list queries.
type ListOption func(*ListOptions)

// WithStatus filters agents by status.
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

// DiscoverOptions for capability-based agent search.
type DiscoverOptions struct {
	Domains []string
	Roles   []string
	Skills  []string
}

// Diff between two revisions.
type Diff struct {
	HashA       string `json:"hash_a"`
	HashB       string `json:"hash_b"`
	ProfileA    string `json:"profile_a"`    // Full JSON snapshot of revision A
	ProfileB    string `json:"profile_b"`    // Full JSON snapshot of revision B
	VersionA    int    `json:"version_a"`
	VersionB    int    `json:"version_b"`
}
