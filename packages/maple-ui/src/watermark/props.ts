import { type PropType } from 'vue'

export interface WatermarkFont {
  fontSize?: number
  fontVariant?: string
  fontWeight?: string
  fontStyle?: string
  fontFamily?: string
}

export const props = {
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  content: String,
  image: String,
  rotate: {
    type: Number,
    default: -22,
  },
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 0],
  },
  gap: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 0],
  },
  zIndex: {
    type: [Number, String],
    default: 10,
  },
  alpha: {
    type: [Number, String],
    default: 0.5,
  },
  fullscreen: Boolean,
  font: {
    type: Object as PropType<WatermarkFont>,
    default: () => ({
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
    }),
  },
}
