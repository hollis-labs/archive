package contextpolicy

import (
	"encoding/json"
	"testing"
)

func TestRegisterGetAndValidatePayload(t *testing.T) {
	e := New()
	if err := e.RegisterNamespace("app/editor/session", "app", "editor", map[string]any{
		"required_keys": []any{"title", "summary"},
	}); err != nil {
		t.Fatalf("register: %v", err)
	}

	owner, ok := e.GetNamespace("app/editor/session")
	if !ok {
		t.Fatalf("expected namespace owner")
	}
	if owner.OwnerID != "editor" {
		t.Fatalf("unexpected owner: %+v", owner)
	}

	if err := e.ValidatePayload("app/editor/session", json.RawMessage(`{"title":"x","summary":"y"}`)); err != nil {
		t.Fatalf("expected valid payload, got %v", err)
	}
	if err := e.ValidatePayload("app/editor/session", json.RawMessage(`{"title":"x"}`)); err == nil {
		t.Fatalf("expected schema validation error")
	}
}
