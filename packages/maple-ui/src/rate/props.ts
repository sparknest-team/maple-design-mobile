import type { Component, PropType } from 'vue'

export type RateColor = string | Record<string, string>
export type RateIcon = string | Component

export const rateProps = {
  modelValue: { type: Number, default: undefined },
  defaultValue: { type: Number, default: 0 },
  count: { type: [String, Number], default: 5, validator: (value: unknown) => Number(value) > 0 },
  color: [String, Object] as PropType<RateColor>,
  icon: [String, Object, Function] as PropType<RateIcon>,
  emptyIcon: [String, Object, Function] as PropType<RateIcon>,
  halfIcon: [String, Object, Function] as PropType<RateIcon>,
  emptyColor: String,
  size: [String, Number],
  gap: [String, Number],
  allowHalf: Boolean,
  disabled: { type: Boolean, default: undefined },
  disabledColor: String,
  readonly: { type: Boolean, default: undefined },
  ripple: { type: Boolean, default: true },
  clearable: Boolean,
  grading: Boolean,
}

export const props = rateProps
export type RateProps = import('vue').ExtractPublicPropTypes<typeof rateProps>
