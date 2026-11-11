import { toPxNum } from '../utils/elements'

const length = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(px|rem|vw|vh|vmin|vmax)?$/i
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
  if (!isDragBoundaryValue(value)) {
    return 0
  }
  if (typeof value === 'number') {
    return value
  }
  const match = length.exec((value as string).trim())!
  const resolved = toPxNum(`${Number(match[1])}${match[2]?.toLowerCase() ?? 'px'}`)
  return Number.isFinite(resolved) ? resolved : 0
}
export function isDragBoundary(value: Record<string, unknown>) {
  return ['top', 'bottom', 'left', 'right'].every((key) => value[key] === undefined || isDragBoundaryValue(value[key]))
}
