import { type PropType } from 'vue'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'

export type NumberKeyboardTheme = 'default' | 'custom'

export const props = {
  modelValue: {
    type: String,
    default: '',
  },
  open: Boolean,
  title: String,
  theme: {
    type: String as PropType<NumberKeyboardTheme>,
    default: 'default',
  },
  maxLength: {
    type: [Number, String],
    default: Infinity,
  },
  extraKey: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  closeButtonText: String,
  deleteButtonText: String,
  showDeleteKey: {
    type: Boolean,
    default: true,
  },
  randomKeyOrder: Boolean,
  hideOnClickOutside: {
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
    'popupContainer',
  ]),
  safeArea: {
    type: Boolean,
    default: true,
  },
}
