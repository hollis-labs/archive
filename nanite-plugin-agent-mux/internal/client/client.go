// Package client wraps *agentmux.Client with a status field the rest of
// the plugin reads through a single seam. The wrapper owns the health
// probe schedule so status transitions flow through one place.
package client

import (
	"context"
	"sync"
)

// Status mirrors the plugin-health vocabulary from the spec.
type Status string

const (
	StatusConnected            Status = "connected"
	StatusDisconnectedRetrying Status = "disconnected-retrying"
	StatusDaemonAbsent         Status = "daemon-absent"
)

// Pinger is the minimum surface Wrapper depends on. Real callers pass
// *agentmux.Client; tests pass a fake.
type Pinger interface {
	Ping(ctx context.Context) error
}

// Wrapper holds a *agentmux.Client (or fake) plus a status field.
type Wrapper struct {
	mu      sync.RWMutex
	inner   Pinger
	status  Status
	lastErr error
}

// NewWith constructs a Wrapper around an existing Pinger. Production
// callers build the real client and pass it in.
func NewWith(p Pinger) *Wrapper {
	return &Wrapper{inner: p, status: StatusDaemonAbsent}
}

// Status returns the current connection state.
func (w *Wrapper) Status() Status {
	w.mu.RLock()
	defer w.mu.RUnlock()
	return w.status
}

// LastError returns the last probe or subscribe error (for /health body).
func (w *Wrapper) LastError() string {
	w.mu.RLock()
	defer w.mu.RUnlock()
	if w.lastErr == nil {
		return ""
	}
	return w.lastErr.Error()
}

// Probe pings the daemon and updates status. Returns the ping error for
// the caller to surface if they care; status reflects the outcome.
func (w *Wrapper) Probe(ctx context.Context) error {
	err := w.inner.Ping(ctx)
	w.mu.Lock()
	defer w.mu.Unlock()
	if err != nil {
		w.status = StatusDaemonAbsent
		w.lastErr = err
		return err
	}
	w.status = StatusConnected
	w.lastErr = nil
	return nil
}

// SetStatus is used by the subscriber loops to record transitions
// (connected → disconnected-retrying on SSE disconnect, etc.).
func (w *Wrapper) SetStatus(s Status, cause error) {
	w.mu.Lock()
	defer w.mu.Unlock()
	w.status = s
	w.lastErr = cause
}
