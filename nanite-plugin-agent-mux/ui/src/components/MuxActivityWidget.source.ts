// ui/src/components/MuxActivityWidget.source.ts
import { adaptWireEvent } from './MuxActivityWidget.adapter'
import type { ActivityEventSource, WidgetEvent, WireActivityEvent } from './MuxActivityWidget.types'

export interface PollingSourceOptions {
  /** Endpoint path. Default: /api/plugins/agent-mux/activity/snapshot */
  url?: string
  /** Poll interval. Default: 250ms — fast enough to feel SSE-like while cheap over loopback. */
  pollMs?: number
  /**
   * Spread each batch's events over ~this many ms so pixels rise as a
   * continuous stream instead of teleporting on every poll. Default 200ms
   * (roughly matches pollMs so the stream is always active). Set to 0 for
   * deterministic tests.
   */
  staggerMs?: number
}

interface Snapshot {
  events: WireActivityEvent[]
  cursor: string
  drops: number
}

export function createPollingSource(opts: PollingSourceOptions = {}): ActivityEventSource {
  const url = opts.url ?? '/api/plugins/agent-mux/activity/snapshot'
  const pollMs = opts.pollMs ?? 250
  const staggerMs = opts.staggerMs ?? 200

  return {
    subscribe(listener: (event: WidgetEvent) => void) {
      let cursor = ''
      let cancelled = false
      let inFlight = false

      const poll = async () => {
        if (cancelled || inFlight) return
        inFlight = true
        const q = cursor ? `?since=${encodeURIComponent(cursor)}` : ''
        try {
          const res = await fetch(`${url}${q}`)
          if (!res.ok) return
          const snap = (await res.json()) as Snapshot
          if (cancelled) return

          // Implements spec §"Batched arrival": spread events over `staggerMs`
          // so bursts rise as a wave rather than a teleport. At staggerMs=0
          // delivery is synchronous (used for deterministic unit tests).
          const adapted: WidgetEvent[] = []
          for (const wire of snap.events) {
            const a = adaptWireEvent(wire)
            if (a) adapted.push(a)
          }
          if (staggerMs === 0 || adapted.length <= 1) {
            for (const ev of adapted) listener(ev)
          } else {
            const perEvent = staggerMs / adapted.length
            adapted.forEach((ev, i) => {
              setTimeout(() => {
                if (cancelled) return
                listener(ev)
              }, i * perEvent)
            })
          }

          cursor = snap.cursor
        } catch {
          // swallow — next tick retries
        } finally {
          inFlight = false
        }
      }

      // Initial poll (fire-and-forget; interval picks up from there).
      poll()
      const id = setInterval(poll, pollMs)

      return () => {
        cancelled = true
        clearInterval(id)
      }
    },
  }
}
