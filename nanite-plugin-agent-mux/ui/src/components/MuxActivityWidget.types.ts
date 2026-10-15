// ui/src/components/MuxActivityWidget.types.ts

/** Wire-format event from the plugin's /activity/snapshot endpoint. See companion plugin spec §5.1. */
export interface WireActivityEvent {
  id: string
  kind: string
  timestamp: string
  session_id?: string
  actor_id?: string
  provider?: string
  summary?: string
  facets?: Record<string, string>
}

/** Layer slot in the 3-layer stacked histogram. */
export type ActivityLayer = 0 | 1 | 2

/** Widget-internal event. The adapter converts WireActivityEvent → WidgetEvent. */
export interface WidgetEvent {
  /** Unix ms. Used for the N e/s readout only — no window filtering. */
  at: number
  layer: ActivityLayer
  /** Default 1. >1 spawns N pixels, staggered. */
  weight?: number
  meta?: {
    label?: string
    ok?: boolean
  }
}

/** Per-column stacked counts: [L0 yellow, L1 orange, L2 red]. */
export type LayerCounts = [number, number, number]

/** A pixel in-flight from baseline to its target stack slot. */
export interface FlyingPixel {
  col: number
  layer: ActivityLayer
  y: number
  targetY: number
  meta?: WidgetEvent['meta']
}

/** Engine public state — visible to the render layer. */
export interface WidgetState {
  columns: LayerCounts[]
  flying: FlyingPixel[]
  lastSecondCount: number
}

/** Event source the widget subscribes to. Swappable: polling impl, mock, Storybook replay. */
export interface ActivityEventSource {
  subscribe(listener: (event: WidgetEvent) => void): () => void
}

/** Top-level React component props. */
export interface MuxActivityWidgetProps {
  /** Override default polling source — inject a mock for Storybook/tests. */
  events?: ActivityEventSource
  /** Default 21. Must be ≥ 1. */
  columns?: number
  /** Decay interval ms. Default 1500. */
  decayMs?: number
  /** Per-column probability on each decay tick. Default 0.35. */
  decayProbability?: number
}

/** Fixed palette. Do not change without updating the spec. */
export const HEAT_PALETTE: Record<ActivityLayer, string> = {
  0: '#fbbf24', // yellow — L0 messaging pulse
  1: '#fb923c', // orange — L1 session activity
  2: '#ef4444', // red — L2 session boundaries
}

/** Fixed layout constants. */
export const LAYOUT = {
  cellSize: 8,
  cellGap: 1,
  colGap: 2,
  /** cell + cellGap */
  cellPitch: 9,
  /** cell + colGap */
  colPitch: 10,
  baselineOffset: 6, // px above canvas bottom
  maxStack: 11,
  canvasWidthCss: 216,
  canvasHeightCss: 112,
  riseSpeedPxPerFrame: 3,
} as const
