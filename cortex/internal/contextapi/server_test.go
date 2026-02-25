package contextapi

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"reflect"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

func newTestServer(t *testing.T) *Server {
	srv, _ := newTestServerWithRoot(t)
	return srv
}

func newTestServerWithRoot(t *testing.T) (*Server, string) {
	t.Helper()
	root := t.TempDir()
	s, err := contextstore.Open(context.Background(), contextstore.Config{RootDir: root})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = s.Close() })
	return NewServer(s, contextpolicy.New()), root
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

func TestMutatingEndpointsRequireBearerTokenWhenConfigured(t *testing.T) {
	srv := newTestServer(t)
	srv.AuthToken = "secret-token"

	withoutToken := performJSON(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
		"client_id": "editor",
		"actor":     "app:editor",
		"namespace": "app/editor/session",
		"key":       "summary",
		"payload":   map[string]any{"n": 1},
	})
	if withoutToken.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401 without token, got %d body=%s", withoutToken.Code, withoutToken.Body.String())
	}

	withBadToken := performJSONWithHeaders(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
		"client_id": "editor",
		"actor":     "app:editor",
		"namespace": "app/editor/session",
		"key":       "summary",
		"payload":   map[string]any{"n": 1},
	}, map[string]string{"Authorization": "Bearer wrong-token"})
	if withBadToken.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401 with bad token, got %d body=%s", withBadToken.Code, withBadToken.Body.String())
	}

	withGoodToken := performJSONWithHeaders(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
		"client_id": "editor",
		"actor":     "app:editor",
		"namespace": "app/editor/session",
		"key":       "summary",
		"payload":   map[string]any{"n": 1},
	}, map[string]string{"Authorization": "Bearer secret-token"})
	if withGoodToken.Code != http.StatusOK {
		t.Fatalf("expected 200 with good token, got %d body=%s", withGoodToken.Code, withGoodToken.Body.String())
	}
}

func TestViewRejectsExcessiveLimit(t *testing.T) {
	srv := newTestServer(t)
	res := performJSON(t, srv, http.MethodPost, "/v1/views/evaluate", map[string]any{
		"selector": map[string]any{
			"namespaces": []string{"app/editor/*"},
			"limit":      100000,
		},
	})
	if res.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for excessive limit, got %d body=%s", res.Code, res.Body.String())
	}
}

func TestConsistencyScanAndRepairEndpoints(t *testing.T) {
	srv, root := newTestServerWithRoot(t)
	if _, err := srv.Store.AppendRecord(context.Background(), contextstore.AppendInput{
		Namespace: "app/editor/session",
		Key:       "summary",
		Actor:     "app:editor",
		Payload:   json.RawMessage(`{"v":1}`),
	}); err != nil {
		t.Fatalf("append: %v", err)
	}
	if _, err := srv.Store.AppendRecord(context.Background(), contextstore.AppendInput{
		Namespace: "app/editor/session",
		Key:       "summary",
		Actor:     "app:editor",
		Payload:   json.RawMessage(`{"v":2}`),
	}); err != nil {
		t.Fatalf("append: %v", err)
	}
	if err := os.Remove(filepath.Join(root, "data", "records", "app", "editor", "session", "summary", "2.json")); err != nil {
		t.Fatalf("remove payload: %v", err)
	}

	scan := performJSON(t, srv, http.MethodGet, "/v1/context/consistency/scan", nil)
	if scan.Code != http.StatusOK {
		t.Fatalf("scan status=%d body=%s", scan.Code, scan.Body.String())
	}
	var scanPayload struct {
		Count int `json:"count"`
	}
	if err := json.Unmarshal(scan.Body.Bytes(), &scanPayload); err != nil {
		t.Fatalf("unmarshal scan: %v", err)
	}
	if scanPayload.Count == 0 {
		t.Fatalf("expected at least one issue after payload removal")
	}

	srv.AuthToken = "repair-secret"
	repairUnauthorized := performJSON(t, srv, http.MethodPost, "/v1/context/consistency/repair", map[string]any{})
	if repairUnauthorized.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401 without token, got %d body=%s", repairUnauthorized.Code, repairUnauthorized.Body.String())
	}
	repair := performJSONWithHeaders(t, srv, http.MethodPost, "/v1/context/consistency/repair", map[string]any{}, map[string]string{
		"Authorization": "Bearer repair-secret",
	})
	if repair.Code != http.StatusOK {
		t.Fatalf("repair status=%d body=%s", repair.Code, repair.Body.String())
	}
}

func TestAuditEndpointIncludesWriteAndPromoteEvents(t *testing.T) {
	srv := newTestServer(t)

	write := performJSON(t, srv, http.MethodPost, "/v1/context/write", map[string]any{
		"client_id": "editor",
		"actor":     "app:editor",
		"namespace": "app/editor/session",
		"key":       "summary",
		"payload":   map[string]any{"v": 1},
	})
	if write.Code != http.StatusOK {
		t.Fatalf("write status=%d body=%s", write.Code, write.Body.String())
	}

	promote := performJSON(t, srv, http.MethodPost, "/v1/context/promote", map[string]any{
		"client_id":      "editor",
		"actor":          "user",
		"from_namespace": "app/editor/session",
		"from_key":       "summary",
		"to_namespace":   "user/notes",
		"to_key":         "daily",
	})
	if promote.Code != http.StatusOK {
		t.Fatalf("promote status=%d body=%s", promote.Code, promote.Body.String())
	}

	audit := performJSON(t, srv, http.MethodGet, "/v1/context/audit?limit=10", nil)
	if audit.Code != http.StatusOK {
		t.Fatalf("audit status=%d body=%s", audit.Code, audit.Body.String())
	}

	var payload struct {
		Items []struct {
			EventType string `json:"event_type"`
			Actor     string `json:"actor"`
			Namespace string `json:"namespace"`
			Key       string `json:"key"`
			Revision  int64  `json:"revision"`
		} `json:"items"`
	}
	if err := json.Unmarshal(audit.Body.Bytes(), &payload); err != nil {
		t.Fatalf("unmarshal audit: %v", err)
	}
	if len(payload.Items) < 2 {
		t.Fatalf("expected at least 2 audit events, got %d", len(payload.Items))
	}

	foundWrite := false
	foundPromote := false
	for _, item := range payload.Items {
		if item.EventType == "write" && item.Namespace == "app/editor/session" && item.Key == "summary" && item.Revision > 0 {
			foundWrite = true
		}
		if item.EventType == "promote" && item.Namespace == "user/notes" && item.Key == "daily" && item.Revision > 0 {
			foundPromote = true
		}
	}
	if !foundWrite || !foundPromote {
		t.Fatalf("expected write+promote audit events, got %+v", payload.Items)
	}
}

func performJSON(t *testing.T, h http.Handler, method, path string, body any) *httptest.ResponseRecorder {
	return performJSONWithHeaders(t, h, method, path, body, nil)
}

func performJSONWithHeaders(t *testing.T, h http.Handler, method, path string, body any, headers map[string]string) *httptest.ResponseRecorder {
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
	for k, v := range headers {
		req.Header.Set(k, v)
	}
	res := httptest.NewRecorder()
	h.ServeHTTP(res, req)
	return res
}
