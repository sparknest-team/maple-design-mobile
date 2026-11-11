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
  /** 沿用 CSS object-position，控制图像内容在图片盒内的对齐，默认 50% 50%；不是组件坐标 */
  objectPosition: { type: String, default: '50% 50%' },
  radius: { type: [String, Number] as PropType<string | number>, default: 0 },
  alt: String,
  title: String,
  description: String,
  loadDescription: String,
  hideFooter: { type: [Boolean, String] as PropType<boolean | 'never'>, default: false },
  /** 说明区位于图片内部 inner 或外部 outer，默认 inner；不是四边浮层方位 */
  footerPosition: { type: String as PropType<'inner' | 'outer'>, default: 'inner' },
  footerClass: [String, Array, Object],
  lazy: Boolean,
  imgProps: Object as PropType<ImgHTMLAttributes>,
  previewedImgProps: Object as PropType<ImgHTMLAttributes>,
  showLoader: Boolean,
  ripple: Boolean,
  block: { type: Boolean, default: true },
  previewDisabled: Boolean,
  open: { type: Boolean, default: undefined },
  defaultOpen: { type: Boolean, default: false },
  previewProps: Object as PropType<Partial<ImagePreviewProps>>,
  popupContainer: popupContainerProp,
}

export const props = imageProps
