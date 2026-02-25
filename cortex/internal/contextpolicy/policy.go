package contextpolicy

import (
	"errors"
	"fmt"
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
