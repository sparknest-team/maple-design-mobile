import type { ImgHTMLAttributes, Slot } from 'vue'

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
export type ImageInteraction = 'auto' | 'desktop' | 'touch'
export type ImagePreviewActionName =
  | 'prev'
  | 'next'
  | 'fullScreen'
  | 'rotateLeft'
  | 'rotateRight'
  | 'originalSize'
  | 'zoomOut'
  | 'zoomIn'
  | 'download'
  | 'close'

export interface ImagePreviewProps {
  src?: string
  open?: boolean
  defaultOpen?: boolean
  interaction?: ImageInteraction
  popupContainer?: string | HTMLElement | false
  lockScroll?: boolean
  closable?: boolean
  maskClosable?: boolean
  escToClose?: boolean
  closeOnImageTap?: boolean
  imagePreventDefault?: boolean
  defaultScale?: number
  minScale?: number
  maxScale?: number
  scaleStep?: number
  wheelZoom?: boolean
  keyboard?: boolean
  draggable?: boolean
  keepDragOffset?: boolean
  showToolbar?: boolean
  actionsLayout?: ImagePreviewActionName[]
  previewedImgProps?: ImgHTMLAttributes
  onOpenChange?: (open: boolean) => void
  'onUpdate:open'?: (open: boolean) => void
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onKeyEscape?: () => void
  onLongPress?: () => void
  onPrev?: () => void
  onNext?: () => void
}

export interface ImagePreviewGroupProps extends Omit<ImagePreviewProps, 'src' | 'previewedImgProps' | 'onLongPress'> {
  images?: string[]
  current?: number
  defaultCurrent?: number
  loop?: boolean
  onChange?: (index: number, previousIndex: number) => void
  'onUpdate:current'?: (index: number) => void
  onLongPress?: (index: number) => void
}

export interface ImageProps {
  src?: string
  previewSrc?: string
  fallbackSrc?: string
  width?: string | number
  height?: string | number
  objectFit?: ImageFit
  objectPosition?: string
  radius?: string | number
  alt?: string
  title?: string
  description?: string
  loadDescription?: string
  hideFooter?: boolean | 'never'
  footerPosition?: 'inner' | 'outer'
  footerClass?: string | unknown[] | Record<string, unknown>
  lazy?: boolean
  imgProps?: ImgHTMLAttributes
  previewedImgProps?: ImgHTMLAttributes
  showLoader?: boolean
  ripple?: boolean
  block?: boolean
  previewDisabled?: boolean
  previewOpen?: boolean
  defaultPreviewOpen?: boolean
  previewProps?: Partial<ImagePreviewProps>
  extra?: Slot
  placeholder?: Slot
  loader?: Slot
  error?: Slot
  errorIcon?: Slot
  previewActions?: Slot
  onPreviewOpenChange?: (open: boolean) => void
  'onUpdate:previewOpen'?: (open: boolean) => void
  onClick?: (event: Event) => void
  onLoad?: (event: Event) => void
  onError?: (event: Event) => void
}

export interface ImageInstance {
  showPreview: () => void
}

export interface ImageUrlRecord {
  url: string
  canPreview: boolean
}

export interface PreviewGroupContext {
  registerImageUrl: (id: number, url: string, canPreview: boolean) => () => void
  preview: (imageId: number) => void
}

export interface ImagePreviewInstance {
  open: () => void
  close: () => void
  reset: () => void
  zoomTo: (scale: number) => void
  zoomIn: () => void
  zoomOut: () => void
  rotateLeft: () => void
  rotateRight: () => void
  toggleFullscreen: () => void
}

export interface ImagePreviewGroupInstance extends Omit<ImagePreviewInstance, 'open'> {
  open: (index?: number) => void
  close: () => void
  prev: () => void
  next: () => void
  to: (index: number) => void
  reset: () => void
}

export interface ImagePreviewHandle {
  open: (index?: number) => void
  close: () => void
  reset: () => void
  prev: () => void
  next: () => void
  to: (index: number) => void
  zoomTo: (scale: number) => void
  zoomIn: () => void
  zoomOut: () => void
  rotateLeft: () => void
  rotateRight: () => void
  toggleFullscreen: () => void
}

export interface ImagePreviewOptions extends ImagePreviewProps {
  images?: string[]
  current?: number
  defaultCurrent?: number
  loop?: boolean
  onChange?: (index: number, previousIndex: number) => void
  'onUpdate:current'?: (index: number) => void
}
export type UserImagePreviewOptions = ImagePreviewOptions | string | string[]
