package contextapi

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func newTestServer(t *testing.T) *Server {
	t.Helper()
	s, err := contextstore.Open(context.Background(), contextstore.Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = s.Close() })
	return NewServer(s, contextpolicy.New())
}

func TestWriteAndHistorySuccess(t *testing.T) {
	srv := newTestServer(t)

	for i := 0; i < 2; i++ {
		body := map[string]any{
			"client_id": "editor",
			"actor":     "app:editor",
			"namespace": "app/editor/session",
			"key":       "summary",
			"payload":   map[string]any{"n": i + 1},
		}
		res := performJSON(t, srv, http.MethodPost, "/v1/context/write", body)
		if res.Code != http.StatusOK {
			t.Fatalf("write status=%d body=%s", res.Code, res.Body.String())
		}
	}

	res := performJSON(t, srv, http.MethodGet, "/v1/context/history?namespace=app/editor/session&key=summary", nil)
	if res.Code != http.StatusOK {
		t.Fatalf("history status=%d body=%s", res.Code, res.Body.String())
	}

	var payload struct {
		Items []struct {
			Revision int64 `json:"Revision"`
		} `json:"items"`
	}
	if err := json.Unmarshal(res.Body.Bytes(), &payload); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if len(payload.Items) != 2 || payload.Items[0].Revision != 1 || payload.Items[1].Revision != 2 {
		t.Fatalf("unexpected history ordering: %+v", payload.Items)
	}
}

func TestPolicyDeniedWrite(t *testing.T) {
	srv := newTestServer(t)
	res := performJSON(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
		"client_id": "editor",
		"actor":     "app:editor",
		"namespace": "app/other/session",
		"key":       "summary",
		"payload":   map[string]any{"ok": true},
	})
	if res.Code != http.StatusForbidden {
		t.Fatalf("expected 403 got %d body=%s", res.Code, res.Body.String())
	}
}

func TestValidationError(t *testing.T) {
	srv := newTestServer(t)
	res := performJSON(t, srv, http.MethodGet, "/v1/context/head?namespace=app/editor/session", nil)
	if res.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 got %d body=%s", res.Code, res.Body.String())
	}
}

func TestViewDeterministicOrdering(t *testing.T) {
	srv := newTestServer(t)

	writes := []map[string]any{
		{"client_id": "editor", "actor": "app:editor", "namespace": "app/editor/session", "key": "b", "payload": map[string]any{"v": 1}},
		{"client_id": "editor", "actor": "app:editor", "namespace": "app/editor/session", "key": "a", "payload": map[string]any{"v": 2}},
		{"client_id": "editor", "actor": "app:editor", "namespace": "app/editor/session", "key": "a", "payload": map[string]any{"v": 3}},
	}
	for _, w := range writes {
		res := performJSON(t, srv, http.MethodPost, "/v1/context/write", w)
		if res.Code != http.StatusOK {
			t.Fatalf("write status=%d body=%s", res.Code, res.Body.String())
		}
	}

	selector := map[string]any{
		"selector": map[string]any{
			"namespaces":     []string{"app/editor/*"},
			"revision_scope": "all",
			"order":          []string{"namespace", "key", "revision"},
		},
		"include_payload": false,
	}

	a := performJSON(t, srv, http.MethodPost, "/v1/views/evaluate", selector)
	b := performJSON(t, srv, http.MethodPost, "/v1/views/evaluate", selector)
	if a.Code != http.StatusOK || b.Code != http.StatusOK {
		t.Fatalf("view failed: %d/%d", a.Code, b.Code)
	}

	var pa, pb map[string]any
	if err := json.Unmarshal(a.Body.Bytes(), &pa); err != nil {
		t.Fatalf("unmarshal A: %v", err)
	}
	if err := json.Unmarshal(b.Body.Bytes(), &pb); err != nil {
		t.Fatalf("unmarshal B: %v", err)
	}
	if !reflect.DeepEqual(pa, pb) {
		t.Fatalf("view response not deterministic")
	}
}

func performJSON(t *testing.T, h http.Handler, method, path string, body any) *httptest.ResponseRecorder {
	t.Helper()
	var reqBody []byte
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			t.Fatalf("marshal body: %v", err)
		}
		reqBody = b
	}
	req := httptest.NewRequest(method, path, bytes.NewReader(reqBody))
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	res := httptest.NewRecorder()
	h.ServeHTTP(res, req)
	return res
}
