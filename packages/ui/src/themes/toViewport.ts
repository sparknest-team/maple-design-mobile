import { StyleVars } from '../theme-provider'
import { convert } from './convert'

export interface ThemesToViewportOptions {
  viewportWidth?: number
  viewportUnit?: string
  unitPrecision?: number
}

export function toViewport(theme: StyleVars, options: ThemesToViewportOptions = {}) {
  const { viewportWidth = 375, viewportUnit = 'vmin', unitPrecision = 6 } = options

  if (!Number.isFinite(viewportWidth) || viewportWidth <= 0) {
    throw new RangeError('viewportWidth must be a finite positive number')
  }
  if (!Number.isInteger(unitPrecision) || unitPrecision < 0 || unitPrecision > 100) {
    throw new RangeError('unitPrecision must be an integer between 0 and 100')
  }
  if (
    !/^(?:vw|vh|vi|vb|vmin|vmax|svw|svh|svi|svb|svmin|svmax|lvw|lvh|lvi|lvb|lvmin|lvmax|dvw|dvh|dvi|dvb|dvmin|dvmax)$/.test(
      viewportUnit,
    )
  ) {
    throw new RangeError('viewportUnit must be a CSS viewport unit')
  }
  return convert(
    theme,
    (value) => `${Number(((Number(value) / viewportWidth) * 100).toFixed(unitPrecision))}${viewportUnit}`,
  )
}
