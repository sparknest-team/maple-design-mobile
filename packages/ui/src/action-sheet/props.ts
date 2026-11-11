import { type PropType } from 'vue'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'
import { ActionItem } from './index'

export const props = {
  open: { type: Boolean, default: undefined },
  /** 非受控初始开合状态，仅创建时读取。 */
  defaultOpen: Boolean,
  title: String,
  actions: {
    type: Array as PropType<ActionItem[]>,
    default: () => [],
  },
  closeOnClickAction: {
    type: Boolean,
    default: true,
  },
  ...pickProps(popupProps, [
    'beforeClose',
    'swipeToClose',
    'swipeThreshold',
    'overlay',
    'overlayClass',
    'overlayStyle',
    'lockScroll',
    'overlayClosable',
    'escToClose',
    'popupContainer',
    // internal for function call closes the dialog
  ]),
  safeArea: Boolean,
}
