// Package classify projects raw Agent Mux events and messaging envelopes
// into the typed ActivityEvent vocabulary. Unknown inputs project to
// KindUnknown with the raw type preserved under Facets["raw_type"] so
// new event shapes surface rather than silently vanish.
package classify

import (
	agentmux "github.com/hollis-labs/go-agentmux-client"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/activity"
)

// ProjectStreamEvent maps a daemon /events/stream event into an
// ActivityEvent. The switch labels are the real Kind strings the Mux
// daemon emits (defined in agent-mux internal/events/kinds.go).
func ProjectStreamEvent(ev agentmux.StreamEvent) activity.ActivityEvent {
	out := activity.ActivityEvent{
		SessionID: ev.SessionID,
		Facets:    map[string]string{},
	}
	switch ev.Event {
	case "session.state_changed":
		out.Kind = activity.KindSessionState
	case "broker.envelope_created":
		out.Kind = activity.KindEnvelopeCreated
	case "broker.envelope_replied":
		out.Kind = activity.KindEnvelopeReplied
	default:
		out.Kind = activity.KindUnknown
		out.Facets["raw_type"] = ev.Event
	}
	return out
}
