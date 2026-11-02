import { createVNode, defineComponent, h, reactive, render, type AppContext, type VNodeChild } from 'vue'
import DialogComponent from './Dialog.vue'
import type { DialogAction, DialogConfig, DialogMethod, DialogReturn, DialogUpdateConfig } from './types'

let defaultOptions: DialogConfig = {}
let defaultAppContext: AppContext | null = null
const activeDialogs: DialogReturn[] = []

function normalizeConfig(config: DialogConfig | string = {}): DialogConfig {
  return typeof config === 'string' ? { message: config } : config
}

function renderContent(content: DialogConfig['content']): VNodeChild {
  return typeof content === 'function' ? content() : content
}

function createDialogMethod(defaultMethodConfig: Partial<DialogConfig> = {}) {
  return (
    userConfig: DialogConfig | string = {},
    appContext?: AppContext,
  ): DialogReturn & Promise<DialogAction | void> => {
    if (typeof document === 'undefined') {
      return Object.assign(Promise.resolve(), { close: () => {}, update: () => {} })
    }

    const config: DialogConfig = {
      closable: false,
      simple: true,
      ...defaultOptions,
      ...defaultMethodConfig,
      ...normalizeConfig(userConfig),
    }
    const state = reactive<Record<string, any>>({
      titleAlign: 'start',
      ...config,
      open: true,
      popupContainer: false,
      unmountOnClose: true,
    })
    const host = document.createElement('div')
    document.body.appendChild(host)
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
    const hasTitleSlot = config.title != null && typeof config.title !== 'string'
    const dialogReturn: DialogReturn = {
      close() {
        state.open = false
        resolveAction('close')
      },
      update(updateConfig: DialogUpdateConfig) {
        Object.assign(state, updateConfig)
      },
    }
    const Host = defineComponent({
      setup() {
        return () => {
          const componentProps = { ...state }
          delete componentProps.content
          delete componentProps.message
          if (hasTitleSlot) {
            delete componentProps.title
          }
          return h(
            DialogComponent,
            {
              ...componentProps,
              footer: typeof state.footer === 'boolean' ? state.footer : undefined,
              'onUpdate:open': (open: boolean) => {
                state.open = open
              },
              onConfirm: (event?: Event) => {
                resolveAction('confirm')
                return config.onConfirm?.(event)
              },
              onCancel: (event?: Event) => {
                resolveAction('cancel')
                return config.onCancel?.(event)
              },
              onOpen: config.onOpen,
              onOpened: config.onOpened,
              onClose: () => {
                resolveAction('close')
                return config.onClose?.()
              },
              onClosed: () => {
                render(null, host)
                host.remove()
                const index = activeDialogs.indexOf(dialogReturn)
                if (index >= 0) {
                  activeDialogs.splice(index, 1)
                }
                return config.onClosed?.()
              },
              onClickOverlay: config.onClickOverlay,
              onKeyEscape: config.onKeyEscape,
            },
            {
              default: () => renderContent(state.content ?? state.message),
              title: hasTitleSlot ? () => renderContent(state.title) : undefined,
              footer: typeof state.footer === 'boolean' ? undefined : () => renderContent(state.footer),
            },
          )
        }
      },
    })
    const vnode = createVNode(Host)
    vnode.appContext = appContext ?? defaultAppContext
    render(vnode, host)
    activeDialogs.push(dialogReturn)
    return Object.assign(promise, dialogReturn)
  }
}

export const dialogMethods: DialogMethod = {
  open: createDialogMethod(),
  confirm: createDialogMethod({ type: 'warning' }),
  alert: createDialogMethod({ cancelButton: false, overlayClosable: false, escToClose: false }),
  info: createDialogMethod({ type: 'info', cancelButton: false }),
  success: createDialogMethod({ type: 'success', cancelButton: false }),
  warning: createDialogMethod({ type: 'warning', cancelButton: false }),
  error: createDialogMethod({ type: 'error', cancelButton: false }),
}

export function closeLatestDialog() {
  activeDialogs.at(-1)?.close()
}

export function setDialogDefaultOptions(options: DialogConfig) {
  defaultOptions = { ...options }
}

export function resetDialogDefaultOptions() {
  defaultOptions = {}
}

export function setDialogAppContext(appContext: AppContext | null) {
  defaultAppContext = appContext
}
