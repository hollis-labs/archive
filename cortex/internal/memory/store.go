package memory

import "database/sql"

// Store is the memory subsystem's storage handle. It shares a *sql.DB with
// contextstore.Store but owns its own read/write paths against the memory_*
// tables.
type Store struct {
	db       *sql.DB
	embedder Embedder
	queue    JobQueue
}

// NewStore constructs a memory.Store bound to the given database. The
// embedder and queue parameters may be NoopEmbedder{} / NoopQueue{} during
// D-core; real implementations are swapped in when Tracks H and I land.
func NewStore(db *sql.DB, embedder Embedder, queue JobQueue) *Store {
	if embedder == nil {
		embedder = NoopEmbedder{}
	}
	if queue == nil {
		queue = NoopQueue{}
	}
	return &Store{db: db, embedder: embedder, queue: queue}
}

// DB returns the underlying *sql.DB. Used by tests that need direct DB access
// (e.g., to backdate timestamps for decay testing).
func (s *Store) DB() *sql.DB { return s.db }
