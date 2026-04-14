# nanite-plugin-oembed

Subprocess plugin for [Nanite](https://github.com/hollis-labs/nanite) that adds
automatic rich previews for URLs shared in chat. When a message contains a URL
from a supported oEmbed provider, the plugin fetches the provider's oEmbed
metadata and renders an `oembed-card` envelope inline.

## What it does

- Subscribes to `message.sent` events.
- Scans each message body (up to 5 URLs) for matches against built-in
  providers: **YouTube**, **Spotify**, **Vimeo**, **SoundCloud**, **Flickr**.
- Fetches oEmbed metadata for the first matching URL and emits an
  `oembed-card` envelope.
- Results are cached per-URL for 10 minutes to avoid redundant fetches.

Messages that begin with `!` (plugin command prefix) are skipped so commands
never trigger previews.

## Install

Release archives are signed and published to the
[Nanite plugin catalog](https://plugins.nanite.hollislabs.dev); install via:

```
nanite plugin install oembed
```

or, during development, point the host at a local checkout:

```
nanite plugin install ./nanite-plugin-oembed
```

## Configuration

| Key                      | Default | Description                                                                |
|--------------------------|---------|----------------------------------------------------------------------------|
| `oembed_extra_providers` | *empty* | YAML list of additional providers; each entry is `{name, pattern, endpoint}`. |

The `pattern` is a Go regexp matched against the raw URL, and `endpoint` uses
`{url}` as the substitution placeholder. Example:

```yaml
- name: Example
  pattern: "https?://example\\.com/posts/"
  endpoint: "https://example.com/oembed?url={url}&format=json"
```

## Build

```
make release
```

Cross-compiles the Go binary for 5 platforms, builds the React bundle,
assembles per-platform archives in `dist/archives/`, and (when
`OEMBED_SIGNING_KEY` is set) signs each archive with Ed25519.

`dev-signing-key.pub` is checked in for development verification. Real
catalog releases are signed with the key held in 1Password — see the Track F
catalog infra.

## Layout

```
.
├── plugin.yaml                    plugin manifest (v1 schema)
├── main.go                        subprocess entrypoint + event handler
├── fetch.go                       oEmbed HTTP client
├── providers.go                   built-in provider registry + matcher
├── cache.go                       in-memory result cache
├── envelopes/                     JSON Schemas for emitted envelope types
├── ui/                            React component + Vite build
├── cmd/sign/                      release-time signing helper
├── Makefile                       build + release orchestration
└── dev-signing-key.pub            Ed25519 dev signing public key
```
