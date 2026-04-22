// Package buffer is a small ring buffer of ActivityEvents with time +
// cap eviction and a "drops" counter that tracks events evicted before
// any caller observed them via Since().
//
// Safe for concurrent Append and Since calls; a single mutex guards the
// slice. Throughput expectations are low (muxd activity is human-scale,
// not machine-scale), so lock contention is not a concern.
package buffer

import (
	"strconv"
	"sync"
	"time"

	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/activity"
)

// Options configures a Buffer. MaxAge and Cap are both enforced; eviction
// runs on every Append.
type Options struct {
	MaxAge time.Duration
	Cap    int
	// clock is injectable for deterministic age-eviction tests; production
	// callers leave it nil and the buffer uses time.Now.
	clock func() time.Time
}

// Buffer is a bounded, monotonic-ID ring of ActivityEvents.
type Buffer struct {
	mu         sync.Mutex
	events     []activity.ActivityEvent
	nextID     int64
	opts       Options
	drops      int64 // cumulative evicted-before-observed count
	highestObs int64 // highest ID any caller has observed via Since (as int64)
}

// New constructs a Buffer with the given options.
func New(opts Options) *Buffer {
	if opts.clock == nil {
		opts.clock = time.Now
	}
	return &Buffer{opts: opts}
}

// Append adds an event, assigning a monotonic ID and running eviction.
// Returns the event with its ID populated.
func (b *Buffer) Append(ev activity.ActivityEvent) activity.ActivityEvent {
	b.mu.Lock()
	defer b.mu.Unlock()

	b.nextID++
	ev.ID = strconv.FormatInt(b.nextID, 10)
	if ev.Timestamp.IsZero() {
		ev.Timestamp = b.opts.clock()
	}
	b.events = append(b.events, ev)
	b.evictLocked()
	return ev
}

// Since returns every event with ID greater than cursor, the current
// newest ID (to pass as cursor on the next call), and the running drops
// counter. An empty cursor returns the full buffer.
func (b *Buffer) Since(cursor string) ([]activity.ActivityEvent, string, int64) {
	b.mu.Lock()
	defer b.mu.Unlock()

	var floor int64
	if cursor != "" {
		parsed, err := strconv.ParseInt(cursor, 10, 64)
		if err == nil {
			floor = parsed
		}
	}

	out := make([]activity.ActivityEvent, 0, len(b.events))
	var newest int64
	for _, ev := range b.events {
		id, _ := strconv.ParseInt(ev.ID, 10, 64)
		if id > floor {
			out = append(out, ev)
		}
		if id > newest {
			newest = id
		}
	}
	if newest > b.highestObs {
		b.highestObs = newest
	}
	cursorOut := ""
	if newest > 0 {
		cursorOut = strconv.FormatInt(newest, 10)
	}
	return out, cursorOut, b.drops
}

// evictLocked removes events that exceed MaxAge or Cap. Callers must
// hold b.mu. For each evicted event with ID > highestObs, drops is
// incremented — this marks "activity that existed but nobody read it."
func (b *Buffer) evictLocked() {
	now := b.opts.clock()
	// Age eviction.
	keep := 0
	for i, ev := range b.events {
		if now.Sub(ev.Timestamp) <= b.opts.MaxAge {
			keep = i
			break
		}
		b.recordDropLocked(ev)
	}
	b.events = b.events[keep:]

	// Cap eviction.
	if b.opts.Cap > 0 && len(b.events) > b.opts.Cap {
		over := len(b.events) - b.opts.Cap
		for i := 0; i < over; i++ {
			b.recordDropLocked(b.events[i])
		}
		b.events = b.events[over:]
	}
}

func (b *Buffer) recordDropLocked(ev activity.ActivityEvent) {
	id, _ := strconv.ParseInt(ev.ID, 10, 64)
	if id > b.highestObs {
		b.drops++
	}
}
