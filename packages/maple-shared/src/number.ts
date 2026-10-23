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
  precision = clamp(precision, -292, 292)
  if (!precision) {
    return Math.floor(value)
  }
  const rounded = Math.floor(Number(`${value}e${precision}`))
  return +`${rounded}e${-precision}`
}
