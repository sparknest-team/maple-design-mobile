import { type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export const imagePreviewGroupProps = {
  images: {
    type: Array as PropType<string[]>,
  },
  visible: {
    type: Boolean,
    default: undefined,
  },
  defaultVisible: {
    type: Boolean,
    default: false,
  },
  current: {
    type: Number,
    default: undefined,
  },
  defaultCurrent: {
    type: Number,
    default: 0,
  },
  loop: Boolean,
  closable: Boolean,
  maskClosable: Boolean,
  teleport: [String, Object, Boolean] as PropType<string | Element | false>,
  'onUpdate:visible': defineListenerProp<(visible: boolean) => void>(),
  'onUpdate:current': defineListenerProp<(current: number) => void>(),
  onPreviewVisibleChange: defineListenerProp<(visible: boolean) => void>(),
  onChange: defineListenerProp<(index: number) => void>(),
}
