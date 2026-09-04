import type { AppContext, VNodeChild } from 'vue'
import { createVNode, defineComponent, h, reactive, render } from 'vue'
import { inBrowser } from '@maplejs/maple-shared'
import { withInstall } from '../utils/components'
import MpDialog from './Dialog.vue'
import { dialogProps } from './props'
import type { DialogAction, DialogConfig, DialogMethod, DialogReturn, DialogUpdateConfig } from './types'

let defaultOptions: DialogConfig = {}
const activeDialogs: DialogReturn[] = []

function renderContent(content: DialogConfig['content']) {
  return typeof content === 'function' ? content() : (content as VNodeChild)
}

function normalizeConfig(config: DialogConfig | string = {}): DialogConfig {
  return typeof config === 'string' ? { message: config } : config
}

function createDialogMethod(defaultMethodConfig: Partial<DialogConfig> = {}) {
  return (
    userConfig: DialogConfig | string = {},
    appContext?: AppContext,
  ): DialogReturn & Promise<DialogAction | void> => {
    if (!inBrowser()) {
      return Object.assign(Promise.resolve(), { close: () => {}, update: () => {} })
    }

    const config = {
      closable: false,
      simple: true,
      ...defaultOptions,
      ...defaultMethodConfig,
      ...normalizeConfig(userConfig),
    }
    const reactiveConfig = reactive<Record<string, any>>({
      titleAlign: 'start',
      ...config,
      open: true,
      popupContainer: false,
    })
    let resolvePromise: ((action: DialogAction | void) => void) | undefined
    let resolved = false
    const promise = new Promise<DialogAction | void>((resolve) => {
      resolvePromise = resolve
    })
    const resolveAction = (action: DialogAction) => {
      if (!resolved) {
        resolved = true
        resolvePromise?.(action)
      }
    }

    const host = document.createElement('div')
    document.body.appendChild(host)
    const hasTitleSlot = config.title != null && typeof config.title !== 'string'
    const slots = {
      default: () => renderContent(reactiveConfig.content ?? reactiveConfig.message),
      title: hasTitleSlot ? () => renderContent(reactiveConfig.title) : undefined,
      footer: typeof config.footer === 'boolean' ? undefined : () => renderContent(reactiveConfig.footer),
    }
    const dialogReturn: DialogReturn = {
      close: () => {
        reactiveConfig.open = false
        resolveAction('close')
      },
      update: (updateConfig: DialogUpdateConfig) => Object.assign(reactiveConfig, updateConfig),
    }

    const Host = defineComponent({
      setup() {
        return () => {
          const componentProps = { ...reactiveConfig }
          delete componentProps.content
          delete componentProps.message
          if (hasTitleSlot) {
            delete componentProps.title
          }
          return h(
            MpDialog as any,
            {
              ...componentProps,
              footer: typeof reactiveConfig.footer === 'boolean' ? reactiveConfig.footer : undefined,
              'onUpdate:open': (open: boolean) => {
                reactiveConfig.open = open
              },
              onConfirm: (event?: Event) => {
                config.onConfirm?.(event)
                resolveAction('confirm')
              },
              onCancel: (event?: Event) => {
                config.onCancel?.(event)
                resolveAction('cancel')
              },
              onOpen: config.onOpen,
              onOpened: config.onOpened,
              onClose: () => {
                config.onClose?.()
                resolveAction('close')
              },
              onClickOverlay: config.onClickOverlay,
              onKeyEscape: config.onKeyEscape,
              onClosed: () => {
                config.onClosed?.()
                render(null, host)
                host.remove()
                const index = activeDialogs.indexOf(dialogReturn)
                if (index >= 0) {
                  activeDialogs.splice(index, 1)
                }
              },
            },
            slots,
          )
        }
      },
    })
    const vnode = createVNode(Host)
    vnode.appContext = appContext ?? Dialog._context
    render(vnode, host)

    activeDialogs.push(dialogReturn)
    return Object.assign(promise, dialogReturn)
  }
}

const methods: DialogMethod = {
  open: createDialogMethod(),
  confirm: createDialogMethod({ type: 'warning' }),
  alert: createDialogMethod({ cancelButton: false, overlayClosable: false, escToClose: false }),
  info: createDialogMethod({ type: 'info', cancelButton: false }),
  success: createDialogMethod({ type: 'success', cancelButton: false }),
  warning: createDialogMethod({ type: 'warning', cancelButton: false }),
  error: createDialogMethod({ type: 'error', cancelButton: false }),
}

const Dialog = Object.assign(MpDialog, {
  ...methods,
  close: () => activeDialogs.at(-1)?.close(),
  setDefaultOptions: (options: DialogConfig) => {
    defaultOptions = { ...options }
  },
  resetDefaultOptions: () => {
    defaultOptions = {}
  },
  _context: null as AppContext | null,
})

withInstall(MpDialog, Dialog, {
  setup(app) {
    Dialog._context = app._context
    app.config.globalProperties.$dialog = Object.fromEntries(
      Object.entries(methods).map(([name, method]) => [
        name,
        (config?: DialogConfig | string) => method(config, app._context),
      ]),
    )
    Object.assign(app.config.globalProperties.$dialog, {
      close: Dialog.close,
      setDefaultOptions: Dialog.setDefaultOptions,
      resetDefaultOptions: Dialog.resetDefaultOptions,
    })
  },
})
export { dialogProps }
export type {
  DialogAction,
  DialogBeforeCloseRefs,
  DialogConfig,
  DialogMessageAlign,
  DialogMethod,
  DialogReturn,
  DialogService,
  DialogTitleAlign,
  DialogType,
  DialogUpdateConfig,
} from './types'
export type { DialogProps } from './props'
export type DialogInstance = InstanceType<typeof MpDialog>
export const _DialogComponent = MpDialog
export { Dialog }

export default Dialog
