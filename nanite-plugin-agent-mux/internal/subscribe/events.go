// Package subscribe owns the goroutine that consumes muxd's /events/stream
// SSE feed, routes events through the classifier, and appends them to
// the ring buffer. The subscriber owns a reconnect/backoff loop and
// updates the client wrapper's status on disconnect/reconnect.
package subscribe

import (
	"context"
	"time"

	agentmux "github.com/hollis-labs/go-agentmux-client"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/buffer"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/classify"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/client"
)

// EventStreamer is the minimum surface the events subscriber depends on.
// Real callers pass *agentmux.Client; tests pass a fake.
type EventStreamer interface {
	StreamEvents(ctx context.Context, opts agentmux.StreamEventsOptions) (<-chan agentmux.StreamEvent, <-chan error)
}

// EventsSubscriber consumes /events/stream and appends classified
// events to buf. On disconnect it flips the wrapper to
// StatusDisconnectedRetrying and reconnects with exponential backoff
// (1s → 30s cap).
type EventsSubscriber struct {
	streamer EventStreamer
	buf      *buffer.Buffer
	client   *client.Wrapper
}

// NewEventsSubscriber constructs the subscriber.
func NewEventsSubscriber(s EventStreamer, buf *buffer.Buffer, c *client.Wrapper) *EventsSubscriber {
	return &EventsSubscriber{streamer: s, buf: buf, client: c}
}

// Run blocks until ctx is canceled, reconnecting on error.
func (s *EventsSubscriber) Run(ctx context.Context) {
	backoff := time.Second
	const maxBackoff = 30 * time.Second

	for {
		if ctx.Err() != nil {
			return
		}
		events, errs := s.streamer.StreamEvents(ctx, agentmux.StreamEventsOptions{})
		s.client.SetStatus(client.StatusConnected, nil)
		backoff = time.Second // reset so transient disconnects don't inflate future waits
		disconnected := s.consume(ctx, events, errs)
		if !disconnected {
			return // ctx canceled, clean exit
		}
		s.client.SetStatus(client.StatusDisconnectedRetrying, nil)
		select {
		case <-ctx.Done():
			return
		case <-time.After(backoff):
		}
		if backoff < maxBackoff {
			backoff *= 2
			if backoff > maxBackoff {
				backoff = maxBackoff
			}
		}
	}
}

// consume processes one streaming session. Returns true if the stream
// ended due to disconnect (caller should reconnect), false if due to
// context cancellation.
func (s *EventsSubscriber) consume(ctx context.Context, events <-chan agentmux.StreamEvent, errs <-chan error) bool {
	for {
		select {
		case <-ctx.Done():
			return false
		case ev, ok := <-events:
			if !ok {
				return true
			}
			s.buf.Append(classify.ProjectStreamEvent(ev))
		case err, ok := <-errs:
			if !ok {
				return true
			}
			s.client.SetStatus(client.StatusDisconnectedRetrying, err)
			return true
		}
	}
}
