import { createRoot } from 'react-dom/client'
import { createElement, StrictMode } from 'react'
import { MuxActivityWidget } from '../../ui/src/components/MuxActivityWidget'
import { createMuxSSESource } from './mux-sse-source'
import './index.css'

const source = createMuxSSESource()

// Demo tuning: faster + harder decay so high-rate bursts (multiple
// spam_proxy_events.sh instances, --rate 20+) stay visible instead of
// saturating the stack. Plugin defaults (0.35 / 1500ms) stay conservative.
const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    createElement(StrictMode, null,
      createElement(MuxActivityWidget, {
        events: source,
        // Tuned for ~60 e/s arrival (~2.9/col/sec across 21 cols).
        // Decay rate ~3.5/col/sec keeps headroom so bursts show as spikes
        // above a ~3px baseline instead of saturating at max.
        decayMs: 200,
        decayProbability: 0.7,
      }),
    ),
  )
}
