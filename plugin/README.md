# Fragments Engine Plugin System

Universal plugin interface for the Fragments Engine platform. This module defines the contracts that all applications use for plugin integration according to ADR-029.

## Overview

The plugin system enables extensibility across the Fragments Engine platform without modifying core code. Applications import this module and implement the plugin host interface, while plugins implement the plugin interface to provide additional functionality.

## Core Interfaces

### Plugin

Main interface that all plugins must implement:

- `ID()` - Unique plugin identifier
- `Name()` - Human-readable name
- `Version()` - Plugin version
- `Description()` - Brief description
- `Dependencies()` - Required dependencies
- `Load(host Host)` - Initialize the plugin
- `Unload()` - Clean up resources
- `Status()` - Current plugin status

### Host

Runtime environment provided to plugins:

- `GetPlugin(id)` - Access other loaded plugins
- `RegisterCRUDHandler()` - Register resource handlers
- `RegisterEventHook()` - Register event processors
- `RegisterUIComponent()` - Register UI elements
- `GetService()` - Access core services
- `Logger()` - Plugin logging
- `Context()` - Execution context

### CRUDHandler

Defines CRUD operations for plugin-provided resources:

- `Create(ctx, resource)` - Create new resource
- `Read(ctx, id)` - Retrieve resource by ID
- `Update(ctx, id, resource)` - Update existing resource
- `Delete(ctx, id)` - Remove resource
- `List(ctx, filters)` - Query multiple resources

### EventHook

Processes events from the host application:

- `Handle(ctx, event)` - Process an event
- `EventTypes()` - Supported event types

### UIRegistry

Manages UI components from plugins:

- `RegisterComponent()` - Add UI component
- `GetComponent(id)` - Retrieve component by ID
- `GetComponentsByType()` - Get components of specific type
- `ListComponents()` - List all components
- `UnregisterComponent()` - Remove component

## Usage

### Creating a Plugin

```go
import "github.com/hollis-labs/fragments-engine/plugin"

type MyPlugin struct {
    // ... fields
}

func (p *MyPlugin) ID() string { return "my-plugin" }
func (p *MyPlugin) Name() string { return "My Plugin" }
// ... implement other Plugin interface methods

func (p *MyPlugin) Load(host plugin.Host) error {
    // Register handlers, hooks, UI components
    return nil
}
```

### Setting up a Plugin Host

```go
import "github.com/hollis-labs/fragments-engine/plugin"

// Create registry
logger := plugin.NewDefaultLogger("app")
registry := plugin.NewRegistry(logger)

// Register core services
registry.RegisterService("database", dbConnection)

// Load plugins
myPlugin := NewMyPlugin()
if err := registry.LoadPlugin(myPlugin); err != nil {
    log.Fatal(err)
}
```

### UI Components

Plugins can register UI components that the host application can render:

```go
component := plugin.UIComponent{
    ID:          "my-widget",
    Type:        plugin.UIComponentTypeWidget,
    Name:        "My Widget",
    Description: "A custom widget",
    Props: map[string]interface{}{
        "title": "Hello World",
        "color": "blue",
    },
}

host.RegisterUIComponent(component)
```

### Event System

Plugins can listen to and handle application events:

```go
type MyEventHook struct{}

func (h *MyEventHook) Handle(ctx context.Context, event plugin.Event) error {
    // Process the event
    return nil
}

func (h *MyEventHook) EventTypes() []string {
    return []string{"user.login", "session.start"}
}
```

## Registry

The `Registry` type provides the central plugin management:

- `LoadPlugin(plugin)` - Load and initialize a plugin
- `UnloadPlugin(id)` - Unload a plugin
- `GetPlugin(id)` - Retrieve a loaded plugin
- `ListPlugins()` - List all loaded plugins
- `EmitEvent(event)` - Dispatch events to hooks
- `Shutdown()` - Gracefully shut down all plugins

## Example

See `example.go` for a complete plugin implementation demonstrating all interface capabilities.

## Architecture

This module implements the Component Autonomy & Plugin Contract architecture (ADR-029), enabling:

- **Extensibility**: Add capabilities without core modifications
- **Isolation**: Plugins run in controlled environments
- **Composability**: Mix and match plugin functionality
- **Consistency**: Standard interfaces across all applications

## Integration

Applications using this plugin system:

- **Conduit**: Chat harness with plugin-based extensions
- **Hadron**: Blueprint system with workflow plugins
- **Volon**: Task management with agent plugins

Each application implements the `Host` interface and manages a `Registry` to load relevant plugins.