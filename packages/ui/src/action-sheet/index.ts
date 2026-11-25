import { nextTick, reactive, type TeleportProps } from 'vue'
import { call, inBrowser } from '@maple-design/shared-vue'
import type { PopupCloseReason, PopupProps } from '../popup'
import { mountInstance, withInstall } from '../utils/components'
import VarActionSheetSource from './ActionSheet.vue'
import { props as actionSheetProps } from './props'

export type ActionSheetActions = ActionItem | 'close'

export interface ActionItem {
  name: string
  color?: string
  icon?: string
  iconSize?: string | number
  namespace?: string
  className?: string
  disabled?: boolean
}

export interface ActionSheetOptions extends Pick<PopupProps, 'beforeClose' | 'swipeToClose' | 'swipeThreshold'> {
  actions?: ActionItem[]
  open?: boolean
  title?: string
  overlay?: boolean
  overlayClass?: string
  overlayStyle?: Record<string, any>
  lockScroll?: boolean
  closeOnClickAction?: boolean
  overlayClosable?: boolean
  escToClose?: boolean
  safeArea?: boolean
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onClickOverlay?: (event: MouseEvent) => void
  onSelect?: (action: ActionItem) => void
  onKeyEscape?: (event: KeyboardEvent) => void
  onCloseError?: (error: unknown, reason: PopupCloseReason) => void
  // internal
  popupContainer?: TeleportProps['to']
}

let singletonOptions: ActionSheetOptions | null
let disposeSingleton: (() => void) | undefined
let defaultOptions: ActionSheetOptions = {}

function normalizeOptions(options: ActionSheetOptions = {}) {
  return { ...defaultOptions, ...options }
}

function ActionSheet(options?: ActionSheetOptions): Promise<ActionSheetActions | void> {
  if (!inBrowser()) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    disposeSingleton?.()

    const reactiveActionSheetOptions: ActionSheetOptions = reactive(normalizeOptions(options))
    reactiveActionSheetOptions.popupContainer = 'body'
    singletonOptions = reactiveActionSheetOptions

    let disposed = false
    const { unmountInstance } = mountInstance(
      VarActionSheet,
      reactiveActionSheetOptions,
      {
        onSelect: (action: ActionItem) => {
          if (disposed) {
            return
          }
          resolve(action)
          return call(reactiveActionSheetOptions.onSelect, action)
        },
        onClose: () => {
          if (disposed) {
            return
          }
          resolve('close')
          return call(reactiveActionSheetOptions.onClose)
        },
        onClosed: () => {
          if (disposed) {
            return
          }
          try {
            return call(reactiveActionSheetOptions.onClosed)
          } finally {
            dispose()
          }
        },
        'onUpdate:open': (value: boolean) => {
          reactiveActionSheetOptions.open = value
        },
      },
      'mp-action-sheet-service',
    )

    function dispose() {
      if (disposed) {
        return
      }
      disposed = true
      resolve('close')
      unmountInstance()
      if (singletonOptions === reactiveActionSheetOptions) {
        singletonOptions = null
        disposeSingleton = undefined
      }
    }
    disposeSingleton = dispose
    reactiveActionSheetOptions.open = true
  })
}

ActionSheet.setDefaultOptions = function (options: ActionSheetOptions) {
  defaultOptions = options
}

ActionSheet.resetDefaultOptions = function () {
  defaultOptions = {}
}

ActionSheet.close = function () {
  if (singletonOptions != null) {
    const prevSingletonOptions = singletonOptions
    nextTick().then(() => {
      if (singletonOptions === prevSingletonOptions) {
        prevSingletonOptions.open = false
      }
    })
  }
}

const VarActionSheet = withInstall(VarActionSheetSource)
ActionSheet.Component = VarActionSheet
const InstalledActionSheet = withInstall(VarActionSheet, ActionSheet)

export { actionSheetProps }

export type ActionSheetInstance = InstanceType<typeof VarActionSheet>
export const _ActionSheetComponent: typeof VarActionSheet = VarActionSheet

export default InstalledActionSheet
export type ActionSheetProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
