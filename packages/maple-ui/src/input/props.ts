import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { defineListenerProp, pickProps } from '../utils/components'

export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email'

export const props = {
  modelValue: String,
  modelModifiers: {
    type: Object as PropType<{ trim?: boolean }>,
    default: () => ({}),
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  ariaLabel: String,
  maxlength: [String, Number],
  readonly: Boolean,
  autofocus: Boolean,
  enterkeyhint: String as PropType<InputHTMLAttributes['enterKeyHint']>,
  inputAttrs: Object as PropType<Record<string, any>>,
  onFocus: defineListenerProp<(e: FocusEvent) => void>(),
  onBlur: defineListenerProp<(e: FocusEvent) => void>(),
  onInput: defineListenerProp<(value: string, e: Event) => void>(),
  onChange: defineListenerProp<(value: string, e: Event) => void>(),
  onKeydown: defineListenerProp<(e: KeyboardEvent) => void>(),
  onClear: defineListenerProp<(value: string) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: string) => void>(),
  ...pickProps(fieldDecoratorProps, [
    'size',
    'variant',
    'placeholder',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'disabled',
    'clearable',
    'onClick',
  ]),
  // internal start
  autocomplete: String,
  isForceFocusingEffect: {
    type: Boolean,
    default: undefined,
  },
  isForceErrorEffect: {
    type: Boolean,
    default: undefined,
  },
  // internal end
}

export type InputProps = ExtractPropTypes<typeof props>
