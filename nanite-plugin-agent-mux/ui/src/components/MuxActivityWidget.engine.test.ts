// ui/src/components/MuxActivityWidget.engine.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { createEngine, type Engine } from './MuxActivityWidget.engine'
import type { WidgetEvent } from './MuxActivityWidget.types'

function ev(overrides: Partial<WidgetEvent> = {}): WidgetEvent {
  return { at: 1000, layer: 0, meta: { label: 'message.dispatched' }, ...overrides }
}

describe('engine — state', () => {
  let engine: Engine
  beforeEach(() => {
    engine = createEngine({ columns: 21 })
  })

  it('starts with empty columns', () => {
    const snap = engine.snapshot()
    expect(snap.columns).toHaveLength(21)
    for (const c of snap.columns) expect(c).toEqual([0, 0, 0])
    expect(snap.flying).toHaveLength(0)
    expect(snap.lastSecondCount).toBe(0)
  })
})

describe('engine — ingress', () => {
  let engine: Engine
  beforeEach(() => {
    engine = createEngine({ columns: 21 })
  })

  it('push spawns one flying pixel for an event with no weight', () => {
    engine.push(ev({ meta: { label: 'message.dispatched' } }))
    expect(engine.snapshot().flying).toHaveLength(1)
  })

  it('push spawns `weight` flying pixels when weight > 1', () => {
    engine.push(ev({ weight: 5, meta: { label: 'message.dispatched' } }))
    expect(engine.snapshot().flying).toHaveLength(5)
  })

  it('assigns the same column for events with the same label', () => {
    engine.push(ev({ meta: { label: 'message.dispatched' } }))
    engine.push(ev({ meta: { label: 'message.dispatched' } }))
    const flying = engine.snapshot().flying
    expect(flying[0].col).toBe(flying[1].col)
  })

  it('caps at maxStack per column — drops over-cap pixels', () => {
    // maxStack is 11 per LAYOUT. Push 20 events with the same label.
    for (let i = 0; i < 20; i++) engine.push(ev({ meta: { label: 'same-label' } }))
    const flying = engine.snapshot().flying
    // All 20 events count for the rate readout, but only 11 are spawned as pixels.
    expect(flying.length).toBeLessThanOrEqual(11)
    expect(engine.peekEventsThisSecond()).toBe(20)
  })

  it('increments eventsThisSecond once per source event regardless of weight', () => {
    engine.push(ev({ weight: 3, meta: { label: 'a' } }))
    expect(engine.peekEventsThisSecond()).toBe(1)
    engine.push(ev({ weight: 7, meta: { label: 'b' } }))
    expect(engine.peekEventsThisSecond()).toBe(2)
  })

  it('advance moves flying pixels upward by riseSpeed per call', () => {
    engine.push(ev({ meta: { label: 'only-one' } }))
    const before = engine.snapshot().flying[0].y
    engine.advance()
    const after = engine.snapshot().flying[0].y
    expect(before - after).toBe(3) // LAYOUT.riseSpeedPxPerFrame
  })

  it('advance lands a flying pixel on the column when y reaches targetY', () => {
    engine.push(ev({ meta: { label: 'landing-test' } }))
    // Advance enough frames to land.
    for (let i = 0; i < 50; i++) engine.advance()
    const snap = engine.snapshot()
    expect(snap.flying).toHaveLength(0)
    const landed = snap.columns.find((c) => c[0] === 1)
    expect(landed).toBeDefined()
  })
})

describe('engine — decay', () => {
  it('decayTick with probability 1 removes one pixel from every non-empty column', () => {
    // Seed a deterministic rng that always returns 0 (so "< probability" always fires).
    const rng = () => 0
    const engine = createEngine({ columns: 3, rng })
    // Manually seed settled counts by pushing events and landing them.
    for (let i = 0; i < 6; i++) engine.push({ at: 0, layer: 0, meta: { label: `col-${i % 3}` } })
    for (let i = 0; i < 60; i++) engine.advance() // land everything
    const beforeTotal = engine.snapshot().columns.reduce((s, c) => s + c[0] + c[1] + c[2], 0)

    engine.decayTick(1.0)

    const afterTotal = engine.snapshot().columns.reduce((s, c) => s + c[0] + c[1] + c[2], 0)
    const nonEmpty = engine.snapshot().columns.filter((c) => c[0] + c[1] + c[2] > 0).length
    // Each non-empty column loses exactly one; empty columns lose zero.
    expect(beforeTotal - afterTotal).toBe(nonEmpty > 0 ? nonEmpty : 0)
  })

  it('decayTick removes from the top layer first (L2 → L1 → L0)', () => {
    const engine = createEngine({ columns: 1 })
    // All events go to col 0 because columns=1.
    engine.push({ at: 0, layer: 0 })
    engine.push({ at: 0, layer: 1 })
    engine.push({ at: 0, layer: 2 })
    for (let i = 0; i < 60; i++) engine.advance()
    expect(engine.snapshot().columns[0]).toEqual([1, 1, 1])

    engine.decayTick(1.0)
    expect(engine.snapshot().columns[0]).toEqual([1, 1, 0]) // L2 lost

    engine.decayTick(1.0)
    expect(engine.snapshot().columns[0]).toEqual([1, 0, 0]) // L1 lost

    engine.decayTick(1.0)
    expect(engine.snapshot().columns[0]).toEqual([0, 0, 0]) // L0 lost

    engine.decayTick(1.0)
    expect(engine.snapshot().columns[0]).toEqual([0, 0, 0]) // no-op on empty
  })

  it('decayTick with probability 0 removes nothing', () => {
    const engine = createEngine({ columns: 1, rng: () => 0 })
    engine.push({ at: 0, layer: 0 })
    for (let i = 0; i < 60; i++) engine.advance()
    const before = engine.snapshot().columns[0][0]

    engine.decayTick(0)

    expect(engine.snapshot().columns[0][0]).toBe(before)
  })
})
