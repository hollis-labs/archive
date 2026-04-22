# Changelog

All notable changes to nanite-plugin-agent-mux are documented here.

## [Unreleased]

### Added
- Subprocess plugin scaffold (Init/Load/Unload via plugin-sdk v0.3.0)
- Pinned `go-agentmux-client` v0.3.0 with `/events/stream` SSE consumption
- `ActivityEvent` vocabulary + ring buffer with `since` cursor and drops counter
- Two HTTP routes (`/api/plugins/agent-mux/activity/snapshot`, `/api/plugins/agent-mux/activity/health`) the widget polls at 1Hz
- React widget shell that polls and renders placeholder event list; final visual design shipped separately by the frontend agent
