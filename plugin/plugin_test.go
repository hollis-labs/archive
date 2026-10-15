package plugin

import (
	"context"
	"testing"
)

// TestPluginInterface ensures the example plugin implements the Plugin interface
func TestPluginInterface(t *testing.T) {
	plugin := NewExamplePlugin()

	// Test basic plugin methods
	if plugin.ID() == "" {
		t.Error("Plugin ID should not be empty")
	}

	if plugin.Name() == "" {
		t.Error("Plugin name should not be empty")
	}

	if plugin.Version() == "" {
		t.Error("Plugin version should not be empty")
	}

	if plugin.Description() == "" {
		t.Error("Plugin description should not be empty")
	}

	// Test plugin loading/unloading
	logger := NewDefaultLogger("test")
	registry := NewRegistry(logger)

	if err := registry.LoadPlugin(plugin); err != nil {
		t.Fatalf("Failed to load plugin: %v", err)
	}

	// Verify plugin is loaded
	if loadedPlugin, exists := registry.GetPlugin(plugin.ID()); !exists {
		t.Error("Plugin should be loaded in registry")
	} else if loadedPlugin.ID() != plugin.ID() {
		t.Error("Loaded plugin ID mismatch")
	}

	// Test plugin status
	status := plugin.Status()
	if !status.Loaded {
		t.Error("Plugin status should show as loaded")
	}

	// Test plugin unloading
	if err := registry.UnloadPlugin(plugin.ID()); err != nil {
		t.Fatalf("Failed to unload plugin: %v", err)
	}
}

// TestUIRegistry tests the UI registry functionality
func TestUIRegistry(t *testing.T) {
	registry := NewUIRegistry()

	component := UIComponent{
		ID:          "test-widget",
		Type:        UIComponentTypeWidget,
		Name:        "Test Widget",
		Description: "A test widget",
	}

	// Test component registration
	if err := registry.RegisterComponent(component); err != nil {
		t.Fatalf("Failed to register component: %v", err)
	}

	// Test component retrieval
	if retrieved, exists := registry.GetComponent(component.ID); !exists {
		t.Error("Component should be retrievable after registration")
	} else if retrieved.Name != component.Name {
		t.Error("Retrieved component name mismatch")
	}

	// Test component listing
	components := registry.ListComponents()
	if len(components) != 1 {
		t.Errorf("Expected 1 component, got %d", len(components))
	}

	// Test component unregistration
	if err := registry.UnregisterComponent(component.ID); err != nil {
		t.Fatalf("Failed to unregister component: %v", err)
	}

	if _, exists := registry.GetComponent(component.ID); exists {
		t.Error("Component should not exist after unregistration")
	}
}

// TestEventSystem tests the event hook system
func TestEventSystem(t *testing.T) {
	logger := NewDefaultLogger("test")
	registry := NewRegistry(logger)

	// Create a test event hook
	hook := &testEventHook{handled: make(map[string]bool)}

	// Register the hook
	if err := registry.RegisterEventHook([]string{"test-event"}, hook); err != nil {
		t.Fatalf("Failed to register event hook: %v", err)
	}

	// Emit an event
	event := Event{
		Type:   "test-event",
		Source: "test",
		Data:   map[string]interface{}{"key": "value"},
	}

	if err := registry.EmitEvent(event); err != nil {
		t.Fatalf("Failed to emit event: %v", err)
	}

	// Verify the hook handled the event
	if !hook.handled["test-event"] {
		t.Error("Event hook should have handled the test event")
	}
}

// testEventHook is a simple test implementation of EventHook
type testEventHook struct {
	handled map[string]bool
}

func (h *testEventHook) Handle(ctx context.Context, event Event) error {
	h.handled[event.Type] = true
	return nil
}

func (h *testEventHook) EventTypes() []string {
	return []string{"test-event"}
}