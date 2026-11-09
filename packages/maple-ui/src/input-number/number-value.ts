export function isValidNumberMin(value: unknown): value is number {
  return typeof value === 'number' && (Number.isFinite(value) || value === -Infinity)
}
export function isValidNumberMax(value: unknown): value is number {
  return typeof value === 'number' && (Number.isFinite(value) || value === Infinity)
}
export function resolveNumberBounds(min: unknown, max: unknown): { min: number; max: number } {
  const lower = isValidNumberMin(min) ? min : -Infinity
  const upper = isValidNumberMax(max) ? max : Infinity
  return lower <= upper ? { min: lower, max: upper } : { min: -Infinity, max: Infinity }
}

/** Numeric text is parsed once, before formatting the display value. */
export function isIntermediateValue(value: string) {
  return value === '' || value === '-' || value === '.' || value === '-.' || /^-?\d+\.$/.test(value)
}

export function parseNumberInput(value: string, parser?: (value: string) => string) {
  const text = parser?.(value.trim().replace(/。/g, '.')) ?? value.trim().replace(/。/g, '.')
  const intermediate = isIntermediateValue(text)
  const parsed = intermediate ? undefined : Number(text)
  return {
    text,
    intermediate,
    number: typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : undefined,
  }
}

/** Include the exponent: 1.2e-7 requires eight decimal places. */
export function getNumberPrecision(step: number, precision?: number) {
  if (precision === undefined || !Number.isFinite(precision)) {
    return undefined
  }
  const [coefficient, exponent = '0'] = String(step).toLowerCase().split('e')
  const decimals = coefficient.split('.')[1]?.length ?? 0
  return Math.min(100, Math.max(0, Math.trunc(precision), decimals - Number(exponent)))
}

export function clampNumber(value: number | null | undefined, min: number, max: number) {
  if (value == null || !Number.isFinite(value)) {
    return undefined
  }
  const bounds = resolveNumberBounds(min, max)
  return Math.min(bounds.max, Math.max(bounds.min, value))
}

/** Never show a rounded string that disagrees with a clamped business value. */
export function formatNumberValue(value: number | null | undefined, precision?: number) {
  if (value == null || !Number.isFinite(value)) {
    return ''
  }
  if (precision === undefined) {
    return String(value)
  }
  const fixed = value.toFixed(precision)
  return Number(fixed) === value ? fixed : String(value)
}
