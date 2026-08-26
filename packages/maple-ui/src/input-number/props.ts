import { type PropType } from 'vue'
import type { ComponentSize } from '../utils/constants'

export type InputNumberMode = 'embed' | 'button' | 'input'
export type InputNumberModelEvent = 'change' | 'input'
export type InputNumberSize = ComponentSize

export const props = {
  modelValue: Number,
  defaultValue: Number,
  mode: {
    type: String as PropType<InputNumberMode>,
    default: 'embed',
  },
  precision: Number,
  step: {
    type: Number,
    default: 1,
  },
  disabled: Boolean,
  error: Boolean,
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  formatter: Function as PropType<(value: string) => string>,
  parser: Function as PropType<(value: string) => string>,
  placeholder: String,
  size: {
    type: String as PropType<InputNumberSize>,
    default: 'md',
  },
  clearable: Boolean,
  modelEvent: {
    type: String as PropType<InputNumberModelEvent>,
    default: 'change',
  },
  readonly: Boolean,
  inputAttrs: Object as PropType<Record<string, any>>,
}
