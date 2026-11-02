import type { CSSProperties, PropType, StyleValue } from 'vue'
import { readingDirectionProp } from '../_utils/direction'
import { buttonProps } from '../button/props'
import { type ExtractPublicPropTypes } from '../utils/components'
import { popupContainerProp } from '../utils/popup-container'
import type { DialogAction, DialogBeforeClose, DialogMessageAlign, DialogTitleAlign, DialogType } from './types'

export const DIALOG_TYPE_ICON: Record<DialogType, string> = {
  info: 'info-circle-fill',
  success: 'checkbox-marked-circle-fill',
  warning: 'warning',
  error: 'error',
}

export const dialogProps = {
  /** 阅读方向，省略时继承来源作用域；函数式调用可显式指定。 */
  dir: readingDirectionProp,
  open: { type: Boolean, default: undefined },
  defaultOpen: { type: Boolean, default: false },
  title: String,
  message: String,
  type: String as PropType<DialogType>,
  simple: { type: Boolean, default: false },
  width: [Number, String],
  top: [Number, String],
  titleAlign: { type: String as PropType<DialogTitleAlign>, default: 'center' },
  messageAlign: { type: String as PropType<DialogMessageAlign>, default: 'left' },
  alignCenter: { type: Boolean, default: true },
  footer: { type: Boolean, default: true },
  confirmButton: { type: Boolean, default: true },
  cancelButton: { type: Boolean, default: true },
  closable: { type: Boolean, default: true },
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonProps: Object as PropType<ExtractPublicPropTypes<typeof buttonProps>>,
  cancelButtonProps: Object as PropType<ExtractPublicPropTypes<typeof buttonProps>>,
  confirmButtonLoading: { type: Boolean, default: false },
  cancelButtonLoading: { type: Boolean, default: false },
  confirmButtonDisabled: { type: Boolean, default: false },
  cancelButtonDisabled: { type: Boolean, default: false },
  overlay: { type: Boolean, default: true },
  overlayClass: String,
  overlayStyle: Object as PropType<CSSProperties>,
  overlayClosable: { type: Boolean, default: true },
  escToClose: { type: Boolean, default: true },
  lockScroll: { type: Boolean, default: true },
  closeOnRouteChange: { type: Boolean, default: false },
  popupContainer: popupContainerProp,
  dialogClass: [String, Array] as PropType<string | any[]>,
  dialogStyle: Object as PropType<CSSProperties>,
  bodyClass: [String, Array] as PropType<string | any[]>,
  bodyStyle: [String, Object, Array] as PropType<StyleValue>,
  hideTitle: { type: Boolean, default: false },
  unmountOnClose: { type: Boolean, default: false },
  draggable: { type: Boolean, default: false },
  fullscreen: { type: Boolean, default: false },
  overlayAnimationName: { type: String, default: 'mp-fade' },
  dialogAnimationName: { type: String, default: 'mp-pop-center' },
  ariaLabel: String,
  closeButtonAriaLabel: { type: String, default: 'Close dialog' },
  zIndex: Number,
  beforeClose: Function as PropType<DialogBeforeClose>,
}

export type DialogProps = ExtractPublicPropTypes<typeof dialogProps>
export const props = dialogProps
