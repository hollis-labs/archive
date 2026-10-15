package broker

import "context"

// Broker defines the interface for agent matching and routing.
// Implemented by AgentBroker.
type Broker interface {
	// Match finds and ranks agents that can handle the request.
	Match(ctx context.Context, req MatchRequest) (MatchResult, error)
}
