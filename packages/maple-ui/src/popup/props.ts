import { type PropType, type TeleportProps } from 'vue'
import { popupContainerProp } from '../utils/popup-container'

export type PopupPlacement = 'top' | 'bottom' | 'right' | 'left' | 'center'

export const popupProps = {
  open: {
    type: Boolean,
    default: undefined,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String as PropType<PopupPlacement>,
    default: 'center',
  },
  transition: String,
  overlayAnimationName: {
    type: String,
    default: undefined,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  overlayClass: String,
  overlayStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true,
  },
  overlayClosable: {
    type: Boolean,
    default: true,
  },
  escToClose: {
    type: Boolean,
    default: true,
  },
  unstyled: {
    type: Boolean,
    default: false,
  },
  zIndex: Number,
  safeAreaInsetBottom: Boolean,
  safeAreaInsetTop: Boolean,
  unmountOnClose: {
    type: Boolean,
    default: false,
  },
  closeOnRouteChange: {
    type: Boolean,
    default: false,
  },
  popupContainer: popupContainerProp,
}

export const props = popupProps
export type PopupProps = import('vue').ExtractPublicPropTypes<typeof popupProps>
