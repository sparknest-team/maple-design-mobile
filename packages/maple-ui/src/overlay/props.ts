import { type PropType, type TeleportProps } from 'vue'
import type { ExtractPublicPropTypes } from '../utils/components'

export const props = {
  open: { type: Boolean, default: undefined },
  defaultOpen: { type: Boolean, default: false },
  overlayClosable: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  unmountOnClose: {
    type: Boolean,
    default: true,
  },
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
  escToClose: {
    type: Boolean,
    default: true,
  },
  zIndex: Number,
}

export type OverlayProps = ExtractPublicPropTypes<typeof props>
