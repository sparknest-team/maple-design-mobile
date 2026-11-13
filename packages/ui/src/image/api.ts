import type { ImgHTMLAttributes, Slot, VNode } from 'vue'

type TypedSlot<T> = (props: T) => VNode[]

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
  overlayClosable?: boolean
  escToClose?: boolean
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
  modelValue?: number
  defaultValue?: number
  loop?: boolean
  onChange?: (imageNumber: number, previousImageNumber: number) => void
  'onUpdate:modelValue'?: (imageNumber: number) => void
  onLongPress?: (imageNumber: number) => void
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
  open?: boolean
  defaultOpen?: boolean
  previewProps?: Partial<ImagePreviewProps>
  /** @deprecated Slots are described by ImageSlots and are not runtime props. */
  extra?: Slot
  placeholder?: Slot
  loader?: Slot
  error?: Slot
  errorIcon?: Slot
  previewActions?: Slot
  onOpenChange?: (open: boolean) => void
  'onUpdate:open'?: (open: boolean) => void
  onClick?: (event: Event) => void
  onLoad?: (event: Event) => void
  onError?: (event: Event) => void
}

export interface ImageSlots {
  extra?: Slot
  placeholder?: Slot
  loader?: Slot
  error?: Slot
  'error-icon'?: Slot
  'preview-actions'?: Slot
}

export interface ImagePreviewImageSlotProps {
  src?: string
  scale: number
  rotate: number
  translateX: number
  translateY: number
  moving: boolean
  previewedImgProps?: ImgHTMLAttributes
}
export interface ImagePreviewSlots {
  image?: TypedSlot<ImagePreviewImageSlotProps>
  actions?: Slot
  'close-icon'?: Slot
  overlay?: Slot
  extra?: Slot
}
export interface ImagePreviewGroupSlots {
  default?: Slot
  'close-icon'?: Slot
  indicator?: TypedSlot<{ imageNumber: number; length: number }>
  extra?: TypedSlot<{ url: string | undefined }>
  actions?: TypedSlot<{ url: string | undefined }>
}
export interface ImagePreviewActionSlots {
  default?: Slot
}

export interface ImageInstance {
  showPreview: () => void
}

export interface ImageUrlRecord {
  url: string
  canPreview: boolean
}

export interface PreviewGroupContext {
  registerImageUrl: (
    id: number,
    url: string,
    canPreview: boolean,
    element?: () => HTMLElement | null | undefined,
  ) => () => void
  refreshOrder?: () => void
  canPreviewImage?: () => boolean
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
  toggleFullscreen: () => Promise<void> | undefined
}

export interface ImagePreviewGroupInstance extends Omit<ImagePreviewInstance, 'open'> {
  open: (imageNumber?: number) => void
  close: () => void
  prev: () => void
  next: () => void
  to: (imageNumber: number) => void
  reset: () => void
}

export interface ImagePreviewHandle {
  open: (imageNumber?: number) => void
  close: () => void
  reset: () => void
  prev: () => void
  next: () => void
  to: (imageNumber: number) => void
  zoomTo: (scale: number) => void
  zoomIn: () => void
  zoomOut: () => void
  rotateLeft: () => void
  rotateRight: () => void
  toggleFullscreen: () => Promise<void> | undefined
}

export interface ImagePreviewOptions extends ImagePreviewProps {
  images?: string[]
  modelValue?: number
  defaultValue?: number
  loop?: boolean
  onChange?: (imageNumber: number, previousImageNumber: number) => void
  'onUpdate:modelValue'?: (imageNumber: number) => void
}
export type UserImagePreviewOptions = ImagePreviewOptions | string | string[]
