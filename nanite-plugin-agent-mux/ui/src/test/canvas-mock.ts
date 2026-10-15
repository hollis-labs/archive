// Minimal CanvasRenderingContext2D stand-in. Records every draw call
// so tests can assert "drew N rects at (x,y) with color c".
export interface RecordedCall {
  op: string
  args: unknown[]
}

let installed = false

export function installCanvasMock() {
  if (installed) return
  installed = true
  const originalGetContext = HTMLCanvasElement.prototype.getContext

  // @ts-expect-error — intentionally replacing the native signature.
  HTMLCanvasElement.prototype.getContext = function (type: string) {
    if (type !== '2d') return originalGetContext.call(this, type as '2d')
    return createMockContext()
  }
}

export function createMockContext() {
  const calls: RecordedCall[] = []
  const rec = (op: string) => (...args: unknown[]) => { calls.push({ op, args }) }

  const ctx = {
    // State we care about
    fillStyle: '#000',
    globalAlpha: 1,
    // Methods we record
    fillRect: rec('fillRect'),
    clearRect: rec('clearRect'),
    fillText: rec('fillText'),
    beginPath: rec('beginPath'),
    arc: rec('arc'),
    fill: rec('fill'),
    scale: rec('scale'),
    save: rec('save'),
    restore: rec('restore'),
    translate: rec('translate'),
    setTransform: rec('setTransform'),
    // Accessors so tests can read back the calls
    __calls: calls,
    __clear: () => { calls.length = 0 },
  }
  return ctx as unknown as CanvasRenderingContext2D & { __calls: RecordedCall[]; __clear: () => void }
}
