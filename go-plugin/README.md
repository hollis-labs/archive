# go-plugin

Universal plugin contract for Fragments Engine applications. This package defines the interfaces a host application implements and the interfaces a plugin must satisfy, plus a shared in-memory `Registry` that loads plugins, enforces dependency ordering, and fans out events to registered hooks. Host applications (e.g. Conduit, Hadron, Volon per the existing README) import this module so plugins can register CRUD handlers, event hooks, UI components, slash commands, connectors, providers, keybindings, and config schemas against a single contract.

## Status

Beta — the core `Plugin`, `Host`, `Registry`, and `UIRegistry` surfaces are covered by unit tests in `plugin_test.go`, but a large number of `Host` methods on the shared `Registry` are explicit stubs that return `"not supported by shared Registry; use Conduit Host"`, indicating the full host implementation lives out-of-tree.

## Install

```bash
go get github.com/hollis-labs/go-plugin
```

## Usage

Minimal end-to-end flow adapted from `plugin_test.go` and `example.go`:

```go
package main

import (
    "log"

    plugin "github.com/hollis-labs/go-plugin"
)

func main() {
    logger := plugin.NewDefaultLogger("app ")
    registry := plugin.NewRegistry(logger)

    // Load the bundled example plugin.
    p := plugin.NewExamplePlugin()
    if err := registry.LoadPlugin(p); err != nil {
        log.Fatalf("load: %v", err)
    }

    // Dispatch an event to any registered hooks.
    _ = registry.EmitEvent(plugin.Event{
        Type:   "example-event",
        Source: "main",
        Data:   map[string]interface{}{"hello": "world"},
    })

    if err := registry.Shutdown(); err != nil {
        log.Fatalf("shutdown: %v", err)
    }
}
```

See `example.go` for a full `Plugin` implementation that registers a `CRUDHandler`, `EventHook`, and `UIComponent` during `Load`.

## API Overview

**Core plugin contract (`plugin.go`)**
- `Plugin` — interface every plugin implements (`ID`, `Name`, `Version`, `Description`, `Dependencies`, `Load`, `Unload`, `Status`).
- `PluginStatus` — struct reporting loaded/enabled flags, load time, last error.
- `Host` — runtime services exposed to plugins: `GetPlugin`, `RegisterCRUDHandler`, `RegisterEventHook`, `RegisterUIComponent`, `GetService`, `GetConfig`/`SetConfig`/`RegisterConfigSchema`, `RegisterConnector`, `RegisterProvider`, `RegisterCLIAdapter`, `RegisterCommand`, `RegisterSlot`, `RegisterKeybinding`, `Logger`, `Context`.
- `Installable` / `Uninstallable` — optional lifecycle interfaces for first-install and cleanup.
- `CRUDHandler`, `EventHook`, `Event`, `Connector` — resource, event, and outbound integration contracts.
- `UIComponent` + `UIComponentType` constants (`Widget`, `Envelope`, `Action`, `Workflow`, `View`) and `UISlotName` constants (`SlotNavRail`, `SlotSettingsTab`, `SlotRightRailTab`, `SlotComposerToolbar`, `SlotChatHeaderAction`, `SlotContextMenuMessage`, `SlotContextMenuSession`, `SlotCommandPalette`) plus `UISlotEntry`.
- `ConfigFieldDef`, `CommandArg`, `SlashCommandDef`, `KeybindingDef` — structured registration payloads.
- `ErrCancelled` sentinel and `PluginError` typed error with `ErrNotFound`/`ErrConflict`/`ErrValidation` constructors carrying HTTP status codes (404/409/422).
- `Logger` — structured logging interface used by plugins and the registry.

**Shared registry (`registry.go`)**
- `Registry` — in-memory plugin manager that implements most of `Host`.
- `NewRegistry(logger Logger) *Registry` — constructor that wires a cancelable context and empty maps.
- `LoadPlugin` / `UnloadPlugin` / `GetPlugin` / `ListPlugins` — lifecycle with dependency validation and reverse-order shutdown.
- `RegisterCRUDHandler` / `GetCRUDHandler`, `RegisterEventHook` / `EmitEvent`, `RegisterUIComponent` / `GetUIRegistry`, `RegisterService` / `GetService`.
- `Shutdown()` — unloads every plugin and cancels the registry context.
- `GetConfig`, `SetConfig`, `RegisterConfigSchema`, `RegisterConnector`, `RegisterProvider`, `RegisterCLIAdapter`, `RegisterCommand`, `RegisterSlot`, `RegisterKeybinding` — satisfy the `Host` interface with explicit "not supported by shared Registry; use Conduit Host" errors.

**UI registry (`uiregistry.go`)**
- `UIRegistry` interface and `NewUIRegistry()` constructor backing a thread-safe `map[string]UIComponent` with `RegisterComponent`, `GetComponent`, `GetComponentsByType`, `ListComponents`, `UnregisterComponent`.

**Default logger (`logger.go`)**
- `NewDefaultLogger(prefix string) Logger` — minimal stdlib `log` adapter; `With` is a no-op.

**Bundled example (`example.go`)**
- `ExamplePlugin` + `NewExamplePlugin()` — reference `Plugin` implementation.
- Internal `exampleCRUDHandler` and `exampleEventHook` demonstrate the handler/hook contracts.

## Architecture Notes

The shared `Registry` is intentionally a thin substrate: it holds a single map of plugins plus sibling maps for CRUD handlers, event hooks, UI components, and generic services, all guarded by a `sync.RWMutex`. It validates that a plugin's `Dependencies()` are already loaded at `LoadPlugin` time and prevents unloading a plugin that another loaded plugin still depends on. A cancelable `context.Context` is created in `NewRegistry` and surfaced to plugins via `Host.Context()`; `Shutdown()` unloads every plugin then calls `cancel()`. The registry is designed to be embedded or wrapped by a richer host implementation — every `Host` method tied to higher-level subsystems (config, connectors, providers, CLI adapters, slash commands, UI slots, keybindings) is a placeholder that returns an explicit error directing callers to "Conduit Host," so real applications must supply their own implementation of those capabilities.

## Dependencies

**Framework-internal:** none.

**External:** none — `go.mod` declares only the module path and `go 1.26.1`; the package depends solely on the Go standard library (`context`, `errors`, `fmt`, `log`, `net/http`, `sync`, `time`).

## Testing

```bash
go test ./...
```

Tests live in `plugin_test.go` and exercise the plugin lifecycle, UI registry registration/retrieval, and the event hook dispatch path. No external services, fixtures, or environment variables are required.

## License

MIT License. See [`LICENSE`](./LICENSE).
