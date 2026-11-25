import { toPxNum } from '../utils/elements'

const length = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(px|rem|vw|vh|vmin|vmax)?$/i
export const boundarySides = ['top', 'bottom', 'left', 'right'] as const
export const isDragAxis = (value: unknown): value is 'x' | 'y' | 'xy' =>
  value === 'x' || value === 'y' || value === 'xy'
export function isDragBoundaryValue(value: unknown) {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }
  const match = typeof value === 'string' ? length.exec(value.trim()) : undefined
  return !!match && Number.isFinite(Number(match[1]))
}
export function dragBoundaryValue(value: unknown) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0
  }
  const match = typeof value === 'string' && length.exec(value.trim())
  if (!match) {
    return 0
  }
  const amount = Number(match[1])
  if (!Number.isFinite(amount)) {
    return 0
  }
  const resolved = toPxNum(`${amount}${match[2]?.toLowerCase() ?? 'px'}`)
  return Number.isFinite(resolved) ? resolved : 0
}
export function isDragBoundary(value: Record<string, unknown>) {
  return boundarySides.every((key) => value[key] === undefined || isDragBoundaryValue(value[key]))
}
