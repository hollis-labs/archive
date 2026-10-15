// Package http implements the plugin's HTTPHandle dispatcher and the
// two handlers the widget polls: activity snapshot (with since-cursor)
// and health.
//
// The plugin-sdk HTTPHandler path is request/response only; streaming
// is not supported. See the design spec §5.2 for rationale.
package http

import (
	"context"
	"encoding/json"

	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/buffer"
	"github.com/hollis-labs/nanite-plugin-agent-mux/internal/client"
	sdksub "github.com/hollis-labs/plugin-sdk/subprocess"
)

// Handler dispatches http/handle requests to the snapshot or health
// handler based on the request path.
type Handler struct {
	buf    *buffer.Buffer
	client *client.Wrapper
}

// NewHandler constructs a Handler.
func NewHandler(buf *buffer.Buffer, c *client.Wrapper) *Handler {
	return &Handler{buf: buf, client: c}
}

// HTTPHandle implements subprocess.HTTPHandler.
func (h *Handler) HTTPHandle(ctx context.Context, req sdksub.HTTPRequest) (sdksub.HTTPResponse, error) {
	switch req.Path {
	case "/api/plugins/agent-mux/activity/snapshot":
		return h.snapshot(req), nil
	case "/api/plugins/agent-mux/activity/health":
		return h.health(), nil
	default:
		return sdksub.HTTPResponse{
			Status:  404,
			Headers: map[string]string{"Content-Type": "text/plain"},
			Body:    []byte("not found"),
		}, nil
	}
}

func (h *Handler) snapshot(req sdksub.HTTPRequest) sdksub.HTTPResponse {
	since := req.Query["since"]
	events, cursor, drops := h.buf.Since(since)
	payload := map[string]any{
		"events": events,
		"cursor": cursor,
		"drops":  drops,
	}
	body, _ := json.Marshal(payload)
	return sdksub.HTTPResponse{
		Status:  200,
		Headers: map[string]string{"Content-Type": "application/json"},
		Body:    body,
	}
}

func (h *Handler) health() sdksub.HTTPResponse {
	body, _ := json.Marshal(struct {
		Status    string `json:"status"`
		LastError string `json:"last_error,omitempty"`
	}{
		Status:    string(h.client.Status()),
		LastError: h.client.LastError(),
	})
	return sdksub.HTTPResponse{
		Status:  200,
		Headers: map[string]string{"Content-Type": "application/json"},
		Body:    body,
	}
}
