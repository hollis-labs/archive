# Changelog

All notable changes to nanite-plugin-agent-mux are documented here.

## [0.1.0] — 2026-04-22

Initial release.

### Added
- Subprocess plugin scaffold (Init/Load/Unload via plugin-sdk v0.3.0)
- Pinned `go-agentmux-client` v0.3.0 with `/events/stream` SSE consumption and exponential-backoff reconnect (1s → 30s, resets on successful reconnect)
- `ActivityEvent` vocabulary covering `session.state`, `envelope.created`/`replied`, `daemon.started`/`shutdown`; unknown kinds preserved in `Facets["raw_type"]`
- Ring buffer with monotonic IDs, time + cap eviction (default 60s / 500 events), `since` cursor reads, and drops counter
- Two HTTP routes (`/api/plugins/agent-mux/activity/snapshot`, `/api/plugins/agent-mux/activity/health`) the widget polls at 1 Hz
- Mux Activity widget — canvas-based pixel-rise waterfall driven by the activity feed; ships with collapsible WidgetShell chrome matching Nanite's native Widget
- Plugin config: `muxd_listen_addr`, `buffer_seconds`, `buffer_cap`, `auto_start`
- Cross-compile build pipeline (darwin-arm64/amd64, linux-amd64/arm64); Ed25519 archive signing via `cmd/sign`
- CI gate: gofmt / vet / golangci-lint / `go test -race` / govulncheck / UI test + build

### Known limitations
- No periodic health-probe retry loop when `auto_start=false` (the subscriber's reconnect loop covers the `auto_start=true` path)
- No logging of reconnects, classifier misses, or drop counts (observable via the `/activity/health` endpoint only)
