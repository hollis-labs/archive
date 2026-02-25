package integration

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextapi"
	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func TestPolicyAndDeterminismEndToEnd(t *testing.T) {
	srv := newServer(t)

	if got := perform(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
		"client_id": "editor",
		"actor":     "app:editor",
		"namespace": "app/other/session",
		"key":       "k",
		"payload":   map[string]any{"v": 1},
	}); got.Code != http.StatusForbidden {
		t.Fatalf("cross-namespace write expected 403 got %d body=%s", got.Code, got.Body.String())
	}

	for _, payload := range []map[string]any{{"v": 1}, {"v": 2}} {
		if got := perform(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
			"client_id": "editor",
			"actor":     "app:editor",
			"namespace": "app/editor/session",
			"key":       "summary",
			"payload":   payload,
		}); got.Code != http.StatusOK {
			t.Fatalf("valid app write expected 200 got %d body=%s", got.Code, got.Body.String())
		}
	}

	if got := perform(t, srv, http.MethodPost, "/v1/context/promote", map[string]any{
		"client_id":      "editor",
		"actor":          "app:editor",
		"from_namespace": "app/editor/session",
		"from_key":       "summary",
		"to_namespace":   "user/notes",
		"to_key":         "daily",
	}); got.Code != http.StatusForbidden {
		t.Fatalf("promote without user actor expected 403 got %d body=%s", got.Code, got.Body.String())
	}

	if got := perform(t, srv, http.MethodPost, "/v1/context/promote", map[string]any{
		"client_id":      "editor",
		"actor":          "user",
		"from_namespace": "app/editor/session",
		"from_key":       "summary",
		"to_namespace":   "user/notes",
		"to_key":         "daily",
	}); got.Code != http.StatusOK {
		t.Fatalf("promote with user actor expected 200 got %d body=%s", got.Code, got.Body.String())
	}

	headBefore := perform(t, srv, http.MethodGet, "/v1/context/head?namespace=app/editor/session&key=summary", nil)
	if headBefore.Code != http.StatusOK {
		t.Fatalf("head before view expected 200 got %d body=%s", headBefore.Code, headBefore.Body.String())
	}

	selectorReq := map[string]any{
		"selector": map[string]any{
			"namespaces":     []string{"app/editor/*", "user/*"},
			"revision_scope": "all",
			"order":          []string{"namespace", "key", "revision"},
		},
		"include_payload": true,
	}
	viewA := perform(t, srv, http.MethodPost, "/v1/views/evaluate", selectorReq)
	viewB := perform(t, srv, http.MethodPost, "/v1/views/evaluate", selectorReq)
	if viewA.Code != http.StatusOK || viewB.Code != http.StatusOK {
		t.Fatalf("view expected 200 got %d/%d", viewA.Code, viewB.Code)
	}

	var a, b map[string]any
	if err := json.Unmarshal(viewA.Body.Bytes(), &a); err != nil {
		t.Fatalf("unmarshal viewA: %v", err)
	}
	if err := json.Unmarshal(viewB.Body.Bytes(), &b); err != nil {
		t.Fatalf("unmarshal viewB: %v", err)
	}
	if !reflect.DeepEqual(a, b) {
		t.Fatalf("view responses differ across identical requests")
	}

	headAfter := perform(t, srv, http.MethodGet, "/v1/context/head?namespace=app/editor/session&key=summary", nil)
	if headAfter.Code != http.StatusOK {
		t.Fatalf("head after view expected 200 got %d body=%s", headAfter.Code, headAfter.Body.String())
	}
	if headBefore.Body.String() != headAfter.Body.String() {
		t.Fatalf("view should be side-effect free, head changed")
	}
}

func newServer(t *testing.T) *contextapi.Server {
	t.Helper()
	s, err := contextstore.Open(context.Background(), contextstore.Config{RootDir: t.TempDir()})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = s.Close() })
	return contextapi.NewServer(s, contextpolicy.New())
}

func perform(t *testing.T, h http.Handler, method, path string, body any) *httptest.ResponseRecorder {
	t.Helper()
	var payload []byte
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			t.Fatalf("marshal: %v", err)
		}
		payload = b
	}
	req := httptest.NewRequest(method, path, bytes.NewReader(payload))
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)
	return w
}
