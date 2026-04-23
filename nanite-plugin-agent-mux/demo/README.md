# Activity Widget — Standalone Demo

A minimal Vite + React app that runs the `MuxActivityWidget` against a live Agent Mux daemon. No nanite host required. Useful for visual spot-checks, screenshots, and demos.

The widget modules are imported directly from `../ui/src/components/` — no bundling of the plugin-UI library, no publish step. Changes to the widget source appear live via HMR.

## Prerequisite: put muxd on a TCP loopback address

Browsers cannot connect to unix-domain sockets, which is how `muxd` listens by default. For the demo to reach `/events/stream` and `/proxy/events`, switch the daemon to `tcp:127.0.0.1:<port>` temporarily, then revert when you're done.

**Switch to TCP (demo mode):**

```bash
# Backup current config
cp ~/.agent-mux/catalog/global.yaml ~/.agent-mux/catalog/global.yaml.bak

# Add the listen_addr override at the top of the file (after `version:`):
#   daemon:
#     listen_addr: tcp:127.0.0.1:9380

# Restart muxd to pick up the new listener
mux daemon stop && mux daemon start

# Verify
mux daemon status
# listener should read: tcp:127.0.0.1:9380
```

**Revert to unix socket (normal mode):**

```bash
cp ~/.agent-mux/catalog/global.yaml.bak ~/.agent-mux/catalog/global.yaml
rm ~/.agent-mux/catalog/global.yaml.bak
mux daemon stop && mux daemon start
```

> Note: while muxd is on TCP, the nanite plugin (when running) and any CLI/TUI/MCP clients will all use the TCP address — they read the same `listen_addr` config. That's fine for a demo session; just revert when done.

## Running the demo

```bash
cd demo
npm install
npm run dev
# Opens http://localhost:5178/
```

Vite proxies `/events/stream`, `/proxy/events`, and `/health` to the TCP-enabled muxd so the browser sees same-origin and avoids CORS issues.

## Feeding synthetic traffic

The demo widget is wired to an `EventSource` on `/events/stream` plus a polled `/proxy/events` fetcher. Either real mux activity (sessions, broker messages, MCP tool calls) or the bundled spam script will drive it:

```bash
cd ~/Projects-apps/agent-mux
./scripts/spam_proxy_events.sh --addr localhost:9380 --rate 20 --burst 30 --burst-chance 0.4
```

Adjust `--rate` to tune event volume. Run multiple copies for a busier widget. The demo maps events to layers by server name:

- `mux` (and native tools) → L0 yellow
- `clockwork`, `hadron` → L1 orange
- `vanta` → L2 red

This mapping is **demo-only** — real classification for the shipped plugin lives in `../ui/src/components/MuxActivityWidget.adapter.ts`.

## Tuning the visual for arrival rate

The widget's default decay (0.35 prob / 1500 ms) is tuned for the plugin's conservative real traffic. Under spam-driven arrival of 30–100 e/s the columns will saturate unless decay is bumped. `demo/src/main.tsx` overrides `decayMs` / `decayProbability` for a demo-friendly look:

| Arrival | Suggested `decayMs` / `decayProbability` |
|---------|-----------------------------------------|
| ~10 e/s | `500 / 0.5` (softer baseline) |
| ~30 e/s | `300 / 0.5` |
| ~60 e/s | `200 / 0.7` (current default) |
| ~100 e/s | `150 / 0.7` |

## Files

- `index.html` — demo page shell with a max-width wrapper
- `src/main.tsx` — mounts `MuxActivityWidget` with a demo-tuned decay + synthetic source
- `src/mux-sse-source.ts` — `ActivityEventSource` that subscribes to `/events/stream` and polls `/proxy/events` with ID-based dedup
- `src/index.css` — Tailwind entry (required because WidgetShell uses Tailwind utility classes)
- `vite.config.ts` — dev-server proxy config pointing at `http://127.0.0.1:9380`
- `tailwind.config.js` — scans `./src/**` + `../ui/src/**` for used utilities

## Status

This is a local dev tool, not part of the plugin's published bundle. It is checked in so the setup survives reboots, but `node_modules/` and `dist/` are gitignored.
