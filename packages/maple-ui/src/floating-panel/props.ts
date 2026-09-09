import { TeleportProps, type PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'

export const props = {
  anchor: Number,
  anchors: Array as PropType<number[]>,
  contentDraggable: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 300,
  },
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  popupContainer: popupContainerProp,
  safeArea: Boolean,
}
