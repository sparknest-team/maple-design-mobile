import { colBreakpoints, isRecord } from '../col/validation'
import type { ResponsiveValue } from '../grid/types'

export const rowAligns = ['start', 'center', 'end', 'stretch'] as const
export const rowJustifies = ['start', 'center', 'end', 'space-around', 'space-between'] as const
const isDistance = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0
export const isGutterAxis = (value: unknown): boolean =>
  isDistance(value) ||
  (isRecord(value) &&
    Object.keys(value).every(
      (key) =>
        colBreakpoints.includes(key as (typeof colBreakpoints)[number]) &&
        (value[key] === undefined || isDistance(value[key])),
    ))
export const isRowGutter = (value: unknown): boolean =>
  Array.isArray(value) ? value.length === 2 && value.every(isGutterAxis) : isGutterAxis(value)
function normalizeAxis(value: unknown): number | ResponsiveValue {
  if (isDistance(value)) {
    return value
  }
  if (!isRecord(value)) {
    return 0
  }
  return Object.fromEntries(
    colBreakpoints.filter((point) => isDistance(value[point])).map((point) => [point, value[point]]),
  )
}
export const normalizeRowGutter = (value: unknown): [number | ResponsiveValue, number | ResponsiveValue] =>
  Array.isArray(value) ? [normalizeAxis(value[0]), normalizeAxis(value[1])] : [normalizeAxis(value), 0]
