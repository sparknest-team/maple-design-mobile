import { type PropType } from 'vue'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'
import { ActionItem } from './index'

export const props = {
  open: Boolean,
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
    'overlay',
    'overlayClass',
    'overlayStyle',
    'lockScroll',
    'overlayClosable',
    'escToClose',
    'safeArea',
    'popupContainer',
    // internal for function call closes the dialog
  ]),
}
