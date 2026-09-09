import type { ImgHTMLAttributes, PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'
import type { ImageFit, ImagePreviewProps } from './api'

export const imageProps = {
  src: String,
  previewSrc: String,
  fallbackSrc: String,
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
  objectFit: { type: String as PropType<ImageFit>, default: 'fill' },
  objectPosition: { type: String, default: '50% 50%' },
  radius: { type: [String, Number] as PropType<string | number>, default: 0 },
  alt: String,
  title: String,
  description: String,
  loadDescription: String,
  hideFooter: { type: [Boolean, String] as PropType<boolean | 'never'>, default: false },
  footerPosition: { type: String as PropType<'inner' | 'outer'>, default: 'inner' },
  footerClass: [String, Array, Object],
  lazy: Boolean,
  imgProps: Object as PropType<ImgHTMLAttributes>,
  previewedImgProps: Object as PropType<ImgHTMLAttributes>,
  showLoader: Boolean,
  ripple: Boolean,
  block: { type: Boolean, default: true },
  previewDisabled: Boolean,
  previewOpen: { type: Boolean, default: undefined },
  defaultPreviewOpen: { type: Boolean, default: false },
  previewProps: Object as PropType<Partial<ImagePreviewProps>>,
  popupContainer: popupContainerProp,
}

export const props = imageProps
