// ui/src/components/MuxActivityWidget.render.ts
import { HEAT_PALETTE, LAYOUT, type ActivityLayer, type WidgetState } from './MuxActivityWidget.types'

const BG = '#09090b' // canvas background (matches widget body)

/** Draw one frame. Pure: does not mutate state. */
export function drawFrame(ctx: CanvasRenderingContext2D, state: WidgetState): void {
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, LAYOUT.canvasWidthCss, LAYOUT.canvasHeightCss)

  const baselineY = LAYOUT.canvasHeightCss - LAYOUT.baselineOffset

  // Settled columns
  for (let c = 0; c < state.columns.length; c++) {
    drawColumn(ctx, c, state.columns[c], baselineY)
  }

  // Flying pixels (on top)
  for (const f of state.flying) {
    ctx.fillStyle = HEAT_PALETTE[f.layer]
    const x = f.col * LAYOUT.colPitch + 2
    ctx.fillRect(x, f.y, LAYOUT.cellSize, LAYOUT.cellSize)
  }
}

function drawColumn(
  ctx: CanvasRenderingContext2D,
  col: number,
  counts: readonly [number, number, number],
  baselineY: number,
): void {
  const x = col * LAYOUT.colPitch + 2
  let slot = 0
  for (const layer of [0, 1, 2] as ActivityLayer[]) {
    const n = counts[layer]
    if (n === 0) continue
    ctx.fillStyle = HEAT_PALETTE[layer]
    for (let i = 0; i < n; i++) {
      const y = baselineY - (slot + 1) * LAYOUT.cellPitch
      ctx.fillRect(x, y, LAYOUT.cellSize, LAYOUT.cellSize)
      slot++
    }
  }
}
