import { type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export type InputNumberControlType = 'stacked' | 'split'
export type InputNumberModelEvent = 'change' | 'input'
export type InputNumberSize = 'xs' | 'sm' | 'md' | 'lg'

export const props = {
  modelValue: Number,
  defaultValue: Number,
  controlType: {
    type: String as PropType<InputNumberControlType>,
    default: 'stacked',
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
  controls: {
    type: Boolean,
    default: true,
  },
  size: String as PropType<InputNumberSize>,
  clearable: Boolean,
  modelEvent: {
    type: String as PropType<InputNumberModelEvent>,
    default: 'change',
  },
  readonly: Boolean,
  inputAttrs: Object as PropType<Record<string, any>>,
  onChange: defineListenerProp<(value: number | undefined, event: Event) => void>(),
  onFocus: defineListenerProp<(event: FocusEvent) => void>(),
  onBlur: defineListenerProp<(event: FocusEvent) => void>(),
  onClear: defineListenerProp<(event: Event) => void>(),
  onInput: defineListenerProp<(value: number | undefined, inputValue: string, event: Event) => void>(),
  onKeydown: defineListenerProp<(event: KeyboardEvent) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: number | undefined) => void>(),
}
