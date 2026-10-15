# Audit — go-plugin

**Audited:** 2026-04-09
**Auditor:** general-purpose subagent (BOOT_STANDARDIZATION audit)
**Path:** libs/go-plugin
**Kind:** lib

## Summary

`go-plugin` defines a reasonably complete plugin contract (Plugin, Host, CRUD/Event/UI registries, typed errors, config/command/slot/keybinding DTOs) and ships a small but working shared `Registry` with lifecycle and event dispatch tests. The apply session now adds the missing LICENSE and `doc.go`; the remaining module-path concern is resolved by treating `github.com/hollis-labs/go-plugin` as the standalone repo's canonical import path per D2, and the README now matches that path. Large portions of the `Host` interface are explicit "not supported by shared Registry" stubs, and that stub-only subset is now documented in the package docs.

## Checklist

| # | Check | Status | Notes |
|---|---|---|---|
| 1 | `go.mod` present | pass | `github.com/hollis-labs/go-plugin`, `go 1.26.1`, no deps |
| 2 | `README.md` present (before this audit) | pass | existed; renamed to `README.original.md` |
| 3 | `LICENSE` present | pass | MIT LICENSE added in this apply session |
| 4 | `doc.go` with `// Package X ...` godoc comment | pass | `doc.go` added with a package comment that documents the Registry subset and points to the out-of-tree host implementation |
| 5 | Module path matches intended repo layout | pass | `github.com/hollis-labs/go-plugin` remains the standalone repo's canonical import path per D2; README and package docs now align with that decision |
| 6 | README has standard sections (title, desc, install, usage, API, examples) | pass | new README follows template; omits Architecture details only where not applicable |
| 7 | Tests exist (`*_test.go`) | pass | `plugin_test.go` with 3 tests: `TestPluginInterface`, `TestUIRegistry`, `TestEventSystem`; coverage not measured |
| 8 | Examples (`example_test.go` or `examples/`) | partial | `example.go` provides an in-package `ExamplePlugin` reference implementation, but there is no `example_test.go` or `examples/` directory and no `Example*` godoc function |
| 9 | State/session files NOT misclassified as library docs | pass | none present (no `.agentrc/`, `BOOT.md`, `CLAUDE.md`, `bootstrap.md`, `boot-prompt.md`, or `boot/*.md`) |
| 10 | Public API sanity: errors typed/sentinel, context.Context first arg | partial | `PluginError` typed with `ErrNotFound`/`ErrConflict`/`ErrValidation`, `ErrCancelled` sentinel, CRUD/EventHook take `ctx` first — good; however `Plugin.Load/Unload`, `Host.GetConfig/SetConfig`, `Connector.Name`, and all `Register*` host methods do not take `context.Context`, and `Registry.EmitEvent` does not accept a caller-supplied context (uses stored `r.ctx`) |
| 11 | `CHANGELOG.md` present (nice to have) | fail | none |
| 12 | No circular/suspicious deps on other framework libs | pass | zero non-stdlib dependencies |

## Findings — Required Fixes

1. **Add a LICENSE file.**
   - **What:** `libs/go-plugin` has no LICENSE file.
   - **Why:** Libraries cannot be released or consumed externally without a clear license.
   - **Suggested fix:** Drop in the framework-standard LICENSE (MIT) at `libs/go-plugin/LICENSE`.

2. **Reconcile the module path.**
   - **What:** `go.mod` declares `module github.com/hollis-labs/go-plugin`, but the library is laid out at `framework/libs/go-plugin`, and the original README's import example uses a third path (`github.com/hollis-labs/fragments-engine/plugin`). Three different canonical paths are currently in play.
   - **Why:** Consumers will import the wrong path; `go get` against the README snippet will fail or fetch stale code.
   - **Suggested fix:** Keep the standalone repo's canonical module path (`github.com/hollis-labs/go-plugin`) and align README/package docs with that decision. No `go.mod` rewrite is needed under D2.

3. **Add a `doc.go` with a package-level godoc comment.**
   - **What:** None of the `.go` files carry a `// Package plugin ...` comment, so `go doc` / pkg.go.dev will show no package summary.
   - **Why:** Standardization requires a discoverable package description; it is also the canonical place to link to ADR-029, the Host contract, and the `Registry` vs. full host distinction.
   - **Suggested fix:** Create `libs/go-plugin/doc.go` containing a `// Package plugin ...` comment that summarizes the contract and points to `example.go` and the Conduit-hosted full implementation.

4. **Clarify the Registry-as-stub story in code, not just errors.**
   - **What:** `Registry.GetConfig`, `SetConfig`, `RegisterConfigSchema`, `RegisterConnector`, `RegisterProvider`, `RegisterCLIAdapter`, `RegisterCommand`, `RegisterSlot`, and `RegisterKeybinding` all return `"not supported by shared Registry; use Conduit Host"`.
   - **Why:** A consumer wiring plugins against the shared `Registry` will hit runtime errors for the majority of host features with no compile-time signal and no documentation of where the real implementation lives.
   - **Suggested fix:** Add package-level docs describing which subset the shared Registry supports and link to the Conduit host implementation. A Host-interface refactor is out of scope for this apply session.

## Findings — Nice-to-Have

1. **Add a runnable `example_test.go`.**
   - **What:** `example.go` demonstrates usage but is a regular source file, not a go-doc example.
   - **Why:** `Example*` functions show up on pkg.go.dev and are compiled/verified by `go test`.
   - **Suggested fix:** Add `example_test.go` with `ExampleRegistry_LoadPlugin` (or similar) driving `NewRegistry` + `NewExamplePlugin`.

2. **Accept `context.Context` in host registration and lifecycle calls where cancellation matters.**
   - **What:** `Plugin.Load`/`Unload`, `Host.GetConfig`/`SetConfig`, and the `Register*` methods take no `ctx`. `Registry.EmitEvent` also ignores caller context and uses `r.ctx`.
   - **Why:** Consistent with Go conventions and allows plugin setup/teardown to respect cancellation timeouts.
   - **Suggested fix:** Plan a v2 of the Host interface threading `context.Context` through lifecycle methods; coordinate with downstream hosts before shipping.

3. **Add a `CHANGELOG.md`.**
   - **What:** No changelog to track contract evolution.
   - **Why:** The `Host` interface has many optional registration methods that will evolve; downstream host implementations need a signal when they break.
   - **Suggested fix:** Start a keep-a-changelog style file seeded with the current API surface as `0.1.0`.

4. **Fix comment/constant wording.**
   - **What:** `uiregistry.go` uses `ur` receivers inconsistently with convention (should be `r` or `reg`), and `Plugin.Load` comment refers to "loaded into the host" while the shared `Registry` is itself the host — minor but worth cleaning up once the Registry/Host split is decided.
   - **Why:** Cosmetic, but reduces confusion for new plugin authors reading the interface file.
   - **Suggested fix:** Light editorial pass alongside the `doc.go` change.

5. **Replace `map[string]interface{}` with `map[string]any` and the `any` alias consistently.**
   - **What:** Mixed usage: `ConfigFieldDef.Default` is `any`, `Event.Data` and `UIComponent.Props` are `map[string]interface{}`.
   - **Why:** Consistency, and it is idiomatic Go 1.18+.
   - **Suggested fix:** Sweep the package to use `any` uniformly.

## Prior Documentation

- `README.md` existed prior to this audit and has been renamed to `libs/go-plugin/README.original.md`. It described the package as "Fragments Engine Plugin System," cited ADR-029, and listed Conduit, Hadron, and Volon as host integrations. Its `import` example used the path `github.com/hollis-labs/fragments-engine/plugin`, which does not match the current `go.mod` module path — flagged in Required Fix #2.
- `README.original.md` was deleted during the apply session after its useful content was carried forward into the current README.
- No `CHANGELOG.md` or `docs/` subfolder. `LICENSE` and `doc.go` were added during the apply session.
- No session/state files present (no `.agentrc/`, `BOOT.md`, `CLAUDE.md`, `bootstrap.md`, `boot-prompt.md`, or `boot/*.md`).
- A `.git` directory is present at the root of the lib, indicating this was previously a standalone repo; not a documentation concern but worth noting for the monorepo integration pass.

## Public API Snapshot

**`plugin.go` (package `plugin`)**
- Interfaces: `Plugin`, `Host`, `CRUDHandler`, `EventHook`, `Installable`, `Uninstallable`, `Connector`, `Logger`.
- Structs: `PluginStatus`, `Event`, `UIComponent`, `UISlotEntry`, `ConfigFieldDef`, `CommandArg`, `SlashCommandDef`, `KeybindingDef`, `PluginError`.
- Named types: `UIComponentType` (string), `UISlotName` (string).
- Constants: `UIComponentTypeWidget`, `UIComponentTypeEnvelope`, `UIComponentTypeAction`, `UIComponentTypeWorkflow`, `UIComponentTypeView`; `SlotNavRail`, `SlotSettingsTab`, `SlotRightRailTab`, `SlotComposerToolbar`, `SlotChatHeaderAction`, `SlotContextMenuMessage`, `SlotContextMenuSession`, `SlotCommandPalette`.
- Variables: `ErrCancelled`.
- Methods/funcs: `(*PluginError).Error`, `ErrNotFound`, `ErrConflict`, `ErrValidation`.

**`registry.go` (package `plugin`)**
- Type: `Registry` (struct).
- Constructor: `NewRegistry(logger Logger) *Registry`.
- Methods: `LoadPlugin`, `UnloadPlugin`, `GetPlugin`, `ListPlugins`, `RegisterCRUDHandler`, `GetCRUDHandler`, `RegisterEventHook`, `EmitEvent`, `RegisterUIComponent`, `GetUIRegistry`, `RegisterService`, `GetService`, `Logger`, `Context`, `GetConfig`, `SetConfig`, `RegisterConfigSchema`, `RegisterConnector`, `RegisterProvider`, `RegisterCLIAdapter`, `RegisterCommand`, `RegisterSlot`, `RegisterKeybinding`, `Shutdown`.

**`uiregistry.go` (package `plugin`)**
- Interface: `UIRegistry`.
- Constructor: `NewUIRegistry() UIRegistry`.
- Unexported impl: `uiRegistryImpl` with `RegisterComponent`, `GetComponent`, `GetComponentsByType`, `ListComponents`, `UnregisterComponent`.

**`logger.go` (package `plugin`)**
- Constructor: `NewDefaultLogger(prefix string) Logger`.
- Unexported impl: `defaultLogger` with `Debug`, `Info`, `Warn`, `Error`, `With`.

**`example.go` (package `plugin`)**
- Type: `ExamplePlugin`.
- Constructor: `NewExamplePlugin() *ExamplePlugin`.
- Methods: `ID`, `Name`, `Version`, `Description`, `Dependencies`, `Load`, `Unload`, `Status`.
- Unexported helpers: `exampleCRUDHandler`, `exampleEventHook` (demonstration only).

**`plugin_test.go` (package `plugin`)**
- Tests: `TestPluginInterface`, `TestUIRegistry`, `TestEventSystem`.
- Helpers: `testEventHook`.

## Open Questions

1. What is the canonical module path for this library in the framework monorepo? The current `go.mod` (`github.com/hollis-labs/go-plugin`), the physical path (`framework/libs/go-plugin`), and the original README's import example (`github.com/hollis-labs/fragments-engine/plugin`) all disagree.
2. Is the shared `Registry` intended to remain a stub-only substrate, or should it grow a minimal implementation of config/connector/provider/command/slot/keybinding registration so non-Conduit hosts can use it directly? The answer affects both documentation and the proposed Host interface split.
3. Where does the full "Conduit Host" implementation live? The stub errors reference it by name but there is no path or import hint in-tree.
4. Should `Plugin.Load`/`Unload` and the `Register*` host methods accept `context.Context`? Retrofitting this is a breaking change to every downstream plugin, so it needs a cross-project decision.
5. Is the presence of a `.git` directory inside `libs/go-plugin` intentional (vendored-as-submodule) or leftover from a prior standalone repo that should be removed when the monorepo is finalized?
