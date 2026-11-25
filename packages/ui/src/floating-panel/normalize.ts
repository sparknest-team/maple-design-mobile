export const isPanelHeight = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0
export const isPanelDuration = (value: unknown) =>
  (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) &&
  Number.isFinite(Number(value)) &&
  Number(value) >= 0
export const panelDuration = (value: unknown) => (isPanelDuration(value) ? Number(value) : 300)
export function panelAnchors(values: readonly number[] | undefined, viewportHeight: () => number) {
  const valid = Array.isArray(values) ? values.filter(isPanelHeight) : []
  if (valid.length) {
    return [...new Set(valid)]
  }
  const height = viewportHeight()
  return [...new Set([100, isPanelHeight(height) ? height * 0.6 : 100])]
}
export function nearestPanelAnchor(value: unknown, anchors: readonly number[]) {
  const target = isPanelHeight(value) ? value : Math.min(...anchors)
  return anchors.reduce((nearest, anchor) =>
    Math.abs(anchor - target) < Math.abs(nearest - target) ? anchor : nearest,
  )
}
