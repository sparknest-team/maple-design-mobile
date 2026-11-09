import { colBreakpoints, isRecord } from '../col/validation'
import type { ResponsiveValue } from './types'

export const isGridScalar = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)
export const isGridResponsive = (value: unknown): boolean =>
  isGridScalar(value) ||
  (isRecord(value) &&
    Object.keys(value).every(
      (key) =>
        colBreakpoints.includes(key as (typeof colBreakpoints)[number]) &&
        (value[key] === undefined || isGridScalar(value[key])),
    ))
export const normalizeGridScalar = (value: unknown, fallback: number): number =>
  isGridScalar(value) ? value : fallback
export function normalizeGridResponsive(value: unknown, fallback: number): number | ResponsiveValue {
  if (isGridScalar(value)) {
    return value
  }
  if (!isRecord(value)) {
    return fallback
  }
  return Object.fromEntries(
    colBreakpoints.filter((point) => isGridScalar(value[point])).map((point) => [point, value[point]]),
  )
}
export const resolveGridCols = (value: unknown): number => Math.max(1, Math.floor(normalizeGridScalar(value, 24)) || 1)
export const resolveGridRows = (value: unknown): number => Math.max(1, Math.floor(normalizeGridScalar(value, 1)) || 1)
