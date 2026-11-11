import type { ImgHTMLAttributes, PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'
import type { ImageInteraction, ImagePreviewActionName } from './api'

const positiveScale = (value: number) => Number.isFinite(value) && value > 0

export const imagePreviewProps = {
  src: String,
  open: { type: Boolean, default: undefined },
  defaultOpen: { type: Boolean, default: false },
  interaction: { type: String as PropType<ImageInteraction>, default: 'auto' },
  popupContainer: popupContainerProp,
  lockScroll: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  overlayClosable: { type: Boolean, default: true },
  escToClose: { type: Boolean, default: true },
  imagePreventDefault: Boolean,
  defaultScale: { type: Number, default: 1, validator: positiveScale },
  minScale: { type: Number, default: 0.5, validator: positiveScale },
  maxScale: { type: Number, default: 8, validator: positiveScale },
  scaleStep: { type: Number, default: 0.5, validator: positiveScale },
  wheelZoom: { type: Boolean, default: undefined },
  keyboard: { type: Boolean, default: undefined },
  draggable: { type: Boolean, default: true },
  keepDragOffset: Boolean,
  showToolbar: { type: Boolean, default: true },
  actionsLayout: Array as PropType<ImagePreviewActionName[]>,
  previewedImgProps: Object as PropType<ImgHTMLAttributes>,
}

export const props = imagePreviewProps
