# go-signals

> **Status: deferred (2026-05-12)** — this repository is parked. There is no code to consume yet, and no scaffold is planned until a real consumer drives the design. The repo is kept public to reserve the name and to make this deferral discoverable.

## What this was going to be

A small, portfolio-shared Go library for parsing line-by-line subprocess stdout signals — the reusable shape of patterns implemented (or formerly implemented) across Clockwork, Hadron, and Nanite for capturing structured events emitted by CLI agents.

## Why it is deferred

The original justification has evaporated:

1. **Fragments Engine has been sunset.** Its `VOLON_*` stdout marker vocabulary (`VOLON_DONE`, `VOLON_REVIEW`, `VOLON_BLOCKED`, `VOLON_SOFT_BLOCKED`, `VOLON_TOKENS`) was the seed for the proposed `go-signals` API. Per the "only Clockwork patterns" portfolio rule, that vocabulary cannot be carried into a public extraction.

2. **Clockwork retired its own stdout signal protocol.** In Phase E (Clockwork ticket `CW-20260427-0043`), Clockwork moved from stdout markers to **MCP tool calls** for interpretive signals (note / artifact / subtodo-done / checkpoint). The current `clockwork-manifold:internal/runtime/executor/signal.go` is a tiny `EventType` enum (Log, Artifact, Progress, TokenUsage, ToolUse) with a stringer — the body of the package the planning doc named is gone.

Without a current consumer driving the shape, building a generic line-marker parser now risks shipping the wrong abstraction. Hadron blueprint runner and Nanite CLI bridges were also listed as potential consumers, but neither has raised a concrete portfolio-wide subprocess-parsing need.

## Revisit conditions

This decision will be reopened when at least one of these is true:

- Hadron or Nanite produces a concrete subprocess-parsing use case that justifies portfolio-wide standardization.
- A second consumer of the Clockwork `EventType`-shaped MCP interpretive-signal pattern emerges, and the shape generalizes usefully across both.

## Related shipped work

The other half of the original sprint pack — the SQLite concurrency extraction — did have clear consumer needs and shipped:

- [`hollis-labs/go-sqlite`](https://github.com/hollis-labs/go-sqlite) — `v0.1.0` released 2026-05-12. Packages: `sqlitekit` (DSN + opener defaults), `txutil` (BEGIN IMMEDIATE / lock retry / savepoints), `serialwrite` (in-process write serializer).

## License

The package, when it exists, will be MIT-licensed by Hollis Labs. No code is currently published.
