import { nextTick, reactive, type TeleportProps } from 'vue'
import { call, inBrowser } from '@maplejs/maple-shared'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import VarActionSheet from './ActionSheet.vue'
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

export interface ActionSheetOptions {
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
  // internal
  popupContainer?: TeleportProps['to']
}

let singletonOptions: ActionSheetOptions | null
let defaultOptions: ActionSheetOptions = {}

function normalizeOptions(options: ActionSheetOptions = {}) {
  return { ...defaultOptions, ...options }
}

function ActionSheet(options?: ActionSheetOptions): Promise<ActionSheetActions | void> {
  if (!inBrowser()) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    ActionSheet.close()

    const reactiveActionSheetOptions: ActionSheetOptions = reactive(normalizeOptions(options))
    reactiveActionSheetOptions.popupContainer = 'body'
    singletonOptions = reactiveActionSheetOptions

    const { unmountInstance } = mountInstance(VarActionSheet, reactiveActionSheetOptions, {
      onSelect: (action: ActionItem) => {
        call(reactiveActionSheetOptions.onSelect, action)
        resolve(action)
      },
      onClose: () => {
        call(reactiveActionSheetOptions.onClose)
        resolve('close')
      },
      onClosed: () => {
        call(reactiveActionSheetOptions.onClosed)
        unmountInstance()
        singletonOptions === reactiveActionSheetOptions && (singletonOptions = null)
      },
      onRouteChange: () => {
        unmountInstance()
        singletonOptions === reactiveActionSheetOptions && (singletonOptions = null)
      },
      'onUpdate:open': (value: boolean) => {
        reactiveActionSheetOptions.open = value
      },
    })

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
    singletonOptions = null

    nextTick().then(() => {
      prevSingletonOptions.open = false
    })
  }
}

ActionSheet.Component = VarActionSheet
withInstall(VarActionSheet)
withInstall(VarActionSheet, ActionSheet)
withPropsDefaultsSetter(ActionSheet, actionSheetProps)

export { actionSheetProps }

export type ActionSheetInstance = InstanceType<typeof VarActionSheet>
export const _ActionSheetComponent: typeof VarActionSheet = VarActionSheet

export default ActionSheet
export type ActionSheetProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
