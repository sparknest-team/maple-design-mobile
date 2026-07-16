import { type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export const props = {
  offsetTop: {
    type: [String, Number],
    default: 0,
  },
  zIndex: {
    type: [String, Number],
    default: 10,
  },
  cssMode: Boolean,
  disabled: Boolean,
  target: [String, Object] as PropType<string | HTMLElement | Window>,
  onChange: defineListenerProp<(fixed: boolean, offsetTop: number) => void>(),
}
