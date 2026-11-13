import type { AppContext } from 'vue'
import { withInstall } from '../utils/components'
import MpDialog from './Dialog.vue'
import { dialogProps } from './props'
import {
  closeLatestDialog,
  dialogMethods,
  resetDialogDefaultOptions,
  setDialogAppContext,
  setDialogDefaultOptions,
} from './service'
import type { DialogConfig, DialogMethod, DialogService } from './types'

const Dialog: typeof MpDialog &
  typeof dialogMethods & {
    close: typeof closeLatestDialog
    setDefaultOptions: typeof setDialogDefaultOptions
    resetDefaultOptions: typeof resetDialogDefaultOptions
    _context: AppContext | null
  } = Object.assign(MpDialog, {
  ...dialogMethods,
  close: closeLatestDialog,
  setDefaultOptions: setDialogDefaultOptions,
  resetDefaultOptions: resetDialogDefaultOptions,
  _context: null as AppContext | null,
})

withInstall(MpDialog, Dialog, {
  setup(app) {
    Dialog._context = app._context
    setDialogAppContext(app._context)
    const bind = (method: DialogMethod['open']) => (config?: DialogConfig | string) => method(config, app._context)
    const service: DialogService = Object.assign(
      {
        open: bind(dialogMethods.open),
        confirm: bind(dialogMethods.confirm),
        alert: bind(dialogMethods.alert),
        info: bind(dialogMethods.info),
        success: bind(dialogMethods.success),
        warning: bind(dialogMethods.warning),
        error: bind(dialogMethods.error),
      },
      {
        close: closeLatestDialog,
        setDefaultOptions: setDialogDefaultOptions,
        resetDefaultOptions: resetDialogDefaultOptions,
      },
    )
    app.config.globalProperties.$dialog = service
  },
})

export { dialogProps }
export type {
  DialogAction,
  DialogConfig,
  DialogMessageAlign,
  DialogMethod,
  DialogRenderContent,
  DialogReturn,
  DialogService,
  DialogTitleAlign,
  DialogType,
  DialogUpdateConfig,
} from './types'
export type { DialogProps } from './props'
export type DialogInstance = InstanceType<typeof MpDialog>
export const _DialogComponent: typeof MpDialog = MpDialog
export { Dialog }

export default Dialog

export type { DialogBeforeClose } from './types'

export type { BeforeHookContext, BeforeHookDone } from '../_hooks/use-action-guard'
