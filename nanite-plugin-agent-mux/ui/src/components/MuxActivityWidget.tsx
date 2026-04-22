import { useEffect, useRef, useState } from 'react'

type ActivityEvent = {
  id: string
  kind: string
  timestamp: string
  session_id?: string
  actor_id?: string
  provider?: string
  summary?: string
  facets?: Record<string, string>
}

type Snapshot = {
  events: ActivityEvent[]
  cursor: string
  drops: number
}

const SNAPSHOT_URL = '/api/plugins/agent-mux/activity/snapshot'
const POLL_INTERVAL_MS = 1000
const MAX_RENDERED = 64 // cap in-memory buffer for the waterfall

export function MuxActivityWidget() {
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const cursorRef = useRef<string>('')

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      const q = cursorRef.current ? `?since=${encodeURIComponent(cursorRef.current)}` : ''
      try {
        const res = await fetch(`${SNAPSHOT_URL}${q}`)
        if (!res.ok) return
        const snap = (await res.json()) as Snapshot
        if (cancelled) return
        if (snap.events.length > 0) {
          setEvents((prev) => [...prev, ...snap.events].slice(-MAX_RENDERED))
        }
        cursorRef.current = snap.cursor
      } catch {
        // swallow — next tick retries
      }
    }

    poll() // initial fetch
    const id = setInterval(poll, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  // Placeholder rendering. Replaced by the real visual widget in the
  // follow-on frontend plan (docs/superpowers/plans/2026-04-22-activity-widget.md).
  // The data contract — what it fetches, how it stores events — stays stable.
  return (
    <div data-testid="mux-activity-events">
      {events.map((ev) => (
        <div key={ev.id}>{ev.kind}</div>
      ))}
    </div>
  )
}
