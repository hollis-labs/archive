package registry

import "context"

// Registry defines the interface for agent config management with versioning.
// Implemented by PostgresStore (server-side).
type Registry interface {
	// Register creates a new agent config or updates an existing one (upsert by slug).
	Register(ctx context.Context, input RegisterInput) (AgentConfig, error)

	// Get returns an agent config by ID.
	Get(ctx context.Context, agentID string) (AgentConfig, error)

	// GetBySlug returns an agent config by slug.
	GetBySlug(ctx context.Context, slug string) (AgentConfig, error)

	// List returns agent configs filtered by options.
	List(ctx context.Context, opts ...ListOption) ([]AgentConfig, error)

	// Update modifies an existing agent config and creates a revision.
	Update(ctx context.Context, input RegisterInput) (AgentConfig, Revision, error)

	// Delete removes an agent config by ID.
	Delete(ctx context.Context, agentID string) error

	// History returns all revisions for an agent, newest first.
	History(ctx context.Context, agentID string) ([]Revision, error)

	// Compare fetches two revisions by profile hash and returns their data for diffing.
	Compare(ctx context.Context, hashA, hashB string) (Diff, error)

	// Discover finds agents matching capability criteria.
	Discover(ctx context.Context, opts DiscoverOptions) ([]AgentConfig, error)
}
