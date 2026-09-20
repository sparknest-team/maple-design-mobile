import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickProps } from '../utils/components'

export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email'

export type InputVariant = 'filled' | 'outline' | 'standard'

export interface InputMaxLength {
  length: number
  errorOnly?: boolean
}

export type WordLength = (value: string) => number
export type WordSlice = (value: string, maxLength: number) => string

export const props = {
  modelValue: String,
  modelModifiers: {
    type: Object as PropType<{ trim?: boolean }>,
    default: () => ({}),
  },
  defaultValue: { type: String, default: '' },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  ariaLabel: String,
  maxLength: { type: [Number, Object] as PropType<number | InputMaxLength>, default: 0 },
  readonly: { type: Boolean, default: false },
  autofocus: Boolean,
  enterkeyhint: String as PropType<InputHTMLAttributes['enterKeyHint']>,
  inputAttrs: Object as PropType<Record<string, any>>,
  error: { type: Boolean, default: false },
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
  ]),
  variant: {
    type: String as PropType<InputVariant>,
    default: 'outline',
  },
  disabled: { type: Boolean, default: undefined },
  clearable: { type: Boolean, default: false },
  showWordLimit: { type: Boolean, default: false },
  wordLength: Function as PropType<WordLength>,
  wordSlice: Function as PropType<WordSlice>,
  // internal start
  autocomplete: {
    type: String,
    default: 'off',
  },
  isForceFocusingEffect: {
    type: Boolean,
    default: undefined,
  },
  isForceErrorEffect: {
    type: Boolean,
    default: undefined,
  },
  placeholderFocusColor: String,
  // internal end
}

export type InputProps = import('vue').ExtractPublicPropTypes<typeof props>
