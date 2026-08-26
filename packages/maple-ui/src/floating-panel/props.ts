import { TeleportProps, type PropType } from 'vue'

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
    type: [Boolean, Number, String],
    default: true,
  },
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
  safeArea: Boolean,
}
