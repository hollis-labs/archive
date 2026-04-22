package activity

import (
	"encoding/json"
	"testing"
	"time"
)

func TestActivityEvent_JSONShape(t *testing.T) {
	ev := ActivityEvent{
		ID:        "42",
		Timestamp: time.Date(2026, 4, 22, 12, 0, 0, 0, time.UTC),
		Kind:      KindSessionCreated,
		SessionID: "s-1",
		ActorID:   "user/alice",
		Provider:  "claude-stream",
		Summary:   "session started",
		Facets:    map[string]string{"launch_id": "L-7"},
	}
	b, err := json.Marshal(ev)
	if err != nil {
		t.Fatal(err)
	}
	got := string(b)
	want := `{"id":"42","timestamp":"2026-04-22T12:00:00Z","kind":"session.created","session_id":"s-1","actor_id":"user/alice","provider":"claude-stream","summary":"session started","facets":{"launch_id":"L-7"}}`
	if got != want {
		t.Errorf("json mismatch\n got:  %s\n want: %s", got, want)
	}
}

func TestActivityKind_Constants(t *testing.T) {
	want := []ActivityKind{
		KindSessionCreated,
		KindSessionState,
		KindSessionStopped,
		KindMessageDispatched,
		KindMessageDelivered,
		KindMessageReplied,
		KindEnvelopeCreated,
		KindEnvelopeReplied,
		KindDaemonStarted,
		KindDaemonShutdown,
		KindUnknown,
	}
	seen := map[ActivityKind]bool{}
	for _, k := range want {
		if seen[k] {
			t.Errorf("duplicate kind constant: %s", k)
		}
		if string(k) == "" {
			t.Errorf("empty kind constant")
		}
		seen[k] = true
	}
}
