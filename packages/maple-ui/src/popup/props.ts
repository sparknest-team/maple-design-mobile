import { type PropType, type TeleportProps } from 'vue'

export type PopupPosition = 'top' | 'bottom' | 'right' | 'left' | 'center'

export const props = {
  open: Boolean,
  position: {
    type: String as PropType<PopupPosition>,
    default: 'center',
  },
  transition: String,
  mask: {
    type: Boolean,
    default: true,
  },
  maskClass: String,
  maskStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  escToClose: {
    type: Boolean,
    default: true,
  },
  defaultStyle: {
    type: Boolean,
    default: true,
  },
  zIndex: Number,
  safeArea: Boolean,
  safeAreaTop: Boolean,
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
  // internal for Dialog
}
