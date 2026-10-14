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
export function snap(value: unknown, bounds: ReturnType<typeof sliderBounds>) {
  const { min, max, step } = bounds
  const number = numeric(value, min)
  if (number <= min) {
    return min
  }
  if (number >= max) {
    return max
  }
  return Math.min(max, Math.max(min, Number((min + Math.round((number - min) / step) * step).toFixed(12))))
}
export function sliderValues(
  value: SliderValue | undefined,
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
  const position = (value - bounds.min) / bounds.step
  const index = delta < 0 ? Math.ceil(position - 1e-10) : Math.floor(position + 1e-10)
  return snap(bounds.min + (index + delta) * bounds.step, bounds)
}
