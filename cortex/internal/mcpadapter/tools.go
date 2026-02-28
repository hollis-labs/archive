package mcpadapter

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/hollis-labs/volon-dev/internal/contextstore"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

func (a *Adapter) registerTools(s *server.MCPServer) {
	s.AddTool(mcp.NewTool("context_head",
		mcp.WithDescription("Read the current head (latest revision) of a record by namespace and key."),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Namespace path, e.g. user/memory/task-001")),
		mcp.WithString("key", mcp.Required(), mcp.Description("Record key")),
	), a.handleHead)

	s.AddTool(mcp.NewTool("context_history",
		mcp.WithDescription("Read the revision history for a namespace/key, newest first."),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Namespace path")),
		mcp.WithString("key", mcp.Required(), mcp.Description("Record key")),
		mcp.WithNumber("limit", mcp.Description("Max revisions to return (default 20, max 100)")),
	), a.handleHistory)

	s.AddTool(mcp.NewTool("context_view",
		mcp.WithDescription("Evaluate a view selector and return matching records."),
		mcp.WithString("namespaces", mcp.Description("Comma-separated namespace glob patterns, e.g. \"user/memory/*,app/test/session/*\"")),
		mcp.WithString("revision_scope", mcp.Description("head or all (default: head)")),
		mcp.WithNumber("limit", mcp.Description("Max records to return")),
	), a.handleView)

	s.AddTool(mcp.NewTool("context_packet",
		mcp.WithDescription("Retrieve a budget-bounded context packet with manifest. The primary agent continuity surface."),
		mcp.WithString("namespaces", mcp.Description("Comma-separated namespace glob patterns to include")),
		mcp.WithBoolean("include_pins", mcp.Description("Whether to prepend user/pins/* records (default true)")),
		mcp.WithNumber("max_items", mcp.Description("Item budget limit (default 50)")),
		mcp.WithNumber("max_tokens_estimate", mcp.Description("Token budget limit (default 8000)")),
		mcp.WithString("payload_mode", mcp.Description("full or head_only (default: full)")),
	), a.handlePacket)

	s.AddTool(mcp.NewTool("context_write",
		mcp.WithDescription("Write a record to a namespace. Requires 'write' scope in the configured capability token."),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Target namespace, e.g. app/test/session/task-001")),
		mcp.WithString("key", mcp.Required(), mcp.Description("Record key")),
		mcp.WithString("payload", mcp.Required(), mcp.Description("JSON payload as a string, e.g. '{\"status\":\"in_progress\"}'")),
		mcp.WithString("actor", mcp.Description("Actor identity, e.g. app:my-agent (default: mcp-agent)")),
		mcp.WithString("record_type", mcp.Description("Record type tag (default: state)")),
	), a.handleWrite)

	s.AddTool(mcp.NewTool("context_promote_request",
		mcp.WithDescription("Request promotion of a record from an app namespace to a user namespace. Requires 'promote.request' scope."),
		mcp.WithString("source_namespace", mcp.Required(), mcp.Description("Source namespace (must be in app/*)")),
		mcp.WithString("source_key", mcp.Required(), mcp.Description("Source record key")),
		mcp.WithString("target_namespace", mcp.Required(), mcp.Description("Target namespace (typically user/memory/*)")),
		mcp.WithString("target_key", mcp.Required(), mcp.Description("Target record key")),
		mcp.WithString("reason", mcp.Description("Human-readable reason for the promotion")),
		mcp.WithString("actor", mcp.Description("Actor identity (default: mcp-agent)")),
	), a.handlePromoteRequest)
}

// --- Read tools ---

func (a *Adapter) handleHead(_ context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	ctx := context.Background()
	ns := req.GetString("namespace", "")
	key := req.GetString("key", "")
	if ns == "" || key == "" {
		return toolError("validation_error", "namespace and key are required"), nil
	}
	rec, err := a.Store.Head(ctx, ns, key)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return toolError("not_found", fmt.Sprintf("no head record for %s/%s", ns, key)), nil
		}
		return toolError("internal_error", err.Error()), nil
	}
	return toolJSON(recordJSON(rec)), nil
}

func (a *Adapter) handleHistory(_ context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	ctx := context.Background()
	ns := req.GetString("namespace", "")
	key := req.GetString("key", "")
	if ns == "" || key == "" {
		return toolError("validation_error", "namespace and key are required"), nil
	}
	limit := req.GetInt("limit", 20)
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	records, err := a.Store.History(ctx, ns, key, limit)
	if err != nil {
		return toolError("internal_error", err.Error()), nil
	}
	items := make([]map[string]any, len(records))
	for i, rec := range records {
		items[i] = recordJSON(rec)
	}
	return toolJSON(map[string]any{"items": items, "count": len(items)}), nil
}

func (a *Adapter) handleView(_ context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	ctx := context.Background()
	nsStr := req.GetString("namespaces", "")
	var namespaces []string
	if nsStr != "" {
		for _, ns := range strings.Split(nsStr, ",") {
			if t := strings.TrimSpace(ns); t != "" {
				namespaces = append(namespaces, t)
			}
		}
	}
	revScope := req.GetString("revision_scope", "head")
	limit := req.GetInt("limit", 0)
	sel := contextstore.Selector{
		Namespaces:    namespaces,
		RevisionScope: revScope,
		Limit:         limit,
	}
	records, err := a.Store.Select(ctx, sel)
	if err != nil {
		return toolError("selector_error", err.Error()), nil
	}
	items := make([]map[string]any, len(records))
	for i, rec := range records {
		items[i] = recordJSON(rec)
	}
	return toolJSON(map[string]any{"items": items, "count": len(items), "truncated": false}), nil
}

// --- Packet tool ---

func (a *Adapter) handlePacket(_ context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	ctx := context.Background()

	nsStr := req.GetString("namespaces", "")
	var namespaces []string
	if nsStr != "" {
		for _, ns := range strings.Split(nsStr, ",") {
			if t := strings.TrimSpace(ns); t != "" {
				namespaces = append(namespaces, t)
			}
		}
	}

	includePins := req.GetBool("include_pins", true)
	maxItems := req.GetInt("max_items", 50)
	maxTokens := req.GetInt("max_tokens_estimate", 8000)
	payloadMode := req.GetString("payload_mode", "full")

	reqID := newMCPRequestID()
	var items []map[string]any
	pinsIncluded := 0
	bytesSoFar := 0
	tokensSoFar := 0
	itemsTotal := 0
	truncated := false
	truncationReason := ""
	sources := map[string]int{}

	budgetExceeded := func() bool {
		if maxItems > 0 && len(items) >= maxItems {
			truncationReason = "budget.max_items"
			return true
		}
		if maxTokens > 0 && tokensSoFar >= maxTokens {
			truncationReason = "budget.max_tokens_estimate"
			return true
		}
		return false
	}

	addRecord := func(rec contextstore.Record) bool {
		if budgetExceeded() {
			return false
		}
		payload := rec.Payload
		if payloadMode == "head_only" && len(payload) > 512 {
			payload = payload[:512]
		}
		item := recordJSON(rec)
		item["payload"] = json.RawMessage(payload)
		items = append(items, item)
		bytesSoFar += len(payload)
		tokensSoFar += contextstore.EstimateTokens(payload)
		parts := strings.SplitN(rec.Namespace, "/", 3)
		nsKey := rec.Namespace
		if len(parts) >= 2 {
			nsKey = parts[0] + "/" + parts[1]
		}
		sources[nsKey]++
		return true
	}

	// Prepend pins.
	if includePins {
		pins, err := a.Store.Select(ctx, contextstore.Selector{
			Namespaces:    []string{"user/pins/*"},
			RevisionScope: "head",
		})
		if err == nil {
			for _, rec := range pins {
				if addRecord(rec) {
					pinsIncluded++
				}
			}
		}
	}

	// Main selector.
	candidates, err := a.Store.Select(ctx, contextstore.Selector{
		Namespaces:    namespaces,
		RevisionScope: "head",
	})
	if err != nil {
		return toolError("selector_error", err.Error()), nil
	}

	itemsTotal = len(candidates)
	for _, rec := range candidates {
		if !addRecord(rec) {
			truncated = true
			break
		}
	}

	if items == nil {
		items = []map[string]any{}
	}

	manifest := map[string]any{
		"request_id":       reqID,
		"pins_included":    pinsIncluded,
		"items_total":      itemsTotal,
		"items_returned":   len(items) - pinsIncluded,
		"bytes_returned":   bytesSoFar,
		"tokens_estimate":  tokensSoFar,
		"truncated":        truncated,
		"truncation_reason": truncationReason,
		"sources":          sources,
	}

	return toolJSON(map[string]any{"items": items, "manifest": manifest}), nil
}

// --- Write tools ---

func (a *Adapter) handleWrite(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	errResult, _ := a.checkScope(ctx, "write")
	if errResult != nil {
		return errResult, nil
	}

	ns := req.GetString("namespace", "")
	key := req.GetString("key", "")
	payloadStr := req.GetString("payload", "")
	if ns == "" || key == "" || payloadStr == "" {
		return toolError("validation_error", "namespace, key, and payload are required"), nil
	}

	var payload json.RawMessage
	if err := json.Unmarshal([]byte(payloadStr), &payload); err != nil {
		return toolError("validation_error", "payload must be valid JSON: "+err.Error()), nil
	}

	actor := req.GetString("actor", "mcp-agent")

	rec, err := a.Store.AppendRecord(ctx, contextstore.AppendInput{
		Namespace: ns,
		Key:       key,
		Actor:     actor,
		Payload:   payload,
	})
	if err != nil {
		return toolError("write_failed", err.Error()), nil
	}

	_ = a.Store.RecordAuditEvent(ctx, contextstore.AuditEvent{
		EventType: "write",
		Actor:     actor,
		Namespace: ns,
		Key:       key,
		Revision:  rec.Revision,
		RecordID:  rec.RecordID,
		Metadata:  json.RawMessage(`{"source":"mcp"}`),
	})

	return toolJSON(map[string]any{
		"record_id": rec.RecordID,
		"revision":  rec.Revision,
		"namespace": rec.Namespace,
		"key":       rec.Key,
	}), nil
}

func (a *Adapter) handlePromoteRequest(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	errResult, _ := a.checkScope(ctx, "promote.request")
	if errResult != nil {
		return errResult, nil
	}

	srcNS := req.GetString("source_namespace", "")
	srcKey := req.GetString("source_key", "")
	tgtNS := req.GetString("target_namespace", "")
	tgtKey := req.GetString("target_key", "")
	reason := req.GetString("reason", "")
	actor := req.GetString("actor", "mcp-agent")

	if srcNS == "" || srcKey == "" || tgtNS == "" || tgtKey == "" {
		return toolError("validation_error", "source_namespace, source_key, target_namespace, and target_key are required"), nil
	}

	srcHead, err := a.Store.Head(ctx, srcNS, srcKey)
	if err != nil {
		return toolError("validation_error", fmt.Sprintf("source record not found: %v", err)), nil
	}

	requestID := "req-" + newMCPRequestID()[4:]
	now := time.Now().UTC().Format(time.RFC3339)

	pr := contextstore.PromoteRequest{
		Type:             "promote.request",
		RequestID:        requestID,
		SourceNamespace:  srcHead.Namespace,
		SourceKey:        srcHead.Key,
		SourceRevisionID: srcHead.RecordID,
		SourceChecksum:   srcHead.Checksum,
		TargetNamespace:  tgtNS,
		TargetKey:        tgtKey,
		Reason:           reason,
		Status:           "pending",
		RequestedAt:      now,
		RequestedBy:      actor,
	}
	payload, _ := json.Marshal(pr)

	namespace := "app/mcp-agent/promotions"
	_, err = a.Store.AppendRecord(ctx, contextstore.AppendInput{
		Namespace: namespace,
		Key:       requestID,
		Actor:     actor,
		Payload:   payload,
	})
	if err != nil {
		return toolError("promote_failed", err.Error()), nil
	}

	_ = a.Store.RecordAuditEvent(ctx, contextstore.AuditEvent{
		EventType: "promote.request",
		Actor:     actor,
		Namespace: srcNS,
		Key:       srcKey,
		RecordID:  srcHead.RecordID,
		Metadata:  json.RawMessage(fmt.Sprintf(`{"request_id":%q,"target_namespace":%q,"source":"mcp"}`, requestID, tgtNS)),
	})

	return toolJSON(map[string]any{
		"request_id": requestID,
		"status":     "pending",
	}), nil
}

// --- Helpers ---

func recordJSON(rec contextstore.Record) map[string]any {
	return map[string]any{
		"record_id":  rec.RecordID,
		"namespace":  rec.Namespace,
		"key":        rec.Key,
		"revision":   rec.Revision,
		"actor":      rec.Actor,
		"created_at": rec.CreatedAt,
		"checksum":   rec.Checksum,
	}
}

func newMCPRequestID() string {
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return "mcp-" + hex.EncodeToString(b)
}
