package contextapi

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/hollis-labs/volon-dev/internal/contextpolicy"
	"github.com/hollis-labs/volon-dev/internal/contextstore"
)

// Server exposes HTTP handlers for the context API.
type Server struct {
	Store  *contextstore.Store
	Policy *contextpolicy.Engine
	// AuthToken enables bearer-token auth on mutating routes when non-empty.
	AuthToken string
	// ManagedAuth enables token lifecycle validation using store-backed auth_tokens.
	ManagedAuth bool
}

// NewServer creates an API server.
func NewServer(store *contextstore.Store, policy *contextpolicy.Engine) *Server {
	if policy == nil {
		policy = contextpolicy.New()
	}
	return &Server{Store: store, Policy: policy}
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == http.MethodPost && r.URL.Path == "/v1/namespaces/register":
		if !s.authorizeMutatingRequest(w, r) {
			return
		}
		s.handleNamespaceRegister(w, r)
	case r.Method == http.MethodGet && r.URL.Path == "/v1/namespaces/get":
		s.handleNamespaceGet(w, r)
	case r.Method == http.MethodPost && r.URL.Path == "/v1/context/write":
		if !s.authorizeMutatingRequest(w, r) {
			return
		}
		s.handleWrite(w, r)
	case r.Method == http.MethodPost && r.URL.Path == "/v1/context/promote":
		if !s.authorizeMutatingRequest(w, r) {
			return
		}
		s.handlePromote(w, r)
	case r.Method == http.MethodGet && r.URL.Path == "/v1/context/head":
		s.handleHead(w, r)
	case r.Method == http.MethodGet && r.URL.Path == "/v1/context/history":
		s.handleHistory(w, r)
	case r.Method == http.MethodGet && r.URL.Path == "/v1/health/readiness":
		s.handleReadiness(w, r)
	case r.Method == http.MethodGet && r.URL.Path == "/v1/context/audit":
		s.handleAudit(w, r)
	case r.Method == http.MethodPost && r.URL.Path == "/v1/views/evaluate":
		s.handleView(w, r)
	case r.Method == http.MethodGet && r.URL.Path == "/v1/context/consistency/scan":
		s.handleConsistencyScan(w, r)
	case r.Method == http.MethodPost && r.URL.Path == "/v1/context/consistency/repair":
		if !s.authorizeMutatingRequest(w, r) {
			return
		}
		s.handleConsistencyRepair(w, r)
	default:
		writeError(w, http.StatusNotFound, "not_found", "endpoint not found", nil)
	}
}

func (s *Server) authorizeMutatingRequest(w http.ResponseWriter, r *http.Request) bool {
	if s.ManagedAuth {
		authHeader := strings.TrimSpace(r.Header.Get("Authorization"))
		if !strings.HasPrefix(authHeader, "Bearer ") {
			writeError(w, http.StatusUnauthorized, "auth_required", "missing or invalid bearer token", nil)
			return false
		}
		token := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
		if token == "" {
			writeError(w, http.StatusUnauthorized, "auth_required", "missing or invalid bearer token", nil)
			return false
		}
		err := s.Store.ValidateAuthToken(r.Context(), token)
		if err == nil {
			return true
		}
		switch {
		case errors.Is(err, contextstore.ErrAuthTokenInvalid),
			errors.Is(err, contextstore.ErrAuthTokenRevoked),
			errors.Is(err, contextstore.ErrAuthTokenExpired):
			writeError(w, http.StatusUnauthorized, "auth_required", "missing or invalid bearer token", map[string]any{
				"reason": err.Error(),
			})
			return false
		default:
			writeError(w, http.StatusInternalServerError, "auth_failed", err.Error(), nil)
			return false
		}
	}

	if strings.TrimSpace(s.AuthToken) == "" {
		return true
	}
	authHeader := strings.TrimSpace(r.Header.Get("Authorization"))
	if !strings.HasPrefix(authHeader, "Bearer ") {
		writeError(w, http.StatusUnauthorized, "auth_required", "missing or invalid bearer token", nil)
		return false
	}
	token := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
	if token == "" || token != s.AuthToken {
		writeError(w, http.StatusUnauthorized, "auth_required", "missing or invalid bearer token", nil)
		return false
	}
	return true
}

type issueTokenRequest struct {
	Label string `json:"label"`
	TTL   string `json:"ttl"`
}

func (s *Server) handleIssueToken(w http.ResponseWriter, r *http.Request) {
	var req issueTokenRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid_request", err.Error(), nil)
		return
	}
	var ttl time.Duration
	if strings.TrimSpace(req.TTL) != "" {
		parsed, err := time.ParseDuration(req.TTL)
		if err != nil {
			writeError(w, http.StatusBadRequest, "validation_error", "ttl must be a valid duration", nil)
			return
		}
		ttl = parsed
	}
	token, meta, err := s.Store.IssueAuthToken(r.Context(), req.Label, ttl)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "auth_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"token": token,
		"meta":  meta,
	})
}

type namespaceRegisterRequest struct {
	Namespace string         `json:"namespace"`
	OwnerType string         `json:"owner_type"`
	OwnerID   string         `json:"owner_id"`
	Policy    map[string]any `json:"policy"`
}

func (s *Server) handleNamespaceRegister(w http.ResponseWriter, r *http.Request) {
	var req namespaceRegisterRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid_request", err.Error(), nil)
		return
	}
	if err := s.Policy.RegisterNamespace(req.Namespace, req.OwnerType, req.OwnerID, req.Policy); err != nil {
		writeError(w, http.StatusBadRequest, "validation_error", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"namespace":  req.Namespace,
		"owner_type": req.OwnerType,
		"owner_id":   req.OwnerID,
		"policy":     req.Policy,
	})
}

func (s *Server) handleNamespaceGet(w http.ResponseWriter, r *http.Request) {
	namespace := strings.TrimSpace(r.URL.Query().Get("namespace"))
	if namespace == "" {
		writeError(w, http.StatusBadRequest, "validation_error", "namespace is required", nil)
		return
	}
	owner, ok := s.Policy.GetNamespace(namespace)
	if !ok {
		writeError(w, http.StatusNotFound, "not_found", "namespace not registered", nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"namespace":  namespace,
		"owner_type": owner.OwnerType,
		"owner_id":   owner.OwnerID,
		"policy":     owner.Policy,
	})
}

type writeRequest struct {
	ClientID  string          `json:"client_id"`
	Actor     string          `json:"actor"`
	Namespace string          `json:"namespace"`
	Key       string          `json:"key"`
	Payload   json.RawMessage `json:"payload"`
	Reason    string          `json:"reason"`
}

func (s *Server) handleWrite(w http.ResponseWriter, r *http.Request) {
	var req writeRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid_request", err.Error(), nil)
		return
	}
	if err := s.Policy.CanWrite(req.ClientID, req.Actor, req.Namespace); err != nil {
		writeError(w, http.StatusForbidden, "policy_denied", err.Error(), nil)
		return
	}
	if err := s.Policy.ValidatePayload(req.Namespace, req.Payload); err != nil {
		writeError(w, http.StatusBadRequest, "validation_error", err.Error(), nil)
		return
	}
	rec, err := s.Store.AppendRecord(r.Context(), contextstore.AppendInput{
		Namespace: req.Namespace,
		Key:       req.Key,
		Actor:     req.Actor,
		Payload:   req.Payload,
	})
	if err != nil {
		writeError(w, http.StatusBadRequest, "write_failed", err.Error(), nil)
		return
	}
	_ = s.Store.RecordAuditEvent(r.Context(), contextstore.AuditEvent{
		EventType: "write",
		Actor:     req.Actor,
		Namespace: req.Namespace,
		Key:       req.Key,
		Revision:  rec.Revision,
		RecordID:  rec.RecordID,
		Metadata:  json.RawMessage(`{"source":"http","reason":` + quoteJSON(req.Reason) + `}`),
	})
	writeJSON(w, http.StatusOK, map[string]any{
		"record_id":     rec.RecordID,
		"revision":      rec.Revision,
		"head_revision": rec.Revision,
		"timestamp":     rec.CreatedAt,
	})
}

type promoteRequest struct {
	ClientID       string `json:"client_id"`
	Actor          string `json:"actor"`
	FromNamespace  string `json:"from_namespace"`
	FromKey        string `json:"from_key"`
	ToNamespace    string `json:"to_namespace"`
	ToKey          string `json:"to_key"`
	SourceRevision *int64 `json:"source_revision,omitempty"`
}

func (s *Server) handlePromote(w http.ResponseWriter, r *http.Request) {
	var req promoteRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid_request", err.Error(), nil)
		return
	}
	if err := s.Policy.CanPromote(req.Actor, req.ToNamespace); err != nil {
		writeError(w, http.StatusForbidden, "policy_denied", err.Error(), nil)
		return
	}

	src, err := s.Store.Head(r.Context(), req.FromNamespace, req.FromKey)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			writeError(w, http.StatusNotFound, "not_found", "source head not found", nil)
			return
		}
		writeError(w, http.StatusBadRequest, "read_failed", err.Error(), nil)
		return
	}
	if req.SourceRevision != nil && src.Revision != *req.SourceRevision {
		writeError(w, http.StatusConflict, "revision_mismatch", "source revision does not match", nil)
		return
	}

	if err := s.Policy.CanWrite(req.ClientID, req.Actor, req.ToNamespace); err != nil {
		writeError(w, http.StatusForbidden, "policy_denied", err.Error(), nil)
		return
	}
	if err := s.Policy.ValidatePayload(req.ToNamespace, src.Payload); err != nil {
		writeError(w, http.StatusBadRequest, "validation_error", err.Error(), nil)
		return
	}
	out, err := s.Store.AppendRecord(r.Context(), contextstore.AppendInput{
		Namespace: req.ToNamespace,
		Key:       req.ToKey,
		Actor:     req.Actor,
		Payload:   src.Payload,
	})
	if err != nil {
		writeError(w, http.StatusBadRequest, "promote_failed", err.Error(), nil)
		return
	}
	_ = s.Store.RecordAuditEvent(r.Context(), contextstore.AuditEvent{
		EventType: "promote",
		Actor:     req.Actor,
		Namespace: req.ToNamespace,
		Key:       req.ToKey,
		Revision:  out.Revision,
		RecordID:  out.RecordID,
		Metadata:  json.RawMessage(`{"source":"http","from_namespace":` + quoteJSON(req.FromNamespace) + `,"from_key":` + quoteJSON(req.FromKey) + `}`),
	})
	writeJSON(w, http.StatusOK, map[string]any{
		"promoted_record_id": out.RecordID,
		"target_revision":    out.Revision,
	})
}

func (s *Server) handleHead(w http.ResponseWriter, r *http.Request) {
	namespace := strings.TrimSpace(r.URL.Query().Get("namespace"))
	key := strings.TrimSpace(r.URL.Query().Get("key"))
	if namespace == "" || key == "" {
		writeError(w, http.StatusBadRequest, "validation_error", "namespace and key are required", nil)
		return
	}

	rec, err := s.Store.Head(r.Context(), namespace, key)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			writeError(w, http.StatusNotFound, "not_found", "head not found", nil)
			return
		}
		writeError(w, http.StatusInternalServerError, "read_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"record": rec})
}

func (s *Server) handleHistory(w http.ResponseWriter, r *http.Request) {
	namespace := strings.TrimSpace(r.URL.Query().Get("namespace"))
	key := strings.TrimSpace(r.URL.Query().Get("key"))
	if namespace == "" || key == "" {
		writeError(w, http.StatusBadRequest, "validation_error", "namespace and key are required", nil)
		return
	}
	limit := 0
	if raw := strings.TrimSpace(r.URL.Query().Get("limit")); raw != "" {
		n, err := strconv.Atoi(raw)
		if err != nil || n < 0 {
			writeError(w, http.StatusBadRequest, "validation_error", "limit must be a non-negative integer", nil)
			return
		}
		limit = n
	}

	items, err := s.Store.History(r.Context(), namespace, key, limit)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "read_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"items": items, "next_cursor": nil})
}

func (s *Server) handleAudit(w http.ResponseWriter, r *http.Request) {
	limit := 50
	if raw := strings.TrimSpace(r.URL.Query().Get("limit")); raw != "" {
		n, err := strconv.Atoi(raw)
		if err != nil || n < 0 {
			writeError(w, http.StatusBadRequest, "validation_error", "limit must be a non-negative integer", nil)
			return
		}
		limit = n
	}
	events, err := s.Store.ListAuditEvents(r.Context(), limit)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "read_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"items": events,
		"count": len(events),
	})
}

func (s *Server) handleReadiness(w http.ResponseWriter, r *http.Request) {
	report, err := s.Store.Readiness(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "readiness_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, report)
}

type viewRequest struct {
	Selector       contextstore.Selector `json:"selector"`
	IncludePayload bool                  `json:"include_payload"`
	Limit          int                   `json:"limit"`
}

func (s *Server) handleView(w http.ResponseWriter, r *http.Request) {
	var req viewRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid_request", err.Error(), nil)
		return
	}
	if req.Limit > 0 {
		req.Selector.Limit = req.Limit
	}
	if req.Selector.Limit == 0 {
		req.Selector.Limit = contextstore.DefaultSelectLimit
	}
	if len(req.Selector.Order) == 0 {
		req.Selector.Order = []string{"namespace", "key", "revision"}
	}

	items, err := s.Store.Select(r.Context(), req.Selector)
	if err != nil {
		writeError(w, http.StatusBadRequest, "validation_error", err.Error(), nil)
		return
	}
	if !req.IncludePayload {
		for i := range items {
			items[i].Payload = nil
		}
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"items": items,
		"evaluation_meta": map[string]any{
			"sort_keys":        req.Selector.Order,
			"matched_count":    len(items),
			"truncated":        len(items) >= req.Selector.Limit,
			"normalized_scope": normalizedScope(req.Selector.RevisionScope),
		},
	})
}

func (s *Server) handleConsistencyScan(w http.ResponseWriter, r *http.Request) {
	issues, err := s.Store.ScanConsistency(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "scan_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"issues": issues,
		"count":  len(issues),
	})
}

func (s *Server) handleConsistencyRepair(w http.ResponseWriter, r *http.Request) {
	rebuilt, err := s.Store.RebuildHeads(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "repair_failed", err.Error(), nil)
		return
	}
	issues, err := s.Store.ScanConsistency(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "scan_failed", err.Error(), nil)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"rebuilt_heads":    rebuilt,
		"remaining_issues": len(issues),
		"issues":           issues,
	})
}

func decodeJSON(r *http.Request, dst any) error {
	defer r.Body.Close()
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(dst); err != nil {
		return err
	}
	return nil
}

func writeJSON(w http.ResponseWriter, code int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(value)
}

func writeError(w http.ResponseWriter, status int, code, message string, details map[string]any) {
	writeJSON(w, status, map[string]any{
		"code":    code,
		"message": message,
		"details": details,
	})
}

func normalizedScope(scope string) string {
	if strings.EqualFold(strings.TrimSpace(scope), "all") {
		return "all"
	}
	return "head"
}

func quoteJSON(s string) string {
	b, _ := json.Marshal(s)
	return string(b)
}

// Write is used by tests needing isolated request context timeouts.
func (s *Server) Write(ctx context.Context, in writeRequest) (contextstore.Record, error) {
	if err := s.Policy.CanWrite(in.ClientID, in.Actor, in.Namespace); err != nil {
		return contextstore.Record{}, err
	}
	return s.Store.AppendRecord(ctx, contextstore.AppendInput{
		Namespace: in.Namespace,
		Key:       in.Key,
		Actor:     in.Actor,
		Payload:   in.Payload,
	})
}
