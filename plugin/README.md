# Hollis Labs Plugin SDK

Universal plugin contract for Hollis Labs applications. This module defines the generic interfaces that all applications implement for plugin integration (ADR-029).

## Architectural Rule

**This package contains ONLY generic interfaces and structs.**

App-specific types — UI slots, slash commands, keybindings, frontend layout concepts — belong in the consuming application's `internal/plugin/` package, not here.

Before adding a type to this SDK, ask: **"Would every app need this?"** If the answer is no, it goes in the app. If you're unsure, it goes in the app. This boundary exists because leaking app-specific types into the SDK forces every consumer to implement stubs for concepts that don't apply to them.

### What belongs here

- Lifecycle interfaces: `Plugin`, `Host`, `Installable`, `Uninstallable`
- Extension interfaces: `CRUDHandler`, `EventHook`, `Connector`
- Generic data types: `Event`, `UIComponent`, `ConfigFieldDef`, `PluginStatus`
- Infrastructure: `Registry`, `UIRegistry`, `Logger`
- Error types: `PluginError`, `ErrCancelled`

### What does NOT belong here

- Named UI mount points (slots, navbars, sidebars, composers)
- Slash command definitions (handler signatures are app-specific)
- Keyboard shortcut definitions (assumes a specific frontend model)
- Event name constants (each app defines its own event vocabulary)
- Any type that references a specific app's UI layout or interaction model

## Core Interfaces

### Plugin

All plugins implement this interface:

```go
type Plugin interface {
    ID() string
    Name() string
    Version() string
    Description() string
    Dependencies() []string
    Load(host Host) error
    Unload() error
    Status() PluginStatus
}
```

### Host

Runtime environment provided to plugins during `Load()`:

```go
type Host interface {
    GetPlugin(id string) (Plugin, bool)
    RegisterCRUDHandler(resourceType string, handler CRUDHandler) error
    RegisterEventHook(eventTypes []string, hook EventHook) error
    RegisterUIComponent(component UIComponent) error
    GetService(name string) (interface{}, error)
    GetConfig(key string) (string, error)
    SetConfig(key string, value string) error
    RegisterConfigSchema(fields []ConfigFieldDef) error
    RegisterConnector(name string, connector Connector) error
    RegisterProvider(name string, provider interface{}) error
    RegisterCLIAdapter(name string, adapter interface{}) error
    Logger() Logger
    Context() context.Context
}
```

Each application implements `Host` and may add extra methods for app-specific registrations (e.g., Nanite adds `RegisterSlot`, `RegisterCommand`, `RegisterKeybinding` on its Host struct). Plugins that need these app-specific methods use type assertions.

## Usage

### Creating a Plugin

```go
import "github.com/hollis-labs/plugin"

type MyPlugin struct { /* ... */ }

func (p *MyPlugin) Load(host plugin.Host) error {
    // Register generic capabilities via the Host interface.
    host.RegisterEventHook([]string{"session.start"}, myHook)
    host.RegisterCRUDHandler("my-resource", myHandler)

    // For app-specific features, type-assert to the app's Host:
    // if nh, ok := host.(*nanitePlugin.Host); ok {
    //     nh.RegisterSlot(...)
    // }

    return nil
}
```

### Setting Up a Plugin Host

```go
import "github.com/hollis-labs/plugin"

logger := plugin.NewDefaultLogger("app")
registry := plugin.NewRegistry(logger)
registry.RegisterService("database", dbConnection)

if err := registry.LoadPlugin(myPlugin); err != nil {
    log.Fatal(err)
}
```

## Consumers

Applications using this SDK:

- **Nanite** — Chat harness (`internal/plugin/` adds slots, commands, keybindings, filters)
- **Hadron** — Blueprint/pipeline runner (`internal/plugin/` adds pipeline-specific extensions)
- **Cortex** — Context store (`internal/plugin/` minimal, mostly event hooks)

Each application's `internal/plugin/` package is where app-specific types and Host extensions live.
