import { defineListenerProp } from '../utils/components'

export const props = {
  modelValue: {
    type: Number,
    default: 0,
  },
  defaultValue: Number,
  min: [String, Number],
  max: [String, Number],
  step: {
    type: [String, Number],
    default: 1,
  },
  precision: [String, Number],
  color: String,
  inputWidth: [String, Number],
  inputTextSize: [String, Number],
  buttonSize: [String, Number],
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  decimalLength: [String, Number],
  disabled: Boolean,
  error: Boolean,
  readonly: Boolean,
  placeholder: String,
  formatter: Function,
  parser: Function,
  inputAttrs: Object,
  controls: {
    type: Boolean,
    default: true,
  },
  modelEvent: {
    type: String,
    default: 'change',
  },
  disableIncrement: Boolean,
  disableDecrement: Boolean,
  disableInput: Boolean,
  lazyChange: Boolean,
  incrementButton: {
    type: Boolean,
    default: true,
  },
  decrementButton: {
    type: Boolean,
    default: true,
  },
  press: {
    type: Boolean,
    default: true,
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  beforeChange: defineListenerProp<(value: number, change: (value: number) => void) => void>(),
}
