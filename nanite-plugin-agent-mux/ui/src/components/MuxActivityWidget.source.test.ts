// ui/src/components/MuxActivityWidget.source.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPollingSource } from './MuxActivityWidget.source'
import type { WidgetEvent } from './MuxActivityWidget.types'

describe('createPollingSource', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  function mockFetchOnce(events: Array<{ id: string; kind: string; timestamp: string }>) {
    return vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ events, cursor: events[events.length - 1]?.id ?? '', drops: 0 }),
    })
  }

  function installFetch(mock: ReturnType<typeof vi.fn>) {
    globalThis.fetch = mock as unknown as typeof fetch
  }

  it('delivers adapted widget events to the listener on poll', async () => {
    installFetch(mockFetchOnce([
      { id: '1', kind: 'session.created', timestamp: '2026-04-22T00:00:00Z' },
    ]))

    const received: WidgetEvent[] = []
    const source = createPollingSource({ pollMs: 1000 })
    const unsubscribe = source.subscribe((e: WidgetEvent) => received.push(e))

    await vi.runOnlyPendingTimersAsync()
    await Promise.resolve() // flush microtasks from the fetch promise

    expect(received).toHaveLength(1)
    expect(received[0].layer).toBe(2) // session.created → L2
    unsubscribe()
  })

  it('drops unknown wire kinds silently', async () => {
    installFetch(mockFetchOnce([
      { id: '1', kind: 'unknown', timestamp: '2026-04-22T00:00:00Z' },
      { id: '2', kind: 'session.created', timestamp: '2026-04-22T00:00:01Z' },
    ]))

    const received: WidgetEvent[] = []
    const source = createPollingSource({ pollMs: 1000 })
    source.subscribe((e: WidgetEvent) => received.push(e))

    await vi.runOnlyPendingTimersAsync()
    await Promise.resolve()

    expect(received).toHaveLength(1) // only session.created passes through
  })

  it('stops polling after unsubscribe', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ events: [], cursor: '', drops: 0 }),
    })
    installFetch(fetchMock)

    const source = createPollingSource({ pollMs: 1000 })
    const unsubscribe = source.subscribe(() => {})

    await vi.runOnlyPendingTimersAsync() // first poll
    const firstCallCount = fetchMock.mock.calls.length
    unsubscribe()
    vi.advanceTimersByTime(5000) // would have polled 5 more times if still subscribed
    await Promise.resolve()

    expect(fetchMock.mock.calls.length).toBe(firstCallCount)
  })

  it('sends since=<cursor> on subsequent polls', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: [{ id: '42', kind: 'session.created', timestamp: '2026-04-22T00:00:00Z' }], cursor: '42', drops: 0 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: [], cursor: '42', drops: 0 }),
      })
    installFetch(fetchMock)

    const source = createPollingSource({ pollMs: 1000 })
    source.subscribe(() => {})

    await vi.runOnlyPendingTimersAsync() // initial poll — no since
    await Promise.resolve()
    vi.advanceTimersByTime(1000)
    await vi.runOnlyPendingTimersAsync() // second poll — since=42
    await Promise.resolve()

    expect(fetchMock.mock.calls[1][0]).toContain('since=42')
  })
})
