# Changelog

## v0.1.0 — 2026-04-13

Initial release. Rebuilt on `github.com/hollis-labs/plugin-sdk` v0.3.0 as a canonical subprocess plugin — the pre-Phase-2 in-tree `giphy` builtin is replaced by this repo.

### Added

- `/giphy <query>` slash command that emits a `giphy-modal` envelope.
- `giphy.search` MCP tool returning structured Giphy result JSON plus the matching envelope.
- Demo mode (built-in GIF set) when `GIPHY_API_KEY` is not configured.
- React `GiphyModalCard` component, shipped as a sidecar bundle via Vite with React marked external.
- `Makefile` release target: cross-compiles for darwin-arm64 / darwin-amd64 / linux-amd64 / linux-arm64 / windows-amd64, assembles per-platform tar.gz archives with SHA256, and optionally signs with Ed25519.
