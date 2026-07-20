import { App, Ref, TeleportProps, VNode } from 'vue'
import { ButtonProps } from './button'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const dialogProps: Record<keyof DialogProps, any>

export type DialogMessageAlign = 'left' | 'center' | 'right'
export type DialogAction = 'confirm' | 'cancel' | 'close'
export type DialogActions = DialogAction
export type DialogType = 'info' | 'success' | 'warning' | 'error'

export interface DialogBeforeCloseRefs {
  confirmButtonLoading: Ref<boolean>
  cancelButtonLoading: Ref<boolean>
  confirmButtonDisabled: Ref<boolean>
  cancelButtonDisabled: Ref<boolean>
}

export interface DialogProps extends BasicAttributes {
  show?: boolean
  width?: string | number
  title?: string
  message?: string
  messageAlign?: DialogMessageAlign
  type?: DialogType
  confirmButton?: boolean
  cancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonTextColor?: string
  cancelButtonTextColor?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
  confirmButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  confirmButtonLoading?: boolean
  cancelButtonLoading?: boolean
  confirmButtonDisabled?: boolean
  cancelButtonDisabled?: boolean
  footer?: boolean
  hideTitle?: boolean
  bodyClass?: string
  bodyStyle?: Record<string, any>
  unmountOnClose?: boolean
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: Record<string, any>
  dialogClass?: string
  dialogStyle?: Record<string, any>
  lockScroll?: boolean
  closeOnClickOverlay?: boolean
  closeOnKeyEscape?: boolean
  teleport?: TeleportProps['to'] | false
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onBeforeClose?: ListenerProp<(action: DialogAction, done: () => void, refs: DialogBeforeCloseRefs) => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onConfirm?: ListenerProp<() => void>
  onCancel?: ListenerProp<() => void>
  onClickOverlay?: ListenerProp<() => void>
  onKeyEscape?: ListenerProp<() => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
}

export interface DialogFooterData {
  slotClass: string
  cancel: () => void
  confirm: () => void
}

export class DialogComponent extends VarComponent {
  $props: DialogProps

  $slots: {
    default(): VNode[]
    title(): VNode[]
    footer(data: DialogFooterData): VNode[]
  }
}

export interface DialogOptions {
  show?: boolean
  title?: string
  width?: string | number
  message?: string
  messageAlign?: DialogMessageAlign
  type?: DialogType
  confirmButton?: boolean
  cancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonTextColor?: string
  cancelButtonTextColor?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
  confirmButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  confirmButtonLoading?: boolean
  cancelButtonLoading?: boolean
  confirmButtonDisabled?: boolean
  cancelButtonDisabled?: boolean
  footer?: boolean
  hideTitle?: boolean
  bodyClass?: string
  bodyStyle?: Record<string, any>
  unmountOnClose?: boolean
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: Record<string, any>
  dialogClass?: string
  dialogStyle?: Record<string, any>
  lockScroll?: boolean
  closeOnClickOverlay?: boolean
  closeOnKeyEscape?: boolean
  teleport?: TeleportProps['to'] | false
  onOpen?: () => void
  onOpened?: () => void
  onBeforeClose?: (action: DialogAction, done: () => void, refs: DialogBeforeCloseRefs) => void
  onClose?: () => void
  onClosed?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  onClickOverlay?: () => void
  onKeyEscape?: () => void
}

export type DialogUpdateOptions = Omit<
  DialogOptions,
  | 'onConfirm'
  | 'onCancel'
  | 'onBeforeClose'
  | 'onOpen'
  | 'onOpened'
  | 'onClose'
  | 'onClosed'
  | 'onClickOverlay'
  | 'onKeyEscape'
>

export interface DialogReturn {
  close: () => void
  update: (options: DialogUpdateOptions) => void
}

export interface IDialog {
  (options?: DialogOptions | string): DialogReturn & Promise<DialogAction | void>

  open: (options?: DialogOptions | string) => DialogReturn & Promise<DialogAction | void>

  confirm: (options?: DialogOptions | string) => DialogReturn & Promise<DialogAction | void>

  alert: (options?: DialogOptions | string) => DialogReturn & Promise<DialogAction | void>

  Component: typeof DialogComponent

  setDefaultOptions(options: DialogOptions): void

  resetDefaultOptions(): void

  close(): void

  install(app: App): void

  setPropsDefaults: SetPropsDefaults<DialogProps>
}

export declare const Dialog: IDialog

export class _DialogComponent extends DialogComponent {}
