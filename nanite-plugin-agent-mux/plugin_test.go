package main

import (
	"context"
	"encoding/json"
	"testing"

	sdksub "github.com/hollis-labs/plugin-sdk/subprocess"
	"github.com/hollis-labs/plugin-sdk/subprocess/subprocesstest"
)

// TestPlugin_InitLoadSnapshotUnload drives the plugin end-to-end via
// the SDK harness. We set muxd_listen_addr to a nonexistent unix socket
// path and auto_start=false so the subscriber loop doesn't try to reach
// a real daemon — we only want to verify Init/Load/HTTPHandle/Unload
// compose correctly.
//
// NOTE: the address must carry the unix: scheme prefix so agentmux.New
// can construct its HTTP transport without error. A bare path (no
// prefix) is rejected synchronously by transportFor.
func TestPlugin_InitLoadSnapshotUnload(t *testing.T) {
	p := &muxPlugin{}
	h := subprocesstest.New(t, p,
		subprocesstest.WithConfig(map[string]string{
			"muxd_listen_addr": "unix:/does/not/exist/muxd.sock",
			"buffer_seconds":   "60",
			"buffer_cap":       "100",
			"auto_start":       "false",
		}),
	)
	defer h.Close()

	ctx := context.Background()

	if _, err := h.Init(ctx); err != nil {
		t.Fatalf("Init: %v", err)
	}
	if _, err := h.Load(ctx); err != nil {
		t.Fatalf("Load: %v", err)
	}

	// Snapshot: expect 200 + a valid JSON body with empty events.
	resp, err := p.HTTPHandle(ctx, sdksub.HTTPRequest{
		Method: "GET",
		Path:   "/api/plugins/agent-mux/activity/snapshot",
	})
	if err != nil {
		t.Fatalf("HTTPHandle snapshot: %v", err)
	}
	if resp.Status != 200 {
		t.Fatalf("snapshot status: %d", resp.Status)
	}
	var snap struct {
		Events []any  `json:"events"`
		Cursor string `json:"cursor"`
		Drops  int64  `json:"drops"`
	}
	if err := json.Unmarshal(resp.Body, &snap); err != nil {
		t.Fatalf("snapshot body unmarshal: %v", err)
	}
	if len(snap.Events) != 0 {
		t.Errorf("want empty snapshot, got %d events", len(snap.Events))
	}

	// Health: expect 200 and a status field present.
	resp, err = p.HTTPHandle(ctx, sdksub.HTTPRequest{
		Method: "GET",
		Path:   "/api/plugins/agent-mux/activity/health",
	})
	if err != nil {
		t.Fatalf("HTTPHandle health: %v", err)
	}
	if resp.Status != 200 {
		t.Fatalf("health status: %d", resp.Status)
	}
	var health struct {
		Status string `json:"status"`
	}
	if err := json.Unmarshal(resp.Body, &health); err != nil {
		t.Fatalf("health body unmarshal: %v", err)
	}
	if health.Status == "" {
		t.Errorf("health status empty")
	}

	// Unknown path returns 404.
	resp, err = p.HTTPHandle(ctx, sdksub.HTTPRequest{
		Method: "GET",
		Path:   "/api/plugins/agent-mux/nope",
	})
	if err != nil {
		t.Fatalf("HTTPHandle unknown: %v", err)
	}
	if resp.Status != 404 {
		t.Errorf("unknown path status: got %d, want 404", resp.Status)
	}

	if err := h.Unload(ctx); err != nil {
		t.Fatalf("Unload: %v", err)
	}
}
