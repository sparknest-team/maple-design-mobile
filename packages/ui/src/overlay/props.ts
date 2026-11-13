import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { popupContainerProp } from '../utils/popup-container'

export const overlayProps = {
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
  escToClose: {
    type: Boolean,
    default: true,
  },
  popupContainer: popupContainerProp,
  zIndex: Number,
}

export type OverlayProps = ExtractPublicPropTypes<typeof overlayProps>
