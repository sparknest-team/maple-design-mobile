import { type PropType, type TeleportProps } from 'vue'

export const props = {
  open: Boolean,
  lockScroll: {
    type: Boolean,
    default: true,
  },
  popupContainer: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
  escToClose: {
    type: Boolean,
    default: true,
  },
}
