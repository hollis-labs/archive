// ui/src/components/MuxActivityWidget.source.ts
import { adaptWireEvent } from './MuxActivityWidget.adapter'
import type { ActivityEventSource, WidgetEvent, WireActivityEvent } from './MuxActivityWidget.types'

export interface PollingSourceOptions {
  /** Endpoint path. Default: /api/plugins/agent-mux/activity/snapshot */
  url?: string
  /** Poll interval. Default: 1000ms. */
  pollMs?: number
}

interface Snapshot {
  events: WireActivityEvent[]
  cursor: string
  drops: number
}

export function createPollingSource(opts: PollingSourceOptions = {}): ActivityEventSource {
  const url = opts.url ?? '/api/plugins/agent-mux/activity/snapshot'
  const pollMs = opts.pollMs ?? 1000

  return {
    subscribe(listener: (event: WidgetEvent) => void) {
      let cursor = ''
      let cancelled = false

      const poll = async () => {
        if (cancelled) return
        const q = cursor ? `?since=${encodeURIComponent(cursor)}` : ''
        try {
          const res = await fetch(`${url}${q}`)
          if (!res.ok) return
          const snap = (await res.json()) as Snapshot
          if (cancelled) return
          // v1 deferred: spec §"Batched arrival" calls for ≤20ms per-event stagger
          // so large bursts rise as a wave rather than a teleport. At v0.1 event
          // volumes this isn't visible; revisit if batch sizes grow.
          for (const wire of snap.events) {
            const adapted = adaptWireEvent(wire)
            if (adapted) listener(adapted)
          }
          cursor = snap.cursor
        } catch {
          // swallow — next tick retries
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
