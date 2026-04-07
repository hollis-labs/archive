package memory

import (
	"database/sql"

	"github.com/hollis-labs/nanite/pkg/provider"
)

// Store is the memory subsystem's storage handle. It shares a *sql.DB with
// contextstore.Store but owns its own read/write paths against the memory_*
// tables.
type Store struct {
	db       *sql.DB
	embedder provider.Embedder
	queue    JobQueue
}

// NewStore constructs a memory.Store bound to the given database. embedder may
// be nil when embedding is unavailable; callers must check before use. queue
// may be nil and will be replaced with NoopQueue{}.
func NewStore(db *sql.DB, embedder provider.Embedder, queue JobQueue) *Store {
	if queue == nil {
		queue = NoopQueue{}
	}
	return &Store{db: db, embedder: embedder, queue: queue}
}

// DB returns the underlying *sql.DB. Used by tests that need direct DB access
// (e.g., to backdate timestamps for decay testing).
func (s *Store) DB() *sql.DB { return s.db }
