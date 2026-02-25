package contextpolicy

import (
	"encoding/json"
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
)

// NamespaceOwner stores ownership metadata.
type NamespaceOwner struct {
	OwnerType string // user|app
	OwnerID   string
	Policy    map[string]any
}

// Engine manages namespace ownership and write authorization rules.
type Engine struct {
	mu     sync.RWMutex
	owners map[string]NamespaceOwner
}

// New returns an empty policy engine.
func New() *Engine {
	return &Engine{owners: map[string]NamespaceOwner{}}
}

// RegisterNamespace upserts owner metadata.
func (e *Engine) RegisterNamespace(namespace, ownerType, ownerID string, policy map[string]any) error {
	ns := strings.TrimSpace(namespace)
	if ns == "" {
		return errors.New("namespace required")
	}
	if ownerType != "user" && ownerType != "app" {
		return errors.New("owner_type must be user|app")
	}
	if strings.TrimSpace(ownerID) == "" {
		return errors.New("owner_id required")
	}

	e.mu.Lock()
	defer e.mu.Unlock()
	e.owners[ns] = NamespaceOwner{OwnerType: ownerType, OwnerID: ownerID, Policy: policy}
	return nil
}

// GetNamespace returns namespace metadata when registered.
func (e *Engine) GetNamespace(namespace string) (NamespaceOwner, bool) {
	ns := strings.TrimSpace(namespace)
	e.mu.RLock()
	defer e.mu.RUnlock()
	owner, ok := e.owners[ns]
	return owner, ok
}

// CanWrite enforces namespace write rules.
func (e *Engine) CanWrite(clientID, actor, namespace string) error {
	ns := strings.TrimSpace(namespace)
	if ns == "" {
		return errors.New("namespace required")
	}
	if strings.TrimSpace(actor) == "" {
		return errors.New("actor required")
	}

	if strings.HasPrefix(ns, "user/") {
		if actor != "user" {
			return fmt.Errorf("writes to protected namespace %q require actor=user", ns)
		}
		return nil
	}

	if strings.HasPrefix(ns, "app/") {
		parts := strings.Split(ns, "/")
		if len(parts) < 2 || parts[1] == "" {
			return fmt.Errorf("invalid app namespace %q", ns)
		}
		nsOwner := parts[1]
		if clientID != nsOwner || actor != "app:"+nsOwner {
			return fmt.Errorf("namespace %q writable only by app:%s", ns, nsOwner)
		}
	}

	e.mu.RLock()
	owner, ok := e.owners[ns]
	e.mu.RUnlock()
	if !ok {
		return nil
	}

	switch owner.OwnerType {
	case "user":
		if actor != "user" {
			return fmt.Errorf("namespace %q writable only by user", ns)
		}
	case "app":
		if actor != "app:"+owner.OwnerID || clientID != owner.OwnerID {
			return fmt.Errorf("namespace %q writable only by app:%s", ns, owner.OwnerID)
		}
	}
	return nil
}

// CanPromote checks promotion constraints into protected user namespace.
func (e *Engine) CanPromote(actor, toNamespace string) error {
	if actor != "user" {
		return errors.New("promote requires actor=user")
	}
	if !strings.HasPrefix(strings.TrimSpace(toNamespace), "user/") {
		return errors.New("promotion target must be in user/*")
	}
	return nil
}

// ValidatePayload enforces namespace schema policy when configured.
// Supported policy keys:
// - required_keys: [string]
func (e *Engine) ValidatePayload(namespace string, payload json.RawMessage) error {
	ns := strings.TrimSpace(namespace)
	if ns == "" {
		return errors.New("namespace required")
	}
	e.mu.RLock()
	owner, ok := e.owners[ns]
	e.mu.RUnlock()
	if !ok || owner.Policy == nil {
		return nil
	}

	required := requiredKeys(owner.Policy)
	if len(required) == 0 {
		return nil
	}
	var obj map[string]json.RawMessage
	if err := json.Unmarshal(payload, &obj); err != nil {
		return errors.New("schema validation failed: payload must be a JSON object")
	}
	var missing []string
	for _, key := range required {
		if _, ok := obj[key]; !ok {
			missing = append(missing, key)
		}
	}
	if len(missing) > 0 {
		sort.Strings(missing)
		return fmt.Errorf("schema validation failed: missing required keys: %s", strings.Join(missing, ", "))
	}
	return nil
}

func requiredKeys(policy map[string]any) []string {
	raw, ok := policy["required_keys"]
	if !ok {
		return nil
	}
	switch v := raw.(type) {
	case []string:
		return v
	case []any:
		out := make([]string, 0, len(v))
		for _, item := range v {
			s, ok := item.(string)
			if !ok {
				continue
			}
			s = strings.TrimSpace(s)
			if s == "" {
				continue
			}
			out = append(out, s)
		}
		return out
	default:
		return nil
	}
}
