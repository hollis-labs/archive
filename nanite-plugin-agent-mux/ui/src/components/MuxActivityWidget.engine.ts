// ui/src/components/MuxActivityWidget.engine.ts
import { hashToColumn } from './MuxActivityWidget.hash'
import { LAYOUT, type FlyingPixel, type LayerCounts, type WidgetEvent, type WidgetState } from './MuxActivityWidget.types'

export interface EngineOptions {
  columns: number
  /** For deterministic tests. Defaults to Math.random. */
  rng?: () => number
  /** For deterministic tests. Defaults to performance.now. */
  now?: () => number
}

export interface Engine {
  push(event: WidgetEvent): void
  advance(): void
  decayTick(probability: number): void
  snapshot(): WidgetState
  peekEventsThisSecond(): number
}

export function createEngine(opts: EngineOptions): Engine {
  const columns = opts.columns
  const rng = opts.rng ?? Math.random
  const now = opts.now ?? (() => performance.now())

  const settled: LayerCounts[] = Array.from({ length: columns }, () => [0, 0, 0])
  const flying: FlyingPixel[] = []
  const baselineY = LAYOUT.canvasHeightCss - LAYOUT.baselineOffset

  let eventsThisSecond = 0
  let lastSecondCount = 0
  let lastSecondBoundary = Math.floor(now() / 1000)

  function colFor(event: WidgetEvent): number {
    const label = event.meta?.label
    return label ? hashToColumn(label, columns) : Math.floor(rng() * columns)
  }

  function projectedStack(col: number): number {
    const s = settled[col]
    const inFlight = flying.reduce((n, f) => (f.col === col ? n + 1 : n), 0)
    return s[0] + s[1] + s[2] + inFlight
  }

  function targetYFor(col: number, layer: number): number {
    // absSlot counts cells below the new pixel in the full stack.
    const s = settled[col]
    const belowLayers = layer === 0 ? 0 : layer === 1 ? s[0] : s[0] + s[1]
    // Flying pixels that belong to this column/layer have already claimed slots.
    const inFlightSameLayer = flying.reduce(
      (n, f) => (f.col === col && f.layer === layer ? n + 1 : n),
      0,
    )
    // Pixels in layers *below* this one that are flying also raise our slot.
    const inFlightBelow = flying.reduce(
      (n, f) => (f.col === col && f.layer < layer ? n + 1 : n),
      0,
    )
    const absSlot = belowLayers + inFlightBelow + inFlightSameLayer + s[layer]
    return baselineY - (absSlot + 1) * LAYOUT.cellPitch
  }

  return {
    push(event) {
      eventsThisSecond++
      const col = colFor(event)
      const count = Math.max(1, event.weight ?? 1)
      const headroom = LAYOUT.maxStack - projectedStack(col)
      const spawn = Math.max(0, Math.min(count, headroom))
      for (let i = 0; i < spawn; i++) {
        const targetY = targetYFor(col, event.layer)
        flying.push({
          col,
          layer: event.layer,
          y: baselineY,
          targetY,
          meta: event.meta,
        })
      }
    },

    advance() {
      for (let i = flying.length - 1; i >= 0; i--) {
        const f = flying[i]
        f.y -= LAYOUT.riseSpeedPxPerFrame
        if (f.y <= f.targetY) {
          settled[f.col][f.layer]++
          flying.splice(i, 1)
        }
      }
      // Events/sec rollover is tested separately in Task 7.
      const currentSecond = Math.floor(now() / 1000)
      if (currentSecond !== lastSecondBoundary) {
        lastSecondCount = eventsThisSecond
        eventsThisSecond = 0
        lastSecondBoundary = currentSecond
      }
    },

    decayTick(probability) {
      for (let c = 0; c < columns; c++) {
        if (settled[c][0] + settled[c][1] + settled[c][2] === 0) continue
        if (rng() < probability) {
          if (settled[c][2] > 0) settled[c][2]--
          else if (settled[c][1] > 0) settled[c][1]--
          else if (settled[c][0] > 0) settled[c][0]--
        }
      }
    },

    snapshot() {
      return { columns: settled, flying, lastSecondCount }
    },

    peekEventsThisSecond() {
      return eventsThisSecond
    },
  }
}
