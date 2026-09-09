import type { ComponentSize } from '../utils/constants'
import { positiveLength } from '../utils/size-length'

export { positiveLength } from '../utils/size-length'

export type ProgressSize = ComponentSize | number | string
export const progressSizeMap = {
  xs: { diameter: 16, stroke: 2 },
  sm: { diameter: 48, stroke: 3 },
  md: { diameter: 64, stroke: 4 },
  lg: { diameter: 80, stroke: 6 },
  xl: { diameter: 96, stroke: 8 },
} as const

export function resolveProgressSize(value: ProgressSize | undefined, mode: 'line' | 'circle') {
  const preset =
    typeof value === 'string' && Object.prototype.hasOwnProperty.call(progressSizeMap, value)
      ? (value as ComponentSize)
      : 'md'
  const sizes = progressSizeMap[preset]
  const custom =
    value != null && !(typeof value === 'string' && Object.prototype.hasOwnProperty.call(progressSizeMap, value))
  return {
    preset,
    diameter: mode === 'circle' && custom ? positiveLength(value, `${sizes.diameter}px`) : `${sizes.diameter}px`,
    stroke: mode === 'line' && custom ? positiveLength(value, `${sizes.stroke}px`) : `${sizes.stroke}px`,
  }
}
