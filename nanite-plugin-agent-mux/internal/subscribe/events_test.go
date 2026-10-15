package subscribe

import (
	"context"
	"testing"
	"time"

	agentmux "github.com/hollis-labs/go-agentmux-client"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/activity"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/buffer"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/client"
)

type fakeStreamer struct {
	events chan agentmux.StreamEvent
	errs   chan error
}

func (f *fakeStreamer) StreamEvents(ctx context.Context, _ agentmux.StreamEventsOptions) (<-chan agentmux.StreamEvent, <-chan error) {
	return f.events, f.errs
}

type noopPing struct{}

func (noopPing) Ping(context.Context) error { return nil }

func TestEventsSubscriber_ClassifiesAndAppends(t *testing.T) {
	fs := &fakeStreamer{
		events: make(chan agentmux.StreamEvent, 4),
		errs:   make(chan error, 1),
	}
	buf := buffer.New(buffer.Options{MaxAge: time.Minute, Cap: 100})
	wrap := client.NewWith(noopPing{})
	sub := NewEventsSubscriber(fs, buf, wrap)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	go sub.Run(ctx)

	// Use the real Mux event string so the classifier maps it.
	fs.events <- agentmux.StreamEvent{Event: "session.state_changed", SessionID: "s-1"}

	// Poll briefly for the event to appear in the buffer.
	deadline := time.Now().Add(500 * time.Millisecond)
	for time.Now().Before(deadline) {
		got, _, _ := buf.Since("")
		if len(got) >= 1 {
			if got[0].Kind != activity.KindSessionState || got[0].SessionID != "s-1" {
				t.Fatalf("unexpected event: %+v", got[0])
			}
			return
		}
		time.Sleep(10 * time.Millisecond)
	}
	t.Fatalf("event never appeared in buffer within 500ms")
}
