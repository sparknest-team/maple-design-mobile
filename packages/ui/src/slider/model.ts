import { Decimal } from 'decimal.js'
import type { SliderValue } from './props'

export function numeric(value: unknown, fallback: number) {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return fallback
  }
  if (typeof value === 'string' && !/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim())) {
    return fallback
  }
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}
export function sliderBounds(min: unknown, max: unknown, step: unknown) {
  const lower = numeric(min, 0)
  return { min: lower, max: Math.max(lower, numeric(max, 100)), step: Math.max(0, numeric(step, 1)) || 1 }
}
// Private Number-domain grid math, independent of application Decimal settings.
const GridDecimal = Decimal.clone({ precision: 650, rounding: Decimal.ROUND_HALF_UP, minE: -1000, maxE: 1000 })
type Bounds = ReturnType<typeof sliderBounds>
function gridIndex(value: number, bounds: Bounds) {
  const offset = new GridDecimal(value).minus(bounds.min)
  const floor = offset.dividedToIntegerBy(bounds.step)
  const remainder = offset.minus(floor.times(bounds.step))
  return {
    floor,
    ceil: remainder.isZero() ? floor : floor.plus(1),
    nearest: remainder.times(2).gte(bounds.step) ? floor.plus(1) : floor,
  }
}
function atIndex(index: Decimal, bounds: Bounds) {
  return new GridDecimal(bounds.min).plus(index.times(bounds.step)).toNumber()
}
export function snap(value: unknown, bounds: ReturnType<typeof sliderBounds>) {
  const { min, max } = bounds
  const number = numeric(value, min)
  if (number <= min) {
    return min
  }
  if (number >= max) {
    return max
  }
  return Math.min(max, Math.max(min, atIndex(gridIndex(number, bounds).nearest, bounds)))
}
export function sliderValues(
  value: SliderValue | null | undefined,
  range: boolean,
  bounds: ReturnType<typeof sliderBounds>,
): [number, number] {
  if (!range) {
    return [bounds.min, snap(Array.isArray(value) ? value[1] : value, bounds)]
  }
  const pair = Array.isArray(value) ? value : [bounds.min, value]
  const start = snap(pair[0], bounds),
    end = snap(pair[1], bounds)
  return start <= end ? [start, end] : [end, start]
}

export function stepValue(value: number, delta: number, bounds: ReturnType<typeof sliderBounds>) {
  const number = Math.min(bounds.max, Math.max(bounds.min, numeric(value, bounds.min)))
  const grid = gridIndex(number, bounds)
  // Recognize a grid point after conversion back to a representable Number.
  const index = atIndex(grid.nearest, bounds) === number ? grid.nearest : delta < 0 ? grid.ceil : grid.floor
  return snap(atIndex(index.plus(delta), bounds), bounds)
}
