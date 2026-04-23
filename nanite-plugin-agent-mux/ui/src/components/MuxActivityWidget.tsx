// ui/src/components/MuxActivityWidget.tsx
import { useEffect, useRef, useState } from 'react'
import { Activity } from 'lucide-react'
import { WidgetShell } from './WidgetShell'
import { createEngine, type Engine } from './MuxActivityWidget.engine'
import { drawFrame } from './MuxActivityWidget.render'
import { createPollingSource } from './MuxActivityWidget.source'
import { LAYOUT, type ActivityEventSource, type MuxActivityWidgetProps } from './MuxActivityWidget.types'

const DEFAULTS = { columns: 21, decayMs: 1500, decayProbability: 0.35 } as const

export function MuxActivityWidget(props: MuxActivityWidgetProps = {}) {
  const columns = props.columns ?? DEFAULTS.columns
  const decayMs = props.decayMs ?? DEFAULTS.decayMs
  const decayProbability = props.decayProbability ?? DEFAULTS.decayProbability

  // Create (and memoize across renders) one engine and one source per mount.
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const [rate, setRate] = useState(0)

  // Resolve source once — stable across re-renders of this widget instance.
  const sourceRef = useRef<ActivityEventSource | null>(null)
  if (sourceRef.current === null) {
    sourceRef.current = props.events ?? createPollingSource()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // HiDPI: size the backing store to dpr * CSS size, scale the context.
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.floor(LAYOUT.canvasWidthCss * dpr)
    canvas.height = Math.floor(LAYOUT.canvasHeightCss * dpr)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const reducedMotion = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const engine = createEngine({ columns, reducedMotion })
    engineRef.current = engine

    // Subscribe to source.
    const source = sourceRef.current!
    const unsubscribe = source.subscribe((event) => engine.push(event))

    // Decay timer.
    const decayId = window.setInterval(() => engine.decayTick(decayProbability), decayMs)

    // rAF loop.
    let rafId = 0
    let lastRatePublish = 0
    const frame = (now: number) => {
      engine.advance()
      drawFrame(ctx, engine.snapshot())
      // Publish rate at most every ~200ms to avoid React churn every frame.
      if (now - lastRatePublish > 200) {
        setRate(engine.snapshot().lastSecondCount)
        lastRatePublish = now
      }
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      window.clearInterval(decayId)
      unsubscribe()
      engineRef.current = null
    }
  }, [columns, decayMs, decayProbability])

  return (
    <WidgetShell id="activity" title="Activity" icon={Activity}>
      {/* Retro bracket-wrapped canvas */}
      <div className="relative bg-[#09090b] rounded-sm px-1.5 pt-1 pb-1.5">
        <BracketCorners />
        <canvas
          ref={canvasRef}
          style={{ width: `${LAYOUT.canvasWidthCss}px`, height: `${LAYOUT.canvasHeightCss}px` }}
          className="block rounded-sm"
          role="img"
          aria-label="Agent Mux activity histogram"
        />
      </div>

      {/* Bracketed legend */}
      <div className="flex gap-2.5 mt-2 font-mono text-[9px] text-zinc-500 tracking-widest">
        <LegendTag color="#fbbf24" label="msg" />
        <LegendTag color="#fb923c" label="sess" />
        <LegendTag color="#ef4444" label="life" />
      </div>

      {/* Rate readout */}
      <div className="flex justify-end mt-2 font-mono text-[9px] text-zinc-500 tracking-wider">
        <span>{rate} e/s</span>
      </div>
    </WidgetShell>
  )
}

function LegendTag({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-zinc-600">[</span>
      <i className="inline-block w-1.5 h-1.5 rounded-[1px]" style={{ backgroundColor: color }} />
      <span>{label}</span>
      <span className="text-zinc-600">]</span>
    </span>
  )
}

function BracketCorners() {
  // Four small L-shapes in canvas corners. Decorative only.
  const common = 'absolute w-2 h-2 border-zinc-500'
  return (
    <>
      <span className={`${common} top-0 left-0 border-t border-l`} />
      <span className={`${common} top-0 right-0 border-t border-r`} />
      <span className={`${common} bottom-0 left-0 border-b border-l`} />
      <span className={`${common} bottom-0 right-0 border-b border-r`} />
    </>
  )
}
