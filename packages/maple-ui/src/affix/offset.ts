import { toPxNum } from '../utils/elements'

const numeric = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i
const jsOffset = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(px|rem|vw|vh|vmin|vmax)?$/i
export function isAffixOffset(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }
  if (typeof value !== 'string' || !value.trim() || /^[+-]?(?:NaN|Infinity)$/i.test(value.trim())) {
    return false
  }
  return !numeric.test(value.trim()) || Number.isFinite(Number(value))
}
export function isJsAffixOffset(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }
  const match = typeof value === 'string' ? jsOffset.exec(value.trim()) : undefined
  return !!match && Number.isFinite(Number(match[1]))
}
export function readAffixOffset(value: unknown): number {
  if (!isJsAffixOffset(value)) {
    return 0
  }
  if (typeof value === 'number') {
    return value
  }
  const match = jsOffset.exec((value as string).trim())!
  const resolved = toPxNum(`${Number(match[1])}${match[2]?.toLowerCase() ?? 'px'}`)
  return Number.isFinite(resolved) ? resolved : 0
}
export function toCssAffixOffset(value: unknown): string | undefined {
  if (!isAffixOffset(value)) {
    return undefined
  }
  return typeof value === 'number' || numeric.test((value as string).trim()) ? `${Number(value)}px` : (value as string)
}
