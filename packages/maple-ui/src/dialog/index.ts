import { nextTick, reactive, type Ref, type TeleportProps } from 'vue'
import { call, inBrowser, isString } from '@maplejs/maple-shared'
import { props as buttonProps } from '../button/props'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import type { ExtractPublicPropTypes } from '../utils/components'
import MpDialog from './Dialog.vue'
import { props as dialogProps } from './props'

export type DialogAction = 'confirm' | 'cancel' | 'close'
export type DialogActions = DialogAction
export type DialogType = 'info' | 'success' | 'warning' | 'error'

export interface DialogBeforeCloseRefs {
  confirmButtonLoading: Ref<boolean>
  cancelButtonLoading: Ref<boolean>
  confirmButtonDisabled: Ref<boolean>
  cancelButtonDisabled: Ref<boolean>
}

export interface DialogOptions {
  show?: boolean
  width?: string | number
  title?: string
  message?: string
  messageAlign?: string
  type?: DialogType
  confirmButton?: boolean
  cancelButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonTextColor?: string
  cancelButtonTextColor?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
  confirmButtonProps?: ExtractPublicPropTypes<typeof buttonProps>
  cancelButtonProps?: ExtractPublicPropTypes<typeof buttonProps>
  confirmButtonLoading?: boolean
  cancelButtonLoading?: boolean
  confirmButtonDisabled?: boolean
  cancelButtonDisabled?: boolean
  dialogClass?: string
  dialogStyle?: Record<string, any>
  footer?: boolean
  hideTitle?: boolean
  bodyClass?: string
  bodyStyle?: Record<string, any>
  unmountOnClose?: boolean
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: Record<string, any>
  lockScroll?: boolean
  closeOnClickOverlay?: boolean
  closeOnKeyEscape?: boolean
  onOpen?: () => void
  onOpened?: () => void
  onBeforeClose?: (action: DialogAction, done: () => void, refs: DialogBeforeCloseRefs) => void
  onClose?: () => void
  onClosed?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  onClickOverlay?: () => void
  onKeyEscape?: () => void
  teleport?: TeleportProps['to']
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

export type UserDialogOptions = DialogOptions | string

let singletonOptions: DialogOptions | null
let defaultOptions: DialogOptions = {}

function normalizeOptions(options: UserDialogOptions = {}) {
  if (isString(options)) {
    return { ...defaultOptions, message: options }
  }

  return { ...defaultOptions, ...options }
}

function createDialogMethod(defaultConfig: Partial<DialogOptions> = {}) {
  return (options?: UserDialogOptions): DialogReturn & Promise<DialogAction | void> => {
    if (!inBrowser()) {
      return Object.assign(Promise.resolve(), { close: () => {}, update: () => {} })
    }

    let resolvePromise: ((action: DialogAction | void) => void) | null = null
    const promise = new Promise<DialogAction | void>((resolve) => {
      resolvePromise = resolve
    })

    Dialog.close()

    const dialogOptions: DialogOptions = {
      ...defaultConfig,
      ...normalizeOptions(options),
    }
    const reactiveDialogOptions: DialogOptions = reactive(dialogOptions)
    reactiveDialogOptions.teleport = 'body'
    singletonOptions = reactiveDialogOptions

    let updateHandler: ((options: DialogUpdateOptions) => void) | null = null

    const { unmountInstance } = mountInstance(MpDialog, reactiveDialogOptions, {
      onConfirm: () => {
        call(reactiveDialogOptions.onConfirm)
        resolvePromise?.('confirm')
      },
      onCancel: () => {
        call(reactiveDialogOptions.onCancel)
        resolvePromise?.('cancel')
      },
      onClose: () => {
        call(reactiveDialogOptions.onClose)
        resolvePromise?.('close')
      },
      onClosed: () => {
        call(reactiveDialogOptions.onClosed)
        unmountInstance()
        singletonOptions === reactiveDialogOptions && (singletonOptions = null)
      },
      onRouteChange: () => {
        unmountInstance()
        singletonOptions === reactiveDialogOptions && (singletonOptions = null)
      },
      'onUpdate:show': (value: boolean) => {
        reactiveDialogOptions.show = value
      },
    })

    updateHandler = (updateOptions: DialogUpdateOptions) => {
      Object.assign(reactiveDialogOptions, updateOptions)
    }

    reactiveDialogOptions.show = true

    return Object.assign(promise, {
      close: Dialog.close,
      update: (updateOptions: DialogUpdateOptions) => updateHandler?.(updateOptions),
    })
  }
}

function Dialog(options?: UserDialogOptions): DialogReturn & Promise<DialogAction | void> {
  return createDialogMethod()(options)
}

Dialog.open = createDialogMethod()
Dialog.confirm = createDialogMethod({ type: 'warning' })
Dialog.alert = createDialogMethod({ cancelButton: false, closeOnClickOverlay: false, closeOnKeyEscape: false })

Dialog.setDefaultOptions = function (options: DialogOptions) {
  defaultOptions = options
}

Dialog.resetDefaultOptions = function () {
  defaultOptions = {}
}

Dialog.close = function () {
  if (singletonOptions != null) {
    const prevSingletonOptions = singletonOptions
    singletonOptions = null

    nextTick().then(() => {
      prevSingletonOptions.show = false
    })
  }
}

Dialog.Component = MpDialog
withInstall(MpDialog)
withInstall(MpDialog, Dialog)
withPropsDefaultsSetter(Dialog, dialogProps)

export { dialogProps }

export const _DialogComponent = MpDialog

export default Dialog
