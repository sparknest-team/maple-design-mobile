export function normalizeIndex(value: number, length: number, loop = false) {
  if (!length || !Number.isFinite(value)) {
    return 0
  }
  const index = Math.trunc(value)
  return loop ? ((index % length) + length) % length : Math.max(0, Math.min(index, length - 1))
}

export function carouselLayout(
  viewport: number,
  count: number,
  perView: number | 'auto',
  gap: number,
  measured: number[],
) {
  const views = perView === 'auto' ? 1 : Number.isFinite(perView) && perView > 0 ? perView : 1
  const width = Math.max(0, (viewport - gap * (views - 1)) / views)
  const sizes = Array.from({ length: count }, (_, index) => (perView === 'auto' ? measured[index] || viewport : width))
  let position = 0
  const offsets = sizes.map((size) => {
    const offset = position
    position += size + gap
    return offset
  })
  return { sizes, offsets, total: Math.max(0, position - gap) }
}

export function slideOffset(
  layout: ReturnType<typeof carouselLayout>,
  index: number,
  viewport: number,
  centered: boolean,
) {
  const offset = layout.offsets[index] || 0
  return centered
    ? offset - (viewport - (layout.sizes[index] || viewport)) / 2
    : Math.min(offset, Math.max(0, layout.total - viewport))
}

export function visibleSlides(
  layout: ReturnType<typeof carouselLayout>,
  offset: number,
  viewport: number,
  current: number,
) {
  if (!viewport) {
    return [current]
  }
  return layout.offsets.flatMap((start, index) =>
    start < offset + viewport - 0.5 && start + layout.sizes[index]! > offset + 0.5 ? [index] : [],
  )
}

/** A slide cannot fill two disconnected pieces of the union without cloning its instance. */
export function requiresSlideClone(
  layout: ReturnType<typeof carouselLayout>,
  from: number,
  to: number,
  viewport: number,
  cycle: number,
) {
  if (!cycle) {
    return false
  }
  const low = Math.min(from, to)
  const high = Math.max(from, to) + viewport
  return layout.offsets.some((start, index) => {
    const firstCycle = Math.ceil((low - start - layout.sizes[index]! + 0.5) / cycle)
    return start + (firstCycle + 1) * cycle < high - 0.5
  })
}
