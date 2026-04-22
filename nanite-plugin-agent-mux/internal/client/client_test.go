package client

import (
	"context"
	"testing"
)

type fakeAgentmux struct {
	healthErr error
	healthHit int
}

func (f *fakeAgentmux) Ping(ctx context.Context) error {
	f.healthHit++
	return f.healthErr
}

func TestProbe_HealthyMarksConnected(t *testing.T) {
	w := NewWith(&fakeAgentmux{})
	if err := w.Probe(context.Background()); err != nil {
		t.Fatalf("probe: %v", err)
	}
	if w.Status() != StatusConnected {
		t.Errorf("status: got %s, want %s", w.Status(), StatusConnected)
	}
}

func TestProbe_ErrorMarksDaemonAbsent(t *testing.T) {
	w := NewWith(&fakeAgentmux{healthErr: errPingFailed})
	if err := w.Probe(context.Background()); err == nil {
		t.Fatalf("probe: want error, got nil")
	}
	if w.Status() != StatusDaemonAbsent {
		t.Errorf("status: got %s, want %s", w.Status(), StatusDaemonAbsent)
	}
}

var errPingFailed = &pingErr{}

type pingErr struct{}

func (e *pingErr) Error() string { return "ping failed" }
