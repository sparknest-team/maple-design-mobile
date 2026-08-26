import { ImgHTMLAttributes, type PropType } from 'vue'
import type { ImageFit, ImagePreviewProps } from './types'

export type { ImageFit }

export const props = {
  src: String,
  previewSrc: String,
  fit: {
    type: String as PropType<ImageFit>,
    default: 'fill',
  },
  position: {
    type: String,
    default: '50% 50%',
  },
  alt: String,
  title: String,
  description: String,
  referrerpolicy: String as PropType<ImgHTMLAttributes['referrerpolicy']>,
  width: [String, Number],
  height: [String, Number],
  radius: {
    type: [String, Number],
    default: 0,
  },
  loading: String,
  error: String,
  lazy: Boolean,
  showLoader: Boolean,
  ripple: Boolean,
  block: {
    type: Boolean,
    default: true,
  },
  preview: {
    type: Boolean,
    default: true,
  },
  previewOpen: Boolean,
  defaultPreviewOpen: {
    type: Boolean,
    default: false,
  },
  previewProps: {
    type: Object as PropType<Partial<ImagePreviewProps>>,
  },
}
