import type { PropType } from 'vue'

export const props = {
  visibleHeight: {
    type: [Number, String],
    default: 200,
  },
  duration: {
    type: Number,
    default: 300,
  },
  right: [Number, String],
  elevation: {
    type: [Boolean, Number, String],
    default: true,
  },
  bottom: [Number, String],
  targetContainer: [String, Object] as PropType<string | HTMLElement>,
  popupContainer: {
    type: Boolean,
    default: true,
  },
}
