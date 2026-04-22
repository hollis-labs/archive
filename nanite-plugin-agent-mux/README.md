# nanite-plugin-agent-mux

Subprocess plugin for Nanite that visualizes live activity on a local Agent Mux daemon.

v1 ships a single right-rail widget (falling-boxes waterfall) driven by a classified projection of muxd's `/events/stream` and `/messages/subscribe` SSE feeds. No MCP tools, no agent profiles — those remain in Nanite core.

## Requirements

- [Nanite](https://github.com/hollis-labs/nanite) host (compatible with plugin-sdk v0.3.0)
- A running local [Agent Mux](https://github.com/hollis-labs/agent-mux) daemon (`muxd`)

## Config

- `muxd_listen_addr` — UDS path or TCP URL for `muxd`. Default: client auto-resolves to `~/.agent-mux/run/muxd.sock`.
- `buffer_seconds` — ring buffer time window (default 60)
- `buffer_cap` — ring buffer event cap (default 500)
- `auto_start` — start SSE subscribers on Load (default true)

## Development

```
make dev        # local build (binary + UI bundle)
make release    # cross-compiled, optionally signed archives
```

## License

MIT — see `LICENSE`.
