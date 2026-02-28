package mcpadapter

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/hollis-labs/volon-dev/internal/contextstore"
	"github.com/mark3labs/mcp-go/mcp"
)

// newTestStore opens a temp-dir store for testing.
func newTestStore(t *testing.T) *contextstore.Store {
	t.Helper()
	root := t.TempDir()
	s, err := contextstore.Open(context.Background(), contextstore.Config{RootDir: root})
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = s.Close() })
	return s
}

// toolResult decodes a tool result into a map for assertions.
func parseResult(t *testing.T, res *mcp.CallToolResult) map[string]any {
	t.Helper()
	if res == nil || len(res.Content) == 0 {
		t.Fatal("empty tool result")
	}
	textContent, ok := res.Content[0].(mcp.TextContent)
	if !ok {
		t.Fatalf("expected TextContent, got %T", res.Content[0])
	}
	var m map[string]any
	if err := json.Unmarshal([]byte(textContent.Text), &m); err != nil {
		t.Fatalf("unmarshal result %q: %v", textContent.Text, err)
	}
	return m
}

// writeRecord is a test helper that writes a record directly to the store.
func writeRecord(t *testing.T, s *contextstore.Store, ns, key, payload string) contextstore.Record {
	t.Helper()
	rec, err := s.AppendRecord(context.Background(), contextstore.AppendInput{
		Namespace: ns,
		Key:       key,
		Actor:     "test",
		Payload:   json.RawMessage(payload),
	})
	if err != nil {
		t.Fatalf("write %s/%s: %v", ns, key, err)
	}
	return rec
}

// --- TASK-020: Foundation ---

func TestAdapterNew(t *testing.T) {
	s := newTestStore(t)
	a := New(s, "")
	if a.Store != s {
		t.Error("store not set")
	}
	if a.Token != "" {
		t.Error("token should be empty")
	}
}

// --- TASK-021: Read tools ---

func TestContextHead_Found(t *testing.T) {
	s := newTestStore(t)
	writeRecord(t, s, "user/memory/task-001", "state", `{"phase":"start"}`)

	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"namespace": "user/memory/task-001", "key": "state"}

	res, err := a.handleHead(context.Background(), req)
	if err != nil {
		t.Fatalf("handleHead: %v", err)
	}
	body := parseResult(t, res)
	if body["namespace"] != "user/memory/task-001" {
		t.Errorf("namespace = %v", body["namespace"])
	}
	if body["key"] != "state" {
		t.Errorf("key = %v", body["key"])
	}
	if body["record_id"] == "" {
		t.Error("record_id should be set")
	}
}

func TestContextHead_NotFound(t *testing.T) {
	s := newTestStore(t)
	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"namespace": "user/memory/nope", "key": "missing"}

	res, err := a.handleHead(context.Background(), req)
	if err != nil {
		t.Fatalf("handleHead: %v", err)
	}
	body := parseResult(t, res)
	if body["code"] != "not_found" {
		t.Errorf("expected not_found, got %v", body["code"])
	}
}

func TestContextHead_MissingArgs(t *testing.T) {
	a := New(newTestStore(t), "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"namespace": "user/memory/task-001"} // missing key
	res, _ := a.handleHead(context.Background(), req)
	body := parseResult(t, res)
	if body["code"] != "validation_error" {
		t.Errorf("expected validation_error, got %v", body["code"])
	}
}

func TestContextHistory(t *testing.T) {
	s := newTestStore(t)
	for i := 0; i < 3; i++ {
		writeRecord(t, s, "user/memory/task-001", "state", `{"rev":`+string(rune('0'+i))+`}`)
	}

	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"namespace": "user/memory/task-001", "key": "state", "limit": float64(10)}

	res, err := a.handleHistory(context.Background(), req)
	if err != nil {
		t.Fatalf("handleHistory: %v", err)
	}
	body := parseResult(t, res)
	count, _ := body["count"].(float64)
	if int(count) != 3 {
		t.Errorf("expected 3 records, got %v", body["count"])
	}
}

func TestContextView(t *testing.T) {
	s := newTestStore(t)
	writeRecord(t, s, "user/memory/task-001", "state", `{"v":1}`)
	writeRecord(t, s, "user/memory/task-002", "state", `{"v":2}`)
	writeRecord(t, s, "app/test/session", "state", `{"v":3}`)

	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespaces":     "user/memory/*",
		"revision_scope": "head",
	}

	res, err := a.handleView(context.Background(), req)
	if err != nil {
		t.Fatalf("handleView: %v", err)
	}
	body := parseResult(t, res)
	count, _ := body["count"].(float64)
	if int(count) != 2 {
		t.Errorf("expected 2 records, got %v", body["count"])
	}
}

// --- TASK-021: context_packet ---

func TestContextPacket_WithPins(t *testing.T) {
	s := newTestStore(t)
	writeRecord(t, s, "user/pins/project", "context", `{"project":"test"}`)
	writeRecord(t, s, "app/test/session/task-001", "state", `{"status":"active"}`)

	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespaces":   "app/test/session/task-001",
		"include_pins": true,
		"max_items":    float64(50),
	}

	res, err := a.handlePacket(context.Background(), req)
	if err != nil {
		t.Fatalf("handlePacket: %v", err)
	}
	body := parseResult(t, res)
	manifest := body["manifest"].(map[string]any)
	pins, _ := manifest["pins_included"].(float64)
	if int(pins) != 1 {
		t.Errorf("expected 1 pin, got %v", manifest["pins_included"])
	}
	items := body["items"].([]any)
	if len(items) != 2 {
		t.Errorf("expected 2 items (1 pin + 1 record), got %d", len(items))
	}
}

func TestContextPacket_EmptyResult(t *testing.T) {
	s := newTestStore(t)
	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespaces":   "user/memory/*",
		"include_pins": false,
	}
	res, err := a.handlePacket(context.Background(), req)
	if err != nil {
		t.Fatalf("handlePacket: %v", err)
	}
	body := parseResult(t, res)
	items := body["items"].([]any)
	if len(items) != 0 {
		t.Errorf("expected 0 items, got %d", len(items))
	}
}

// --- TASK-022: Write tools ---

func TestContextWrite_NoToken(t *testing.T) {
	s := newTestStore(t)
	a := New(s, "") // no token
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespace": "app/test/session/task-001",
		"key":       "state",
		"payload":   `{"phase":"start"}`,
	}
	res, err := a.handleWrite(context.Background(), req)
	if err != nil {
		t.Fatalf("handleWrite: %v", err)
	}
	body := parseResult(t, res)
	if body["code"] != "auth_required" {
		t.Errorf("expected auth_required, got %v", body["code"])
	}
}

func TestContextWrite_InsufficientScope(t *testing.T) {
	s := newTestStore(t)
	// Issue a token with only "packet" scope (not "write").
	tok, _, err := s.CreateAuthToken(context.Background(), contextstore.TokenCreateInput{
		Label:  "read-only",
		Scopes: []string{"packet"},
	})
	if err != nil {
		t.Fatalf("create token: %v", err)
	}

	a := New(s, tok)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespace": "app/test/session/task-001",
		"key":       "state",
		"payload":   `{"phase":"start"}`,
	}
	res, _ := a.handleWrite(context.Background(), req)
	body := parseResult(t, res)
	if body["code"] != "insufficient_scope" {
		t.Errorf("expected insufficient_scope, got %v", body["code"])
	}
}

func TestContextWrite_Success(t *testing.T) {
	s := newTestStore(t)
	tok, _, err := s.CreateAuthToken(context.Background(), contextstore.TokenCreateInput{
		Label:  "agent",
		Scopes: []string{"write"},
	})
	if err != nil {
		t.Fatalf("create token: %v", err)
	}

	a := New(s, tok)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespace": "app/test/session/task-001",
		"key":       "state",
		"payload":   `{"phase":"start","status":"active"}`,
		"actor":     "app:my-agent",
	}
	res, err := a.handleWrite(context.Background(), req)
	if err != nil {
		t.Fatalf("handleWrite: %v", err)
	}
	body := parseResult(t, res)
	if body["record_id"] == nil || body["record_id"] == "" {
		t.Errorf("expected record_id in response, got %v", body)
	}
	if body["revision"] == nil {
		t.Error("expected revision in response")
	}
	// Verify the record was actually written.
	rec, err := s.Head(context.Background(), "app/test/session/task-001", "state")
	if err != nil {
		t.Fatalf("head after write: %v", err)
	}
	if rec.Actor != "app:my-agent" {
		t.Errorf("actor = %v", rec.Actor)
	}
}

func TestContextWrite_InvalidPayload(t *testing.T) {
	s := newTestStore(t)
	tok, _, err := s.CreateAuthToken(context.Background(), contextstore.TokenCreateInput{
		Label:  "agent",
		Scopes: []string{"write"},
	})
	if err != nil {
		t.Fatalf("create token: %v", err)
	}

	a := New(s, tok)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"namespace": "app/test/session/task-001",
		"key":       "state",
		"payload":   "not json",
	}
	res, _ := a.handleWrite(context.Background(), req)
	body := parseResult(t, res)
	if body["code"] != "validation_error" {
		t.Errorf("expected validation_error, got %v", body["code"])
	}
}

func TestContextPromoteRequest_Success(t *testing.T) {
	s := newTestStore(t)
	tok, _, err := s.CreateAuthToken(context.Background(), contextstore.TokenCreateInput{
		Label:  "agent",
		Scopes: []string{"write", "promote.request"},
	})
	if err != nil {
		t.Fatalf("create token: %v", err)
	}

	// Write source record.
	writeRecord(t, s, "app/test/draft", "user-preference", `{"preference":"verbose output"}`)

	a := New(s, tok)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"source_namespace": "app/test/draft",
		"source_key":       "user-preference",
		"target_namespace": "user/memory/preferences",
		"target_key":       "test-preference",
		"reason":           "high confidence preference",
		"actor":            "app:my-agent",
	}
	res, err := a.handlePromoteRequest(context.Background(), req)
	if err != nil {
		t.Fatalf("handlePromoteRequest: %v", err)
	}
	body := parseResult(t, res)
	if body["request_id"] == nil || body["request_id"] == "" {
		t.Errorf("expected request_id, got %v", body)
	}
	if body["status"] != "pending" {
		t.Errorf("expected status=pending, got %v", body["status"])
	}
}

func TestContextPromoteRequest_NoToken(t *testing.T) {
	s := newTestStore(t)
	a := New(s, "")
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"source_namespace": "app/test/draft",
		"source_key":       "pref",
		"target_namespace": "user/memory/prefs",
		"target_key":       "pref",
	}
	res, _ := a.handlePromoteRequest(context.Background(), req)
	body := parseResult(t, res)
	if body["code"] != "auth_required" {
		t.Errorf("expected auth_required, got %v", body["code"])
	}
}
