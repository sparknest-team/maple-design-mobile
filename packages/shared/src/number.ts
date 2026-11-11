import { isBoolean, isString } from './predicates'

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function clampArrayRange(index: number, array: unknown[]): number {
  return clamp(index, 0, array.length - 1)
}

export function toNumber(value: number | string | boolean | undefined | null): number {
  if (value == null) {
    return 0
  }
  if (isString(value)) {
    const number = parseFloat(value)
    return Number.isNaN(number) ? 0 : number
  }
  return isBoolean(value) ? Number(value) : value
}

export function floor(value: number, precision = 0): number {
  precision = Number.isInteger(precision) ? clamp(precision, -292, 292) : 0
  if (!precision || !Number.isFinite(value) || value === 0) {
    return Math.floor(value)
  }
  const [coefficient, exponent = '0'] = Math.abs(value).toString().split('e')
  const point = coefficient.indexOf('.')
  const digits = coefficient.replace('.', '')
  const keep = (point < 0 ? coefficient.length : point) + Number(exponent) + precision
  // Already a multiple of the requested decimal quantum; do not overflow by scaling it.
  if (keep >= digits.length) {
    return value
  }
  let integer = keep > 0 ? digits.slice(0, keep) : '0'
  const remainder = keep > 0 ? digits.slice(keep) : digits
  // Floor goes toward negative infinity, including numbers below the smallest scaled double.
  if (value < 0 && /[1-9]/.test(remainder)) {
    integer = incrementDecimalDigits(integer)
  }
  const result = Number(`${integer}e${-precision}`)
  return value < 0 ? -result : result
}

function incrementDecimalDigits(value: string): string {
  const digits = value.split('')
  for (let index = digits.length - 1; index >= 0; index--) {
    if (digits[index] !== '9') {
      digits[index] = String(Number(digits[index]) + 1)
      return digits.join('')
    }
    digits[index] = '0'
  }
  return `1${digits.join('')}`
}
