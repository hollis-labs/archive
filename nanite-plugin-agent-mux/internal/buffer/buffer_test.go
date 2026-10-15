package buffer

import (
	"testing"
	"time"

	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/activity"
)

func TestAppend_AssignsMonotonicID(t *testing.T) {
	b := New(Options{MaxAge: time.Minute, Cap: 100})
	ev1 := b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	ev2 := b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	if ev1.ID == "" || ev2.ID == "" {
		t.Fatalf("IDs not assigned: %q, %q", ev1.ID, ev2.ID)
	}
	if ev1.ID == ev2.ID {
		t.Fatalf("IDs not distinct: %q == %q", ev1.ID, ev2.ID)
	}
}

func TestSince_ReturnsOnlyNewerEvents(t *testing.T) {
	b := New(Options{MaxAge: time.Minute, Cap: 100})
	e1 := b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	e2 := b.Append(activity.ActivityEvent{Kind: activity.KindSessionStopped})
	e3 := b.Append(activity.ActivityEvent{Kind: activity.KindMessageDispatched})

	got, cursor, drops := b.Since(e1.ID)
	if len(got) != 2 {
		t.Fatalf("want 2 events after e1, got %d", len(got))
	}
	if got[0].ID != e2.ID || got[1].ID != e3.ID {
		t.Errorf("order wrong: %v", got)
	}
	if cursor != e3.ID {
		t.Errorf("cursor: got %q want %q", cursor, e3.ID)
	}
	if drops != 0 {
		t.Errorf("drops: got %d want 0", drops)
	}
}

func TestSince_EmptyCursorReturnsAll(t *testing.T) {
	b := New(Options{MaxAge: time.Minute, Cap: 100})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionStopped})

	got, _, _ := b.Since("")
	if len(got) != 2 {
		t.Fatalf("want 2 events, got %d", len(got))
	}
}

func TestEviction_ByCap(t *testing.T) {
	b := New(Options{MaxAge: time.Hour, Cap: 3})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated}) // causes eviction

	got, _, _ := b.Since("")
	if len(got) != 3 {
		t.Fatalf("cap not enforced: got %d events, want 3", len(got))
	}
}

func TestEviction_ByAge(t *testing.T) {
	now := time.Now()
	b := New(Options{MaxAge: 10 * time.Millisecond, Cap: 100, clock: func() time.Time { return now }})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	now = now.Add(20 * time.Millisecond)
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated}) // first is now stale

	got, _, _ := b.Since("")
	if len(got) != 1 {
		t.Fatalf("age eviction failed: got %d, want 1", len(got))
	}
}

func TestDrops_IncrementWhenEvictingUnreadEvent(t *testing.T) {
	b := New(Options{MaxAge: time.Hour, Cap: 2})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated}) // evicts #1 (unread)
	_, _, drops := b.Since("")
	if drops != 1 {
		t.Fatalf("drops: got %d, want 1", drops)
	}
}

func TestDrops_DoNotIncrementWhenEvictingObservedEvent(t *testing.T) {
	b := New(Options{MaxAge: time.Hour, Cap: 2})
	e1 := b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	// Observe e1 so it's considered "read"
	_, cursor, _ := b.Since("")
	_ = cursor
	_ = e1
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated}) // evicts #1 (observed)
	_, _, drops := b.Since(cursor)
	if drops != 0 {
		t.Fatalf("drops: got %d, want 0 (evicted event was already observed)", drops)
	}
}

func TestEviction_ByAge_AllStale(t *testing.T) {
	// Use a fixed base time so we can control all timestamps explicitly.
	base := time.Now()
	// Clock is frozen at base+50ms — far past MaxAge of 10ms.
	// All events in this test are appended with explicit stale timestamps so
	// evictLocked sees every entry as older than MaxAge, exercising the
	// "keep := 0 stays 0 when no fresh event is found" bug path.
	frozenNow := base.Add(50 * time.Millisecond)
	b := New(Options{MaxAge: 10 * time.Millisecond, Cap: 100, clock: func() time.Time { return frozenNow }})

	// Append three events with explicit stale timestamps (age = 50ms > 10ms MaxAge).
	staleTS := base
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated, Timestamp: staleTS})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated, Timestamp: staleTS})
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated, Timestamp: staleTS})

	// A fourth append also carries a stale timestamp — evictLocked will see
	// all four events as stale (no fresh event exists), hitting the bug.
	b.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated, Timestamp: staleTS})

	got, _, drops := b.Since("")
	// With the bug (keep := 0): b.events[0:] keeps all 4 events → len == 4.
	// After the fix (keep := len(b.events)): b.events[4:] empties the buffer → len == 0.
	if len(got) != 0 {
		t.Fatalf("want 0 events after all-stale eviction, got %d", len(got))
	}
	// All four events were never observed → 4 drops.
	if drops != 4 {
		t.Errorf("drops: got %d, want 4", drops)
	}
}
