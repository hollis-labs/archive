import { describe, it, expect } from 'vitest'
import { fnv1a32, hashToColumn } from './MuxActivityWidget.hash'

describe('fnv1a32', () => {
  it('returns the same hash for the same input', () => {
    expect(fnv1a32('hello')).toBe(fnv1a32('hello'))
  })

  it('returns different hashes for different inputs', () => {
    expect(fnv1a32('session.created')).not.toBe(fnv1a32('session.stopped'))
  })

  it('empty string has a well-known offset basis', () => {
    expect(fnv1a32('')).toBe(0x811c9dc5)
  })
})

describe('hashToColumn', () => {
  it('deterministically maps a label to a column in [0, columns)', () => {
    const col = hashToColumn('session.created', 21)
    expect(col).toBeGreaterThanOrEqual(0)
    expect(col).toBeLessThan(21)
    expect(hashToColumn('session.created', 21)).toBe(col)
  })

  it('spreads common kind strings across multiple columns', () => {
    const labels = [
      'session.created', 'session.state', 'session.stopped',
      'message.dispatched', 'message.delivered', 'message.replied',
      'envelope.created', 'envelope.replied',
    ]
    const cols = new Set(labels.map((l) => hashToColumn(l, 21)))
    expect(cols.size).toBeGreaterThanOrEqual(6) // not all collapsing to one bucket
  })
})
