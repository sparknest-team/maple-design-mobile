import type { AppContext, CSSProperties, VNodeChild } from 'vue'
import type { BeforeHookDone, BeforeHookResult } from '../_hooks/use-action-guard'
import type { ReadingDirection } from '../_utils/direction'
import type { CompatibleStyleValue as StyleValue } from '../_utils/style-value'
import type { buttonProps } from '../button/props'
import type { ExtractPublicPropTypes } from '../utils/components'

export type DialogBeforeClose = (
  payload: { action: DialogAction },
  done: BeforeHookDone,
  context: { signal: AbortSignal; event?: Event },
) => BeforeHookResult

export type DialogAction = 'confirm' | 'cancel' | 'close'
export type DialogType = 'info' | 'success' | 'warning' | 'error'
export type DialogMessageAlign = 'left' | 'center' | 'right'
export type DialogTitleAlign = 'start' | 'center'
export type DialogRenderContent = string | number | VNodeChild | (() => VNodeChild)

export interface DialogConfig {
  topDivider?: boolean
  bottomDivider?: boolean
  /** 阅读方向；省略时使用调用上下文或文档方向。 */
  dir?: ReadingDirection
  onGuardError?: (error: unknown, action: DialogAction) => void

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
  closeOnRouteChange?: boolean
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
  beforeClose?: DialogBeforeClose
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
  | 'onGuardError'
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
