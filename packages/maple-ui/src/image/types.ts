import type { Slot } from 'vue'

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface ImagePreviewProps {
  open?: boolean
  defaultOpen?: boolean
  src?: string
  images?: string[]
  current?: number
  defaultCurrent?: number
  closable?: boolean
  maskClosable?: boolean
  loop?: boolean
  popupContainer?: string | HTMLElement | false
  lockScroll?: boolean
  escToClose?: boolean
  zoom?: number | string
  imagePreventDefault?: boolean
  indicator?: boolean
  onChange?: (index: number) => void
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onKeyEscape?: () => void
  /** 移动端路由变更时触发 */
  onRouteChange?: () => void
  onLongPress?: (index: number) => void
  onOpenChange?: (open: boolean) => void
  'onUpdate:open'?: (open: boolean) => void
  'onUpdate:current'?: (index: number) => void
}

export interface ImageProps {
  src?: string
  previewSrc?: string
  width?: string | number
  height?: string | number
  fit?: ImageFit
  position?: string
  radius?: string | number
  alt?: string
  title?: string
  description?: string
  hideFooter?: boolean | 'never'
  footerPosition?: 'inner' | 'outer'
  footerClass?: string | unknown[] | Record<string, unknown>
  lazy?: boolean
  loadingSrc?: string
  errorSrc?: string
  referrerPolicy?: string
  showLoader?: boolean
  preview?: boolean
  previewOpen?: boolean
  defaultPreviewOpen?: boolean
  previewProps?: Partial<ImagePreviewProps>
  popupContainer?: string | HTMLElement | false
  extra?: Slot
  loader?: Slot
  error?: Slot
  errorIcon?: Slot
  previewActions?: Slot
  onPreviewOpenChange?: (open: boolean) => void
  'onUpdate:previewOpen'?: (open: boolean) => void
  onClick?: (event: Event) => void
  onLoad?: (event: Event) => void
  onError?: (event: Event) => void
  ripple?: boolean
  block?: boolean
}

export interface ImagePreviewActionsSlotData {
  url?: string
}

export interface ImagePreviewGroupProps {
  images?: string[]
  open?: boolean
  defaultOpen?: boolean
  current?: number
  defaultCurrent?: number
  loop?: boolean
  closable?: boolean
  maskClosable?: boolean
  popupContainer?: string | HTMLElement | false
  lockScroll?: boolean
  escToClose?: boolean
  previewProps?: Partial<ImagePreviewProps>
  onOpenChange?: (open: boolean) => void
}

export type ImagePreviewOptions = ImagePreviewProps

export type UserImagePreviewOptions = ImagePreviewOptions | string | string[]

export interface ImagePreviewMethods {
  close: () => void
  prev: () => void
  next: () => void
  to: (index: number) => void
  zoom: (ratio: number) => void
}

export type ImagePreviewHandle = ImagePreviewMethods

export interface ImagePreviewGroupMethods {
  open: (index?: number) => void
  close: () => void
  prev: () => void
  next: () => void
  to: (index: number) => void
}

export interface ImageUrlRecord {
  url: string
  canPreview: boolean
}

export interface PreviewGroupContext {
  registerImageUrl: (id: number, url: string, canPreview: boolean) => () => void
  preview: (imageId: number) => void
}
