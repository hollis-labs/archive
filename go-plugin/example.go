package plugin

import (
	"context"
	"fmt"
)

// ExamplePlugin demonstrates a simple plugin implementation
type ExamplePlugin struct {
	id          string
	name        string
	version     string
	description string
	host        Host
	status      PluginStatus
}

// NewExamplePlugin creates a new example plugin
func NewExamplePlugin() *ExamplePlugin {
	return &ExamplePlugin{
		id:          "example-plugin",
		name:        "Example Plugin",
		version:     "1.0.0",
		description: "A simple example plugin demonstrating the interface",
	}
}

// ID returns the plugin's unique identifier
func (p *ExamplePlugin) ID() string {
	return p.id
}

// Name returns the plugin's human-readable name
func (p *ExamplePlugin) Name() string {
	return p.name
}

// Version returns the plugin version
func (p *ExamplePlugin) Version() string {
	return p.version
}

// Description returns the plugin description
func (p *ExamplePlugin) Description() string {
	return p.description
}

// Dependencies returns the plugin's dependencies
func (p *ExamplePlugin) Dependencies() []string {
	return []string{} // No dependencies for this example
}

// Load initializes the plugin
func (p *ExamplePlugin) Load(host Host) error {
	p.host = host
	logger := host.Logger()

	// Register a simple CRUD handler
	handler := &exampleCRUDHandler{logger: logger}
	if err := host.RegisterCRUDHandler("example-resource", handler); err != nil {
		return fmt.Errorf("failed to register CRUD handler: %w", err)
	}

	// Register an event hook
	hook := &exampleEventHook{logger: logger}
	if err := host.RegisterEventHook([]string{"example-event"}, hook); err != nil {
		return fmt.Errorf("failed to register event hook: %w", err)
	}

	// Register a UI component
	component := UIComponent{
		ID:          "example-widget",
		Type:        UIComponentTypeWidget,
		Name:        "Example Widget",
		Description: "A simple example widget",
		Props: map[string]interface{}{
			"title": "Hello from Example Plugin",
			"color": "blue",
		},
	}
	if err := host.RegisterUIComponent(component); err != nil {
		return fmt.Errorf("failed to register UI component: %w", err)
	}

	p.status.Loaded = true
	p.status.Enabled = true

	logger.Info("Example plugin loaded successfully")
	return nil
}

// Unload cleans up the plugin
func (p *ExamplePlugin) Unload() error {
	p.status.Loaded = false
	p.status.Enabled = false

	if p.host != nil {
		p.host.Logger().Info("Example plugin unloaded")
	}

	return nil
}

// Status returns the current plugin status
func (p *ExamplePlugin) Status() PluginStatus {
	return p.status
}

// exampleCRUDHandler implements a simple CRUD handler
type exampleCRUDHandler struct {
	logger Logger
	data   map[string]interface{}
}

func (h *exampleCRUDHandler) Create(ctx context.Context, resource interface{}) (interface{}, error) {
	h.logger.Debug("Creating resource", "resource", resource)
	// Implementation would go here
	return resource, nil
}

func (h *exampleCRUDHandler) Read(ctx context.Context, id string) (interface{}, error) {
	h.logger.Debug("Reading resource", "id", id)
	// Implementation would go here
	return nil, fmt.Errorf("not implemented")
}

func (h *exampleCRUDHandler) Update(ctx context.Context, id string, resource interface{}) (interface{}, error) {
	h.logger.Debug("Updating resource", "id", id, "resource", resource)
	// Implementation would go here
	return resource, nil
}

func (h *exampleCRUDHandler) Delete(ctx context.Context, id string) error {
	h.logger.Debug("Deleting resource", "id", id)
	// Implementation would go here
	return nil
}

func (h *exampleCRUDHandler) List(ctx context.Context, filters map[string]interface{}) ([]interface{}, error) {
	h.logger.Debug("Listing resources", "filters", filters)
	// Implementation would go here
	return []interface{}{}, nil
}

// exampleEventHook implements a simple event hook
type exampleEventHook struct {
	logger Logger
}

func (h *exampleEventHook) Handle(ctx context.Context, event Event) error {
	h.logger.Info("Handling event", "type", event.Type, "source", event.Source)
	// Implementation would go here
	return nil
}

func (h *exampleEventHook) EventTypes() []string {
	return []string{"example-event"}
}