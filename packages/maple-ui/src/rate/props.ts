export const props = {
  modelValue: {
    type: Number,
    default: 0,
  },
  count: {
    type: [String, Number],
    default: 5,
  },
  color: String,
  icon: {
    type: String,
    default: 'star-fill',
  },
  emptyIcon: {
    type: String,
    default: 'star',
  },
  halfIcon: {
    type: String,
    default: 'star-half-full',
  },
  emptyColor: String,
  size: [String, Number],
  gap: [String, Number],
  allowHalf: Boolean,
  disabled: Boolean,
  disabledColor: String,
  readonly: Boolean,
  ripple: {
    type: Boolean,
    default: true,
  },
  clearable: Boolean,
}
