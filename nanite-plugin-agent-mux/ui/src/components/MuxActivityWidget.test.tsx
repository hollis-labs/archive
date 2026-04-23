// ui/src/components/MuxActivityWidget.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MuxActivityWidget } from './MuxActivityWidget'
import type { ActivityEventSource, ActivityLayer, WidgetEvent } from './MuxActivityWidget.types'

function manualSource(): { source: ActivityEventSource; fire: (layer: ActivityLayer) => void } {
  const listeners: Array<(e: WidgetEvent) => void> = []
  return {
    source: {
      subscribe(listener) {
        listeners.push(listener)
        return () => {
          const i = listeners.indexOf(listener)
          if (i >= 0) listeners.splice(i, 1)
        }
      },
    },
    fire(layer) {
      for (const l of listeners) l({ at: Date.now(), layer, meta: { label: `fire-${layer}` } })
    },
  }
}

describe('MuxActivityWidget', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the retro frame chrome', () => {
    const { source } = manualSource()
    render(<MuxActivityWidget events={source} />)
    expect(screen.getByText(/tools|messaging|msg/i)).toBeInTheDocument()
    expect(screen.getByText(/e\/s/)).toBeInTheDocument()
  })

  it('renders a canvas element at the locked dimensions', () => {
    const { source } = manualSource()
    render(<MuxActivityWidget events={source} />)
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeTruthy()
    expect(canvas.style.width).toMatch(/216/)
    expect(canvas.style.height).toMatch(/112/)
  })

  it('subscribes on mount and unsubscribes on unmount', () => {
    let subscribed = 0
    const source: ActivityEventSource = {
      subscribe() {
        subscribed++
        return () => { subscribed-- }
      },
    }
    const { unmount } = render(<MuxActivityWidget events={source} />)
    expect(subscribed).toBe(1)
    unmount()
    expect(subscribed).toBe(0)
  })

  it('mounts and accepts events from the source without crashing', () => {
    const { source, fire } = manualSource()
    render(<MuxActivityWidget events={source} />)
    // Fire several events of each layer; component must not throw.
    expect(() => {
      fire(0); fire(0); fire(1); fire(2)
    }).not.toThrow()
    // Rate label starts at 0 (no second has rolled over yet in the engine).
    expect(screen.getByText(/0 e\/s/)).toBeInTheDocument()
  })
})

// The rate-label rollover at second boundaries is covered by the engine unit
// tests in Task 7. Testing it end-to-end through rAF + jsdom fake timers is
// brittle — rAF scheduling under jsdom is not deterministic.
