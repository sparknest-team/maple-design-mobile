import { type PropType } from 'vue'
import { buttonProps } from '../button/props'
import { popupProps } from '../popup'
import { defineListenerProp, pickProps, type ExtractPublicPropTypes } from '../utils/components'
import type { DialogActions, DialogBeforeCloseRefs, DialogType } from './index'

export type DialogMessageAlign = 'left' | 'center' | 'right'

export const DIALOG_TYPE_ICON: Record<DialogType, string> = {
  info: 'information',
  success: 'checkbox-marked-circle',
  warning: 'warning',
  error: 'error',
}

export const props = {
  open: Boolean,
  width: [Number, String],
  title: String,
  message: String,
  messageAlign: {
    type: String as PropType<DialogMessageAlign>,
    default: 'left',
  },
  type: {
    type: String as PropType<DialogType>,
  },
  confirmButton: {
    type: Boolean,
    default: true,
  },
  cancelButton: {
    type: Boolean,
    default: true,
  },
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonTextColor: String,
  cancelButtonTextColor: String,
  confirmButtonColor: String,
  cancelButtonColor: String,
  confirmButtonProps: Object as PropType<ExtractPublicPropTypes<typeof buttonProps>>,
  cancelButtonProps: Object as PropType<ExtractPublicPropTypes<typeof buttonProps>>,
  confirmButtonLoading: Boolean,
  cancelButtonLoading: Boolean,
  confirmButtonDisabled: Boolean,
  cancelButtonDisabled: Boolean,
  footer: {
    type: Boolean,
    default: true,
  },
  hideTitle: {
    type: Boolean,
    default: false,
  },
  bodyClass: String,
  bodyStyle: Object,
  unmountOnClose: Boolean,
  dialogClass: String,
  dialogStyle: Object,
  beforeClose: defineListenerProp<(action: DialogActions, done: () => void, refs: DialogBeforeCloseRefs) => void>(),
  ...pickProps(popupProps, [
    'mask',
    'maskClass',
    'maskStyle',
    'lockScroll',
    'maskClosable',
    'escToClose',
    'popupContainer',
  ]),
}
