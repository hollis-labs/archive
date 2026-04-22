package classify

import (
	"testing"

	agentmux "github.com/hollis-labs/go-agentmux-client"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/activity"
)

func TestProjectStreamEvent_SessionStateChanged(t *testing.T) {
	// Real Mux field: Event (not Type). Real string: "session.state_changed".
	in := agentmux.StreamEvent{Event: "session.state_changed", SessionID: "s-1"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindSessionState {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindSessionState)
	}
	if out.SessionID != "s-1" {
		t.Errorf("session id: got %q", out.SessionID)
	}
}

func TestProjectStreamEvent_EnvelopeCreated(t *testing.T) {
	// Real Mux string: "broker.envelope_created".
	in := agentmux.StreamEvent{Event: "broker.envelope_created", SessionID: "s-2"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindEnvelopeCreated {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindEnvelopeCreated)
	}
}

func TestProjectStreamEvent_EnvelopeReplied(t *testing.T) {
	// Real Mux string: "broker.envelope_replied".
	in := agentmux.StreamEvent{Event: "broker.envelope_replied", SessionID: "s-3"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindEnvelopeReplied {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindEnvelopeReplied)
	}
}

func TestProjectStreamEvent_Unknown(t *testing.T) {
	in := agentmux.StreamEvent{Event: "exotic.new.type", SessionID: "s-4"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindUnknown {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindUnknown)
	}
	if out.Facets["raw_type"] != "exotic.new.type" {
		t.Errorf("raw_type not preserved: %+v", out.Facets)
	}
}

func TestProjectStreamEvent_DaemonStarted(t *testing.T) {
	in := agentmux.StreamEvent{Event: "daemon.started"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindDaemonStarted {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindDaemonStarted)
	}
}

func TestProjectStreamEvent_DaemonShutdownStarted(t *testing.T) {
	in := agentmux.StreamEvent{Event: "daemon.shutdown_started"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindDaemonShutdown {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindDaemonShutdown)
	}
}

func TestProjectStreamEvent_DaemonShutdownCompleted(t *testing.T) {
	in := agentmux.StreamEvent{Event: "daemon.shutdown_completed"}
	out := ProjectStreamEvent(in)
	if out.Kind != activity.KindDaemonShutdown {
		t.Errorf("kind: got %s, want %s", out.Kind, activity.KindDaemonShutdown)
	}
}
