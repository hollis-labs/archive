/** FNV-1a 32-bit hash. Fast, dependency-free, good distribution for short strings. */
export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5 // offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    // Multiply by FNV prime (16777619) and coerce to 32-bit unsigned.
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash >>> 0
}

/** Map a label to a column index deterministically. columns must be > 0. */
export function hashToColumn(label: string, columns: number): number {
  return fnv1a32(label) % columns
}
