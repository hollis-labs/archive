//go:build e2e_mux

package subscribe

import (
	"context"
	"os"
	"testing"
	"time"

	agentmux "github.com/hollis-labs/go-agentmux-client"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/buffer"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/client"
)

// TestE2E_EventsStreamAppendsOnRealMuxd verifies the events subscriber
// can connect to a real muxd daemon and transition to StatusConnected.
// Requires MUX_E2E_LISTEN_ADDR pointing at a running daemon.
//
// Run: MUX_E2E_LISTEN_ADDR=unix:~/.agent-mux/run/muxd.sock \
//          go test -race -tags e2e_mux ./internal/subscribe/...
func TestE2E_EventsStreamAppendsOnRealMuxd(t *testing.T) {
	addr := os.Getenv("MUX_E2E_LISTEN_ADDR")
	if addr == "" {
		t.Skip("MUX_E2E_LISTEN_ADDR not set — skipping e2e test")
	}

	amClient, err := agentmux.New(addr)
	if err != nil {
		t.Fatalf("new client: %v", err)
	}

	buf := buffer.New(buffer.Options{MaxAge: time.Minute, Cap: 100})
	wrap := client.NewWith(amClient)
	sub := NewEventsSubscriber(amClient, buf, wrap)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	go sub.Run(ctx)

	// Wait for the subscriber to reach connected state, or time out.
	deadline := time.Now().Add(3 * time.Second)
	for time.Now().Before(deadline) {
		if wrap.Status() == client.StatusConnected {
			break
		}
		time.Sleep(100 * time.Millisecond)
	}
	if wrap.Status() != client.StatusConnected {
		t.Fatalf("subscriber never reached connected; status=%s last_err=%q",
			wrap.Status(), wrap.LastError())
	}

	// Success — the subscriber connected. We don't try to trigger an
	// event here because that depends on the caller's catalog having
	// at least one launch; keep this test's scope limited to the SSE
	// connection path.
	<-ctx.Done()
}
