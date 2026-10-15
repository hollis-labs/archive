import { describe, it, expect, beforeEach } from 'vitest'
import { createMockContext } from '../test/canvas-mock'
import { drawFrame } from './MuxActivityWidget.render'
import { HEAT_PALETTE, LAYOUT, type WidgetState } from './MuxActivityWidget.types'

describe('drawFrame', () => {
  let ctx: ReturnType<typeof createMockContext>
  beforeEach(() => {
    ctx = createMockContext()
  })

  function emptyState(columns: number): WidgetState {
    return {
      columns: Array.from({ length: columns }, () => [0, 0, 0]),
      flying: [],
      lastSecondCount: 0,
    }
  }

  it('clears the canvas once per frame', () => {
    drawFrame(ctx, emptyState(21))
    const clears = ctx.__calls.filter((c) => c.op === 'fillRect' && c.args[0] === 0 && c.args[1] === 0)
    expect(clears.length).toBeGreaterThanOrEqual(1)
  })

  it('draws no fillRect beyond the clear when all columns are empty', () => {
    drawFrame(ctx, emptyState(21))
    const drawn = ctx.__calls.filter((c) => c.op === 'fillRect' && (c.args[0] as number) > 0)
    expect(drawn).toHaveLength(0)
  })

  it('draws correct pixel count for settled columns', () => {
    const state: WidgetState = {
      columns: Array.from({ length: 21 }, () => [0, 0, 0] as [number, number, number]),
      flying: [],
      lastSecondCount: 0,
    }
    state.columns[0] = [3, 2, 1] // 6 pixels in column 0
    drawFrame(ctx, state)
    const pixelDraws = ctx.__calls.filter((c) => c.op === 'fillRect' && (c.args[0] as number) > 0)
    expect(pixelDraws).toHaveLength(6)
  })

  it('uses HEAT_PALETTE colors', () => {
    // The render module calls ctx.fillStyle = color before fillRect. In our mock,
    // fillStyle assignments are not recorded as calls — so we verify by counting
    // distinct-color pixels indirectly via stack-layer counts.
    const state: WidgetState = {
      columns: Array.from({ length: 1 }, () => [2, 1, 0] as [number, number, number]),
      flying: [],
      lastSecondCount: 0,
    }
    // Spy on fillStyle assignments via a property descriptor.
    const observed: string[] = []
    Object.defineProperty(ctx, 'fillStyle', {
      get() { return '' },
      set(v: string) { observed.push(v) },
      configurable: true,
    })
    drawFrame(ctx, state)
    // Background clear uses its own color, then at least L0 and L1 colors appear.
    expect(observed).toContain(HEAT_PALETTE[0])
    expect(observed).toContain(HEAT_PALETTE[1])
    expect(observed).not.toContain(HEAT_PALETTE[2])
  })

  it('draws flying pixels at their current y', () => {
    const state: WidgetState = {
      columns: Array.from({ length: 21 }, () => [0, 0, 0] as [number, number, number]),
      flying: [{ col: 5, layer: 0, y: 80, targetY: 0 }],
      lastSecondCount: 0,
    }
    drawFrame(ctx, state)
    const flyingDraws = ctx.__calls.filter((c) => c.op === 'fillRect' && c.args[1] === 80)
    expect(flyingDraws).toHaveLength(1)
    const expectedX = 5 * LAYOUT.colPitch + 2
    expect(flyingDraws[0].args[0]).toBe(expectedX)
  })
})
