# Changelog

## v0.1.0 — 2026-04-14

Initial release. Rebuilt on `github.com/hollis-labs/plugin-sdk` v0.3.0 as a canonical subprocess plugin — the pre-Phase-2 in-tree `oembed` builtin is replaced by this repo.

### Added

- `message.sent` post-hook handler that scans chat messages for URLs, matches them against a built-in provider registry (YouTube, Spotify, Vimeo, SoundCloud, Flickr), and emits an `oembed-card` envelope for the first matching URL.
- `oembed_extra_providers` config — YAML list of `{name, pattern, endpoint}` triples for user-supplied providers.
- In-memory per-URL cache (10-minute TTL) to avoid redundant oEmbed fetches.
- React `OEmbedCard` component, shipped as a sidecar bundle via Vite with React marked external.
- `Makefile` release target: cross-compiles for darwin-arm64 / darwin-amd64 / linux-amd64 / linux-arm64 / windows-amd64, assembles per-platform tar.gz archives with SHA256, and optionally signs with Ed25519.
