// Package main implements nanite-plugin-agent-mux. The plugin subscribes
// to a local Agent Mux daemon's /events/stream and /messages/subscribe
// SSE feeds, classifies each event into an ActivityEvent, and exposes
// the ring buffer over two polled HTTP routes consumed by the Mux
// Activity widget registered in plugin.yaml.
package main

import (
	"context"

	"github.com/hollis-labs/plugin-sdk/subprocess"
)

type muxPlugin struct {
	// Fields populated in subsequent tasks:
	//   client, buffer, subscribers, config — added incrementally.
}

func (p *muxPlugin) Init(ctx context.Context, params subprocess.InitParams) (subprocess.InitResult, error) {
	return subprocess.InitResult{
		ID:          "agent-mux",
		Name:        "Agent Mux",
		Version:     "0.1.0",
		Description: "Live activity visualization for a local Agent Mux daemon.",
		Protocol:    subprocess.ProtocolVersion,
	}, nil
}

func (p *muxPlugin) Load(ctx context.Context) (subprocess.LoadResult, error) {
	return subprocess.LoadResult{}, nil
}

func (p *muxPlugin) Unload(ctx context.Context) error {
	return nil
}
