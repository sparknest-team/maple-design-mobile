import type { PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'

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
    type: [Boolean, Number],
    default: true,
  },
  bottom: [Number, String],
  targetContainer: [String, Object] as PropType<string | HTMLElement>,
  popupContainer: popupContainerProp,
}
