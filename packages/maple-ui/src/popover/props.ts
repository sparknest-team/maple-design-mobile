import { triggerProps } from '../trigger'

export const props = {
  ...triggerProps,
  elevation: {
    type: [Boolean, String, Number],
    default: true,
  },
  defaultStyle: {
    type: Boolean,
    default: true,
  },
  popoverClass: String,
}
