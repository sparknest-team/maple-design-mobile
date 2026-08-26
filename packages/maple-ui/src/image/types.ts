export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export interface ImagePreviewProps {
  open?: boolean
  src?: string
  images?: string[]
  current?: number
  closable?: boolean
  maskClosable?: boolean
  loop?: boolean
  zoom?: number | string
  popupContainer?: string | Element | false
  lockScroll?: boolean
  escToClose?: boolean
  imagePreventDefault?: boolean
  indicator?: boolean
  onChange?: (index: number) => void
  onClose?: () => void
  onLongPress?: (index: number) => void
  onOpenChange?: (open: boolean) => void
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
  lazy?: boolean
  loading?: string
  error?: string
  showLoader?: boolean
  ripple?: boolean
  block?: boolean
  preview?: boolean
  previewOpen?: boolean
  defaultPreviewOpen?: boolean
  previewProps?: Partial<ImagePreviewProps>
}

export interface ImagePreviewGroupProps extends Omit<ImagePreviewProps, 'src' | 'onClose'> {
  images?: string[]
  defaultOpen?: boolean
  defaultCurrent?: number
}

export interface ImagePreviewOptions extends ImagePreviewProps {
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
  onKeyEscape?: () => void
}

export type UserImagePreviewOptions = ImagePreviewOptions | string | string[]

export interface ImageUrlRecord {
  url: string
  canPreview: boolean
}

export interface PreviewGroupContext {
  registerImageUrl: (id: number, url: string, canPreview: boolean) => () => void
  preview: (imageId: number) => void
}
