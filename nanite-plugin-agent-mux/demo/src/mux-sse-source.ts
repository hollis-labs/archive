// Subscribes to mux's /events/stream SSE and adapts each event into the
// widget-internal WidgetEvent shape. Quick-and-dirty — drop-in replacement
// for `createPollingSource` from the plugin bundle.

import type {
  ActivityEventSource,
  ActivityLayer,
  WidgetEvent,
} from '../../ui/src/components/MuxActivityWidget.types'

interface MuxSSEPayload {
  scope: 'session' | 'daemon' | 'broker'
  session_id?: string
  logical_agent_id?: string
  payload_json?: string
}

// Mux's raw Kind → widget layer.
// Spec: L0 (yellow) = messaging pulse, L1 (orange) = session state transitions,
// L2 (red) = session boundaries (created/stopped, which mux folds into state_changed).
function kindToLayer(kind: string, payload: MuxSSEPayload): ActivityLayer | null {
  // Broker / messaging pulse → L0
  if (
    kind === 'broker.envelope_created' ||
    kind === 'broker.envelope_replied' ||
    kind.startsWith('message.') ||
    kind === 'tool_call_start' ||
    kind === 'tool_call_end'
  ) {
    return 0
  }

  // Session lifecycle. Mux emits session.state_changed for every transition;
  // we use the from/to payload to distinguish "activity" (L1) from "boundary" (L2).
  if (kind === 'session.state_changed' && payload.payload_json) {
    try {
      const p = JSON.parse(payload.payload_json) as { from?: string; to?: string }
      const boundary = p.to === 'running' || p.to === 'completed' || p.to === 'failed' || p.to === 'killed'
      return boundary ? 2 : 1
    } catch {
      return 1
    }
  }

  // Daemon events are ignored for the widget (they're noisy and not per-agent).
  return null
}

interface ProxyEventDTO {
  id: number
  session_id?: string
  server: string
  tool_name: string
  duration_ms: number
  ok: boolean
  error?: string
  timestamp: string
}

interface ProxyEventListResponse {
  events: ProxyEventDTO[]
  count: number
}

// Demo-only: split proxy events across layers by server name so the visual
// has variety when the only data source is spam_proxy_events.sh.
// Distribution from the script's pool: ~50% mux, ~25% clockwork/hadron, ~15% vanta.
function serverToLayer(server: string): ActivityLayer {
  if (server === 'vanta') return 2
  if (server === 'clockwork' || server === 'hadron') return 1
  return 0
}

// Polls /proxy/events in parallel with /events/stream. Two smoothing
// behaviors to make batch polling feel live:
//   - Fast poll interval (300ms) — smaller batches, less gap between them.
//   - Per-event stagger on delivery — events within a batch are released
//     over ~spread_ms so rapid bursts visually feel like a stream instead
//     of a single teleport of pixels.
// Polls /proxy/events fast and spreads each batch across the full poll
// window, so the event stream feels continuous rather than "burst → pause".
//
// Design:
//   - Poll every 100ms (10 Hz). Server-side GET is cheap on localhost.
//   - Each batch is spread evenly across the ~100ms window: if the batch has
//     N events, each event fires at i*(100/N) ms. So event delivery is a
//     continuous rain rather than discrete clumps, regardless of batch size.
//   - For very small batches (1–2 events), apply a tiny random jitter (0–60ms)
//     so two back-to-back polls that each return one event don't land
//     predictably on 100ms boundaries (which would feel mechanical).
function startProxyEventPolling(
  listener: (event: WidgetEvent) => void,
  getCancelled: () => boolean,
  intervalMs: number = 250,
): () => void {
  // Track the highest event ID we've delivered. The server's /proxy/events
  // `since` filter is strict greater-than on *timestamp*, which drops events
  // sharing a second with our cursor. Event IDs are monotonic per the
  // daemon's ring buffer, so we dedupe by ID instead.
  let lastSeenId = -1
  let primed = false
  let timer: number | null = null
  let inFlight = false

  const poll = async () => {
    if (getCancelled() || inFlight) return
    inFlight = true
    try {
      // Rolling ~3s window keeps the query cheap but guarantees we catch
      // every event even when multiple arrive in the same wall-clock second.
      const sinceTs = new Date(Date.now() - 3000).toISOString()
      const res = await fetch(`/proxy/events?since=${encodeURIComponent(sinceTs)}&limit=500`)
      if (!res.ok) return
      const json = (await res.json()) as ProxyEventListResponse
      if (getCancelled()) return

      // First poll: snapshot the current max id but don't deliver anything.
      // Otherwise a freshly-mounted widget would replay up to 3s of history.
      if (!primed) {
        lastSeenId = json.events.reduce((m, ev) => (ev.id > m ? ev.id : m), lastSeenId)
        primed = true
        return
      }

      const fresh = json.events.filter((ev) => ev.id > lastSeenId)
      if (fresh.length === 0) return

      const n = fresh.length
      const spreadMs = Math.min(intervalMs * 0.9, intervalMs - 5)
      const perEventMs = n === 1 ? Math.random() * 60 : spreadMs / n

      fresh.forEach((ev, i) => {
        const delay = n === 1 ? perEventMs : i * perEventMs + Math.random() * (perEventMs * 0.3)
        setTimeout(() => {
          if (getCancelled()) return
          listener({
            at: Date.parse(ev.timestamp),
            // Demo-flavored split by server so all three layers animate from a
            // single proxy-event stream. Real classifier lives in the plugin's
            // adapter, not here.
            layer: serverToLayer(ev.server || 'native'),
            meta: {
              label: `${ev.server || 'native'}/${ev.tool_name}`,
              ok: ev.ok,
            },
          })
        }, delay)
      })

      // Advance the ID cursor.
      const maxId = fresh.reduce((m, ev) => (ev.id > m ? ev.id : m), lastSeenId)
      lastSeenId = maxId
    } catch {
      // swallow — next tick retries
    } finally {
      inFlight = false
    }
  }

  poll()
  timer = window.setInterval(poll, intervalMs)

  return () => {
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
  }
}

export function createMuxSSESource(url: string = '/events/stream'): ActivityEventSource {
  return {
    subscribe(listener: (event: WidgetEvent) => void) {
      let cancelled = false
      let es: EventSource | null = null

      const stopProxyPoll = startProxyEventPolling(listener, () => cancelled)

      const connect = () => {
        if (cancelled) return
        es = new EventSource(url)

        // Mux emits `event: <kind>` lines; subscribe to each known kind by name.
        // EventSource delivers everything via "message" by default only when no
        // `event:` field is set; with named events we need addEventListener per kind.
        const kinds = [
          'session.state_changed',
          'broker.envelope_created',
          'broker.envelope_replied',
          'tool_call_start',
          'tool_call_end',
          'daemon.started',
          'daemon.shutdown_started',
          'daemon.shutdown_completed',
        ]
        for (const kind of kinds) {
          es.addEventListener(kind, (ev) => {
            if (cancelled) return
            try {
              const payload = JSON.parse((ev as MessageEvent).data) as MuxSSEPayload
              const layer = kindToLayer(kind, payload)
              if (layer === null) return
              const weight = payload.payload_json && kind === 'broker.envelope_created' ? 1 : 1
              const event: WidgetEvent = {
                at: Date.now(),
                layer,
                weight,
                meta: {
                  label: payload.session_id || payload.logical_agent_id || kind,
                },
              }
              listener(event)
            } catch {
              // swallow malformed payload
            }
          })
        }

        es.onerror = () => {
          // EventSource auto-reconnects by default, so just log.
          // If the connection stays down, the widget will simply look idle.
          // eslint-disable-next-line no-console
          console.warn('[mux-sse] connection error; browser will auto-reconnect')
        }
      }

      connect()

      return () => {
        cancelled = true
        stopProxyPoll()
        es?.close()
        es = null
      }
    },
  }
}
