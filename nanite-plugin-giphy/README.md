# nanite-plugin-giphy

Subprocess plugin for [Nanite](https://github.com/hollis-labs/nanite) that adds
a `/giphy <query>` slash command and a `giphy.search` MCP tool.

## What it does

- `/giphy cats` — searches Giphy for "cats" and renders a `giphy-modal` envelope inline in chat.
- `giphy.search` MCP tool — returns the same search result as structured JSON plus the matching envelope, so agents can surface GIFs alongside their responses.

When no `GIPHY_API_KEY` is configured the plugin runs in **demo mode** with a small built-in GIF set.

## Install

This repo is the canonical source for the plugin. Release archives are signed and published to the [Nanite plugin catalog](https://plugins.nanite.hollislabs.dev); install via:

```
nanite plugin install giphy
```

or, during development, point the host at a local checkout:

```
nanite plugin install ./nanite-plugin-giphy
```

## Configuration

| Key              | Env var          | Default | Description                                               |
|------------------|------------------|---------|-----------------------------------------------------------|
| `giphy_api_key`  | `GIPHY_API_KEY`  | *unset* | API key from <https://developers.giphy.com>. Demo mode when blank. |
| `giphy_rating`   | —                | `g`     | Maximum content rating (`g`, `pg`, `pg-13`, `r`).         |

## Build

```
make release
```

Cross-compiles the Go binary for 5 platforms, builds the React bundle, assembles per-platform archives in `dist/archives/`, and (when `GIPHY_SIGNING_KEY` is set) signs each archive with Ed25519.

`dev-signing-key.pub` is checked in for development verification. Real catalog releases are signed with the key held in 1Password — see the Track F catalog infra.

## Layout

```
.
├── plugin.yaml                    plugin manifest (v1 schema)
├── main.go                        subprocess entrypoint
├── search.go                      Giphy API client
├── envelopes/                     JSON Schemas for emitted envelope types
├── ui/                            React component + Vite build
├── cmd/sign/                      release-time signing helper
├── Makefile                       build + release orchestration
└── dev-signing-key.pub            Ed25519 dev signing public key
```
