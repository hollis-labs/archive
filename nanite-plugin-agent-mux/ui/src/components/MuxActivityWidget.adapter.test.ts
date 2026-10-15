import { describe, it, expect } from 'vitest'
import { adaptWireEvent } from './MuxActivityWidget.adapter'
import type { WireActivityEvent } from './MuxActivityWidget.types'

function wire(kind: string, facets?: Record<string, string>): WireActivityEvent {
  return { id: 'x', kind, timestamp: '2026-04-22T00:00:00Z', facets }
}

describe('adaptWireEvent', () => {
  it.each([
    ['message.dispatched', 0],
    ['message.delivered', 0],
    ['message.replied', 0],
    ['envelope.created', 0],
    ['envelope.replied', 0],
  ])('maps %s to L0 (messaging pulse)', (kind, layer) => {
    const result = adaptWireEvent(wire(kind))
    expect(result?.layer).toBe(layer)
    expect(result?.meta?.label).toBe(kind)
  })

  it('maps session.state to L1 with from→to label when facets present', () => {
    const result = adaptWireEvent(wire('session.state', { from: 'launching', to: 'running' }))
    expect(result?.layer).toBe(1)
    expect(result?.meta?.label).toBe('launching→running')
  })

  it('maps session.state to L1 with kind label when facets absent', () => {
    const result = adaptWireEvent(wire('session.state'))
    expect(result?.layer).toBe(1)
    expect(result?.meta?.label).toBe('session.state')
  })

  it.each([
    ['session.created', 2],
    ['session.stopped', 2],
  ])('maps %s to L2 (session boundaries)', (kind, layer) => {
    const result = adaptWireEvent(wire(kind))
    expect(result?.layer).toBe(layer)
    expect(result?.meta?.label).toBe(kind)
  })

  it('returns null for unknown kinds', () => {
    expect(adaptWireEvent(wire('unknown'))).toBeNull()
    expect(adaptWireEvent(wire('foo.bar'))).toBeNull()
  })

  it('sets at to the parsed Unix ms of the timestamp', () => {
    const result = adaptWireEvent(wire('session.created'))
    // 2026-04-22T00:00:00Z = 1776988800000 ms
    expect(result?.at).toBe(Date.parse('2026-04-22T00:00:00Z'))
  })
})
