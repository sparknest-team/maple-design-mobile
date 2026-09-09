import { triggerProps } from '../trigger'

export const props = {
  ...triggerProps,
  title: String,
  content: String,
  unmountOnClose: { type: Boolean, default: false },
  trigger: { ...triggerProps.trigger, default: 'click' },
  mouseEnterDelay: { type: Number, default: 0 },
  mouseLeaveDelay: { type: Number, default: 0 },
  closeOnClickReference: Boolean,
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  defaultStyle: {
    type: Boolean,
    default: true,
  },
  popoverClass: String,
}

export const popoverProps = props
