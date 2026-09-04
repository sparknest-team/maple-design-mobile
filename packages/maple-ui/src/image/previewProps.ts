import type { ImgHTMLAttributes, PropType } from 'vue'
import type { ImageInteraction, ImagePreviewActionName } from './api'
import { imagePlatformConfig } from './platform.config'

export const imagePreviewProps = {
  src: String,
  open: { type: Boolean, default: undefined },
  defaultOpen: { type: Boolean, default: false },
  interaction: { type: String as PropType<ImageInteraction>, default: 'auto' },
  popupContainer: [String, Object, Boolean] as PropType<string | HTMLElement | false>,
  lockScroll: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  maskClosable: { type: Boolean, default: true },
  escToClose: { type: Boolean, default: true },
  closeOnImageTap: { type: Boolean, default: imagePlatformConfig.closeOnImageTap },
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
