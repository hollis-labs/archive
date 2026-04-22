import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MuxActivityWidget } from './MuxActivityWidget'

describe('MuxActivityWidget', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        events: [{ id: '1', kind: 'session.created', timestamp: '2026-04-22T00:00:00Z' }],
        cursor: '1',
        drops: 0,
      }),
    }) as unknown as typeof fetch
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('polls the snapshot endpoint on mount', async () => {
    render(<MuxActivityWidget />)
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled())
    const call = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string
    expect(call).toContain('/api/plugins/agent-mux/activity/snapshot')
  })

  it('renders an event after the first poll', async () => {
    render(<MuxActivityWidget />)
    await waitFor(() =>
      expect(screen.getByTestId('mux-activity-events')).toHaveTextContent('session.created'),
    )
  })
})
