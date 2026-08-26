import { App, TeleportProps, VNode } from 'vue'
import { CarouselToOptions } from './carousel'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const imagePreviewProps: Record<keyof ImagePreviewProps, any>

export interface ImagePreviewProps extends BasicAttributes {
  open?: boolean
  src?: string
  images?: string[]
  current?: string | number
  zoom?: string | number
  lockScroll?: boolean
  indicator?: boolean
  closable?: boolean
  maskClosable?: boolean
  loop?: boolean
  escToClose?: boolean
  popupContainer?: TeleportProps['to'] | false
  imagePreventDefault?: boolean
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onChange?: ListenerProp<(index: number) => void>
  onLongPress?: ListenerProp<(index: number) => void>
  onKeyEscape?: ListenerProp<() => void>
  onOpenChange?: ListenerProp<(open: boolean) => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
  'onUpdate:current'?: ListenerProp<(index: number) => void>
}

export interface ImagePreviewOptions {
  src?: string
  images?: string[]
  current?: string | number
  zoom?: string | number
  lockScroll?: boolean
  indicator?: boolean
  closable?: boolean
  maskClosable?: boolean
  loop?: boolean
  escToClose?: boolean
  imagePreventDefault?: boolean
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onChange?: (index: number) => void
  onLongPress?: (index: number) => void
  onKeyEscape?: () => void
  onOpenChange?: (open: boolean) => void
}

export class ImagePreviewComponent extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<ImagePreviewProps>

  $props: ImagePreviewProps

  $slots: {
    indicator(data: { index: number; length: number }): VNode[]
    extra(): VNode[]
    'close-icon'(): VNode[]
  }

  prev(options?: CarouselToOptions): void

  next(options?: CarouselToOptions): void

  to(index: number, options?: CarouselToOptions): void

  zoom(ratio: number): void
}

export interface IImagePreview {
  (options: string | string[] | ImagePreviewOptions): void

  Component: typeof ImagePreviewComponent

  Group: typeof ImagePreviewGroupComponent

  setDefaultOptions(options: ImagePreviewOptions): void

  resetDefaultOptions(): void

  close(): void

  install(app: App): void

  setPropsDefaults: SetPropsDefaults<ImagePreviewProps>
}

export declare const ImagePreview: IImagePreview

export interface ImagePreviewGroupProps extends BasicAttributes {
  images?: string[]
  open?: boolean
  defaultOpen?: boolean
  current?: number
  defaultCurrent?: number
  loop?: boolean
  closable?: boolean
  maskClosable?: boolean
  popupContainer?: TeleportProps['to'] | false
  onOpenChange?: ListenerProp<(open: boolean) => void>
  onChange?: ListenerProp<(index: number) => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
  'onUpdate:current'?: ListenerProp<(index: number) => void>
}

export class ImagePreviewGroupComponent extends VarComponent {
  $props: ImagePreviewGroupProps

  $slots: {
    default(): VNode[]
  }
}

export class _ImagePreviewComponent extends ImagePreviewComponent {}
export class _ImagePreviewGroupComponent extends ImagePreviewGroupComponent {}
