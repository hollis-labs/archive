// Package plugin defines the universal plugin contract for Hollis Labs applications.
//
// RULE: This package contains ONLY generic interfaces and structs.
// App-specific types (UI slots, slash commands, keybindings, etc.) belong
// in the consuming application's internal/plugin/ package.
// If you need to add a type here, ask: "Would every app need this?"
// If not, it goes in the app.
package plugin

import (
	"context"
	"errors"
	"net/http"
	"time"
)

// Plugin represents a loadable plugin for the Fragments Engine platform.
// Plugins extend core functionality without modifying core code.
type Plugin interface {
	// ID returns a unique identifier for this plugin
	ID() string

	// Name returns the human-readable name of the plugin
	Name() string

	// Version returns the plugin version
	Version() string

	// Description returns a brief description of the plugin's purpose
	Description() string

	// Dependencies returns a list of required plugins or services this plugin depends on
	Dependencies() []string

	// Load is called when the plugin is loaded into the host
	Load(host Host) error

	// Unload is called when the plugin is being removed
	Unload() error

	// Status returns the current status of the plugin
	Status() PluginStatus
}

// PluginStatus represents the current state of a plugin
type PluginStatus struct {
	Loaded    bool      `json:"loaded"`
	Enabled   bool      `json:"enabled"`
	LoadedAt  time.Time `json:"loaded_at"`
	LastError string    `json:"last_error,omitempty"`
}

// Host provides the runtime environment and services for plugins
type Host interface {
	// GetPlugin retrieves another loaded plugin by ID
	GetPlugin(id string) (Plugin, bool)

	// RegisterCRUDHandler registers a CRUD handler for a resource type
	RegisterCRUDHandler(resourceType string, handler CRUDHandler) error

	// RegisterEventHook registers an event hook for specific event types
	RegisterEventHook(eventTypes []string, hook EventHook) error

	// RegisterUIComponent registers UI components for the frontend
	RegisterUIComponent(component UIComponent) error

	// GetService provides access to core services (MCP clients, databases, etc.)
	GetService(name string) (interface{}, error)

	// GetConfig returns a plugin configuration value.
	// Resolution order: env var → DB setting → config file → default.
	// Returns error if key is required and not found.
	GetConfig(key string) (string, error)

	// SetConfig persists a configuration value for the calling plugin.
	SetConfig(key string, value string) error

	// RegisterConfigSchema registers the config field definitions for the calling plugin.
	// The frontend reads this schema to render settings forms automatically.
	RegisterConfigSchema(fields []ConfigFieldDef) error

	// RegisterConnector registers a named connector (e.g., webhook, email sender).
	// Connectors implement a Send(ctx, payload) pattern for outbound integrations.
	RegisterConnector(name string, connector Connector) error

	// RegisterProvider registers a runtime LLM provider.
	// This is the preferred way for plugins to add third-party providers.
	RegisterProvider(name string, provider interface{}) error

	// RegisterCLIAdapter registers a runtime CLI adapter for PTY/subprocess bridges.
	RegisterCLIAdapter(name string, adapter interface{}) error

	// Logger provides a logger instance for the plugin
	Logger() Logger

	// Context returns the plugin's execution context
	Context() context.Context
}

// CRUDHandler defines CRUD operations for plugin-provided resources
type CRUDHandler interface {
	// Create creates a new resource
	Create(ctx context.Context, resource interface{}) (interface{}, error)

	// Read retrieves a resource by ID
	Read(ctx context.Context, id string) (interface{}, error)

	// Update modifies an existing resource
	Update(ctx context.Context, id string, resource interface{}) (interface{}, error)

	// Delete removes a resource by ID
	Delete(ctx context.Context, id string) error

	// List retrieves multiple resources with optional filters
	List(ctx context.Context, filters map[string]interface{}) ([]interface{}, error)
}

// EventHook processes events from the host application
type EventHook interface {
	// Handle processes an event
	Handle(ctx context.Context, event Event) error

	// EventTypes returns the list of event types this hook can handle
	EventTypes() []string
}

// Event represents an event in the system
type Event struct {
	Type      string                 `json:"type"`
	Source    string                 `json:"source"`
	Timestamp time.Time              `json:"timestamp"`
	Data      map[string]interface{} `json:"data"`
	SessionID string                 `json:"session_id,omitempty"`
}

// UIComponent represents a UI component that can be rendered in the frontend
type UIComponent struct {
	ID          string            `json:"id"`
	Type        UIComponentType   `json:"type"`
	Name        string            `json:"name"`
	Description string            `json:"description"`
	Props       map[string]interface{} `json:"props,omitempty"`
	Handler     http.Handler      `json:"-"` // For server-side rendering
}

// UIComponentType defines the type of UI component
type UIComponentType string

const (
	UIComponentTypeWidget    UIComponentType = "widget"
	UIComponentTypeEnvelope  UIComponentType = "envelope"
	UIComponentTypeAction    UIComponentType = "action"
	UIComponentTypeWorkflow  UIComponentType = "workflow"
	UIComponentTypeView      UIComponentType = "view"
)

// Installable is an optional interface plugins can implement to run setup
// logic during first-time installation (e.g., seed agent profiles, create tables).
// If not implemented, Load() handles all setup.
type Installable interface {
	Install(host Host) error
}

// Uninstallable is an optional interface plugins can implement to clean up
// artifacts during uninstallation (e.g., remove seeded agent profiles).
// Data created by users through the plugin (tickets, etc.) is preserved.
type Uninstallable interface {
	Uninstall(host Host) error
}

// Connector is the interface for outbound integrations (email, webhook, Slack, etc.).
type Connector interface {
	// Name returns the connector identifier.
	Name() string
	// Send delivers a payload through this connector.
	Send(ctx context.Context, payload map[string]interface{}) error
	// Health checks the connector's availability. Returns nil if healthy.
	Health(ctx context.Context) error
}

// ConfigFieldDef defines a single configuration field for frontend rendering.
type ConfigFieldDef struct {
	Key         string   `json:"key"`
	Type        string   `json:"type"` // "string", "bool", "int", "select", "secret"
	Label       string   `json:"label"`
	Description string   `json:"description,omitempty"`
	Default     any      `json:"default,omitempty"`
	Required    bool     `json:"required,omitempty"`
	Options     []string `json:"options,omitempty"`   // for "select" type
	Component   string   `json:"component,omitempty"` // custom React component name (requires developer_mode)
}

// ErrCancelled is returned by an EventHook's Handle method to signal that
// the pre-hook action should be cancelled. Only meaningful for pre-hook events
// (e.g. message.sending, tool.executing). Regular post-events ignore this.
var ErrCancelled = errors.New("plugin: action cancelled by hook")

// PluginError is a typed error that carries an HTTP-friendly status code.
// Plugin CRUD handlers should return these instead of plain errors so the
// host can map them to proper HTTP status codes.
type PluginError struct {
	Code    int    // HTTP status code (404, 409, 422, etc.)
	Message string
}

func (e *PluginError) Error() string { return e.Message }

// Sentinel constructors for common CRUD errors.

func ErrNotFound(msg string) *PluginError    { return &PluginError{Code: 404, Message: msg} }
func ErrConflict(msg string) *PluginError    { return &PluginError{Code: 409, Message: msg} }
func ErrValidation(msg string) *PluginError  { return &PluginError{Code: 422, Message: msg} }

// Logger provides logging capabilities for plugins
type Logger interface {
	Debug(msg string, keysAndValues ...interface{})
	Info(msg string, keysAndValues ...interface{})
	Warn(msg string, keysAndValues ...interface{})
	Error(msg string, keysAndValues ...interface{})
	With(keysAndValues ...interface{}) Logger
}