import { StyleVars } from '../theme-provider'
import { convert } from './convert'

export interface ThemesToRemOptions {
  rootFontSize?: number
  unitPrecision?: number
}

export function toRem(theme: StyleVars, options: ThemesToRemOptions = {}) {
  const { rootFontSize = 16, unitPrecision = 6 } = options
  if (!Number.isFinite(rootFontSize) || rootFontSize <= 0) {
    throw new RangeError('rootFontSize must be a finite positive number')
  }
  if (!Number.isInteger(unitPrecision) || unitPrecision < 0 || unitPrecision > 100) {
    throw new RangeError('unitPrecision must be an integer between 0 and 100')
  }
  return convert(theme, (value) => `${Number((Number(value) / rootFontSize).toFixed(unitPrecision))}rem`)
}
