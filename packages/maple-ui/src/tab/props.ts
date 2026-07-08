import { defineListenerProp } from '../utils/components'

export const props = {
  name: [String, Number],
  title: String,
  disabled: Boolean,
  ripple: {
    type: Boolean,
    default: true,
  },
  onClick: defineListenerProp<(active: string | number, e: Event) => void>(),
}
