// Package activity defines the wire vocabulary this plugin uses to
// describe Agent Mux activity. It is consumed by the ring buffer and
// the HTTP handlers and serialized to the Mux Activity widget.
package activity

import "time"

// ActivityKind is the typed vocabulary of events the classifier projects
// raw muxd events into. Unknown types are preserved under KindUnknown
// with raw_type in Facets so new event shapes surface rather than vanish.
type ActivityKind string

const (
	KindSessionCreated    ActivityKind = "session.created"
	KindSessionState      ActivityKind = "session.state"
	KindSessionStopped    ActivityKind = "session.stopped"
	KindMessageDispatched ActivityKind = "message.dispatched"
	KindMessageDelivered  ActivityKind = "message.delivered"
	KindMessageReplied    ActivityKind = "message.replied"
	KindEnvelopeCreated   ActivityKind = "envelope.created"
	KindEnvelopeReplied   ActivityKind = "envelope.replied"
	KindDaemonStarted     ActivityKind = "daemon.started"
	KindDaemonShutdown    ActivityKind = "daemon.shutdown"
	KindUnknown           ActivityKind = "unknown"
)

// ActivityEvent is the typed projection of a raw muxd event. Facets is
// the open-ended extension point the classifier uses for axes not
// captured by the fixed fields (e.g. raw_type, launch_id, group_id).
type ActivityEvent struct {
	ID        string            `json:"id"`
	Timestamp time.Time         `json:"timestamp"`
	Kind      ActivityKind      `json:"kind"`
	SessionID string            `json:"session_id,omitempty"`
	ActorID   string            `json:"actor_id,omitempty"`
	Provider  string            `json:"provider,omitempty"`
	Summary   string            `json:"summary,omitempty"`
	Facets    map[string]string `json:"facets,omitempty"`
}
