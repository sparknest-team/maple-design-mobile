import { type PropType } from 'vue'
import { props as buttonProps } from '../button/props'
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
  show: Boolean,
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
  onBeforeClose: defineListenerProp<(action: DialogActions, done: () => void, refs: DialogBeforeCloseRefs) => void>(),
  onConfirm: defineListenerProp<() => void>(),
  onCancel: defineListenerProp<() => void>(),
  'onUpdate:show': defineListenerProp<(show: boolean) => void>(),
  ...pickProps(popupProps, [
    'overlay',
    'overlayClass',
    'overlayStyle',
    'lockScroll',
    'closeOnClickOverlay',
    'closeOnKeyEscape',
    'teleport',
    'onOpen',
    'onClose',
    'onOpened',
    'onClosed',
    'onClickOverlay',
    'onKeyEscape',
    'onRouteChange',
  ]),
}
