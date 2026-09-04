import type { AppContext, CSSProperties, Ref, StyleValue, VNodeChild } from 'vue'
import type { buttonProps } from '../button/props'
import type { ExtractPublicPropTypes } from '../utils/components'

export type DialogAction = 'confirm' | 'cancel' | 'close'
export type DialogType = 'info' | 'success' | 'warning' | 'error'
export type DialogMessageAlign = 'left' | 'center' | 'right'
export type DialogTitleAlign = 'start' | 'center'
export type DialogRenderContent = string | number | VNodeChild | (() => VNodeChild)

export interface DialogBeforeCloseRefs {
  confirmButtonLoading: Ref<boolean>
  cancelButtonLoading: Ref<boolean>
  confirmButtonDisabled: Ref<boolean>
  cancelButtonDisabled: Ref<boolean>
}

export interface DialogConfig {
  open?: boolean
  defaultOpen?: boolean
  title?: DialogRenderContent
  message?: DialogRenderContent
  content?: DialogRenderContent
  type?: DialogType
  simple?: boolean
  width?: string | number
  top?: string | number
  titleAlign?: DialogTitleAlign
  messageAlign?: DialogMessageAlign
  alignCenter?: boolean
  footer?: boolean | DialogRenderContent
  confirmButton?: boolean
  cancelButton?: boolean
  closable?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonProps?: ExtractPublicPropTypes<typeof buttonProps>
  cancelButtonProps?: ExtractPublicPropTypes<typeof buttonProps>
  confirmButtonLoading?: boolean
  cancelButtonLoading?: boolean
  confirmButtonDisabled?: boolean
  cancelButtonDisabled?: boolean
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: CSSProperties
  overlayClosable?: boolean
  escToClose?: boolean
  lockScroll?: boolean
  popupContainer?: string | HTMLElement | false
  dialogClass?: string | any[]
  dialogStyle?: CSSProperties
  bodyClass?: string | any[]
  bodyStyle?: StyleValue
  hideTitle?: boolean
  unmountOnClose?: boolean
  draggable?: boolean
  fullscreen?: boolean
  overlayAnimationName?: string
  dialogAnimationName?: string
  ariaLabel?: string
  closeButtonAriaLabel?: string
  zIndex?: number
  beforeClose?: (action: DialogAction, done: () => void, refs: DialogBeforeCloseRefs) => void
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onConfirm?: (event?: Event) => void
  onCancel?: (event?: Event) => void
  onClickOverlay?: (event?: Event) => void
  onKeyEscape?: (event?: KeyboardEvent) => void
}

export type DialogUpdateConfig = Omit<
  DialogConfig,
  | 'title'
  | 'message'
  | 'footer'
  | 'beforeClose'
  | 'onOpen'
  | 'onOpened'
  | 'onClose'
  | 'onClosed'
  | 'onConfirm'
  | 'onCancel'
  | 'onClickOverlay'
  | 'onKeyEscape'
> & { title?: string; message?: string }

export interface DialogReturn {
  close: () => void
  update: (config: DialogUpdateConfig) => void
}

export interface DialogMethod {
  open: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
  confirm: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
  alert: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
  info: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
  success: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
  warning: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
  error: (config?: DialogConfig | string, appContext?: AppContext) => DialogReturn & Promise<DialogAction | void>
}

export interface DialogService extends DialogMethod {
  close: () => void
  setDefaultOptions: (options: DialogConfig) => void
  resetDefaultOptions: () => void
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $dialog: DialogService
  }
}
