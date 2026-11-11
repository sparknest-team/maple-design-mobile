import type { PropType } from 'vue'
import type { WatermarkFont } from './types'

export const watermarkProps = {
  content: [String, Array] as PropType<string | string[]>,
  image: String,
  width: Number,
  height: Number,
  gap: {
    type: Array as unknown as PropType<[number, number]>,
    default: (): [number, number] => [90, 90],
  },
  offset: Array as unknown as PropType<[number, number]>,
  rotate: {
    type: Number,
    default: -22,
  },
  font: Object as PropType<WatermarkFont>,
  zIndex: {
    type: Number,
    default: 6,
  },
  alpha: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 0 && value <= 1,
  },
  antiTamper: {
    type: Boolean,
    default: true,
  },
  grayscale: {
    type: Boolean,
    default: false,
  },
  repeat: {
    type: Boolean,
    default: true,
  },
  staggered: {
    type: Boolean,
    default: true,
  },
  fullscreen: Boolean,
}
