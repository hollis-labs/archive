package skills

import "context"

// Registry defines the interface for skill management and assignment.
// Implemented by PostgresStore (server-side).
type Registry interface {
	// Create registers a new skill.
	Create(ctx context.Context, input CreateInput) (Skill, error)

	// Get returns a skill by ID.
	Get(ctx context.Context, skillID string) (Skill, error)

	// GetBySlug returns a skill by slug.
	GetBySlug(ctx context.Context, slug string) (Skill, error)

	// List returns skills filtered by options.
	List(ctx context.Context, opts ...ListOption) ([]Skill, error)

	// Update modifies an existing skill. No-op if content unchanged.
	Update(ctx context.Context, skillID string, input CreateInput) (Skill, error)

	// Delete removes a skill by ID.
	Delete(ctx context.Context, skillID string) error

	// Search performs full-text search on name, description, and content.
	Search(ctx context.Context, opts SearchOptions) ([]Skill, error)

	// Assign links a skill to an agent. Idempotent (updates config on conflict).
	Assign(ctx context.Context, skillID, agentID string, config string) error

	// Unassign removes the link between a skill and an agent.
	Unassign(ctx context.Context, skillID, agentID string) error

	// AgentSkills returns all skills assigned to an agent.
	AgentSkills(ctx context.Context, agentID string) ([]Skill, error)

	// SkillAgents returns the IDs of all agents that have a given skill.
	SkillAgents(ctx context.Context, skillID string) ([]string, error)
}
