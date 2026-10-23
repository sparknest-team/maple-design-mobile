import type { ImgHTMLAttributes, PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'
import type { ImageInteraction, ImagePreviewActionName } from './api'

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
  defaultScale: { type: Number, default: 1 },
  minScale: { type: Number, default: 0.5 },
  maxScale: { type: Number, default: 8 },
  scaleStep: { type: Number, default: 0.5 },
  wheelZoom: { type: Boolean, default: undefined },
  keyboard: { type: Boolean, default: undefined },
  draggable: { type: Boolean, default: true },
  keepDragOffset: Boolean,
  showToolbar: { type: Boolean, default: true },
  actionsLayout: Array as PropType<ImagePreviewActionName[]>,
  previewedImgProps: Object as PropType<ImgHTMLAttributes>,
  onOpenChange: Function as PropType<(open: boolean) => void>,
}

export const props = imagePreviewProps
