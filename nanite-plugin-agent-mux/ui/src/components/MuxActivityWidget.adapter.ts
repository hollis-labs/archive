import type { ActivityLayer, WidgetEvent, WireActivityEvent } from './MuxActivityWidget.types'

/**
 * Map a wire `ActivityEvent` to the widget's internal `WidgetEvent`,
 * or null when the kind is not something the widget should render.
 *
 * Layer assignments (locked by spec §"Default layer mapping"):
 *   L0 yellow — message.* + envelope.*  (high-frequency baseline pulse)
 *   L1 orange — session.state            (moderate — lifecycle transitions)
 *   L2 red    — session.created | session.stopped (rare — boundaries)
 */
export function adaptWireEvent(ev: WireActivityEvent): WidgetEvent | null {
  const layer = kindToLayer(ev.kind)
  if (layer === null) return null

  const label = ev.kind === 'session.state' && ev.facets?.from && ev.facets?.to
    ? `${ev.facets.from}→${ev.facets.to}`
    : ev.kind

  return {
    at: Date.parse(ev.timestamp),
    layer,
    meta: { label },
  }
}

function kindToLayer(kind: string): ActivityLayer | null {
  switch (kind) {
    case 'message.dispatched':
    case 'message.delivered':
    case 'message.replied':
    case 'envelope.created':
    case 'envelope.replied':
      return 0
    case 'session.state':
      return 1
    case 'session.created':
    case 'session.stopped':
      return 2
    default:
      return null
  }
}
