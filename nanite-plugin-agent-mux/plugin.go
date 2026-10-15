// Package main implements nanite-plugin-agent-mux. The plugin subscribes
// to a local Agent Mux daemon's /events/stream SSE feed, classifies each
// event into an ActivityEvent, and exposes the ring buffer over two
// polled HTTP routes consumed by the Mux Activity widget registered in
// plugin.yaml.
package main

import (
	"context"
	"fmt"
	"strconv"
	"sync"
	"time"

	agentmux "github.com/hollis-labs/go-agentmux-client"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/buffer"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/client"
	pluginhttp "github.com/hollis-labs/nanite-plugin-agent-mux/internal/http"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/subscribe"
	sdksub "github.com/hollis-labs/plugin-sdk/subprocess"
)

type muxPlugin struct {
	listenAddr    string
	bufferSeconds int
	bufferCap     int
	autoStart     bool

	client *client.Wrapper
	buf    *buffer.Buffer
	http   *pluginhttp.Handler

	cancel context.CancelFunc
	wg     sync.WaitGroup
}

func (p *muxPlugin) Init(ctx context.Context, params sdksub.InitParams) (sdksub.InitResult, error) {
	p.listenAddr = params.Config["muxd_listen_addr"]
	p.bufferSeconds = parseIntDefault(params.Config["buffer_seconds"], 60)
	p.bufferCap = parseIntDefault(params.Config["buffer_cap"], 500)
	p.autoStart = parseBoolDefault(params.Config["auto_start"], true)

	return sdksub.InitResult{
		ID:          "agent-mux",
		Name:        "Agent Mux",
		Version:     "0.1.0",
		Description: "Live activity visualization for a local Agent Mux daemon.",
		Protocol:    sdksub.ProtocolVersion,
	}, nil
}

func (p *muxPlugin) Load(ctx context.Context) (sdksub.LoadResult, error) {
	amClient, err := agentmux.New(p.listenAddr)
	if err != nil {
		return sdksub.LoadResult{}, fmt.Errorf("build agentmux client: %w", err)
	}

	p.client = client.NewWith(amClient)
	p.buf = buffer.New(buffer.Options{
		MaxAge: time.Duration(p.bufferSeconds) * time.Second,
		Cap:    p.bufferCap,
	})
	p.http = pluginhttp.NewHandler(p.buf, p.client)

	// Probe health; a missing daemon is a runtime condition, not a plugin fault.
	_ = p.client.Probe(ctx)

	if p.autoStart {
		runCtx, cancel := context.WithCancel(context.Background())
		p.cancel = cancel

		events := subscribe.NewEventsSubscriber(amClient, p.buf, p.client)
		p.wg.Add(1)
		go func() { defer p.wg.Done(); events.Run(runCtx) }()
	}

	return sdksub.LoadResult{}, nil
}

func (p *muxPlugin) Unload(ctx context.Context) error {
	if p.cancel != nil {
		p.cancel()
	}
	// Bounded wait — don't block Unload forever if a goroutine hangs.
	done := make(chan struct{})
	go func() { p.wg.Wait(); close(done) }()
	select {
	case <-done:
	case <-time.After(3 * time.Second):
	}
	return nil
}

// HTTPHandle implements subprocess.HTTPHandler, delegating to the http
// package's dispatcher. This is required so subprocess.Serve detects
// the handler via type assertion.
func (p *muxPlugin) HTTPHandle(ctx context.Context, req sdksub.HTTPRequest) (sdksub.HTTPResponse, error) {
	if p.http == nil {
		return sdksub.HTTPResponse{Status: 503, Body: []byte("plugin not loaded")}, nil
	}
	return p.http.HTTPHandle(ctx, req)
}

func parseIntDefault(s string, def int) int {
	if s == "" {
		return def
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return def
	}
	return n
}

func parseBoolDefault(s string, def bool) bool {
	if s == "" {
		return def
	}
	b, err := strconv.ParseBool(s)
	if err != nil {
		return def
	}
	return b
}
