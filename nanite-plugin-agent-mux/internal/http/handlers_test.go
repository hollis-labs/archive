package http

import (
	"context"
	"encoding/json"
	"testing"
	"time"

	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/activity"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/buffer"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/client"
	sdksub "github.com/hollis-labs/plugin-sdk/subprocess"
)

func TestSnapshot_EmptyBuffer(t *testing.T) {
	buf := buffer.New(buffer.Options{MaxAge: time.Minute, Cap: 100})
	wrap := client.NewWith(&noopPing{})
	h := NewHandler(buf, wrap)

	resp, err := h.HTTPHandle(context.Background(), sdksub.HTTPRequest{
		Method: "GET",
		Path:   "/api/plugins/agent-mux/activity/snapshot",
	})
	if err != nil {
		t.Fatal(err)
	}
	if resp.Status != 200 {
		t.Fatalf("status: %d", resp.Status)
	}
	var body struct {
		Events []activity.ActivityEvent `json:"events"`
		Cursor string                   `json:"cursor"`
		Drops  int64                    `json:"drops"`
	}
	if err := json.Unmarshal(resp.Body, &body); err != nil {
		t.Fatal(err)
	}
	if len(body.Events) != 0 {
		t.Errorf("want empty, got %d", len(body.Events))
	}
}

func TestSnapshot_WithSinceCursor(t *testing.T) {
	buf := buffer.New(buffer.Options{MaxAge: time.Minute, Cap: 100})
	wrap := client.NewWith(&noopPing{})
	h := NewHandler(buf, wrap)

	e1 := buf.Append(activity.ActivityEvent{Kind: activity.KindSessionCreated})
	buf.Append(activity.ActivityEvent{Kind: activity.KindSessionStopped})

	resp, _ := h.HTTPHandle(context.Background(), sdksub.HTTPRequest{
		Method: "GET",
		Path:   "/api/plugins/agent-mux/activity/snapshot",
		Query:  map[string]string{"since": e1.ID},
	})
	var body struct {
		Events []activity.ActivityEvent `json:"events"`
	}
	_ = json.Unmarshal(resp.Body, &body)
	if len(body.Events) != 1 {
		t.Fatalf("want 1 event after cursor, got %d", len(body.Events))
	}
}

func TestHealth_Shape(t *testing.T) {
	buf := buffer.New(buffer.Options{MaxAge: time.Minute, Cap: 100})
	wrap := client.NewWith(&noopPing{})
	h := NewHandler(buf, wrap)

	resp, _ := h.HTTPHandle(context.Background(), sdksub.HTTPRequest{
		Method: "GET",
		Path:   "/api/plugins/agent-mux/activity/health",
	})
	if resp.Status != 200 {
		t.Fatalf("status: %d", resp.Status)
	}
	var body struct {
		Status    string `json:"status"`
		LastError string `json:"last_error"`
	}
	_ = json.Unmarshal(resp.Body, &body)
	if body.Status == "" {
		t.Errorf("status field empty")
	}
}

func TestHTTPHandle_UnknownPath404(t *testing.T) {
	buf := buffer.New(buffer.Options{MaxAge: time.Minute, Cap: 100})
	wrap := client.NewWith(&noopPing{})
	h := NewHandler(buf, wrap)

	resp, _ := h.HTTPHandle(context.Background(), sdksub.HTTPRequest{Method: "GET", Path: "/api/plugins/agent-mux/nope"})
	if resp.Status != 404 {
		t.Errorf("status: got %d, want 404", resp.Status)
	}
}

type noopPing struct{}

func (noopPing) Ping(context.Context) error { return nil }
