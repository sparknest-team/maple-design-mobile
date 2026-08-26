import type { ExtractPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickProps } from '../utils/components'

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
  maxLength: [String, Number],
  readonly: Boolean,
  autofocus: Boolean,
  enterkeyhint: String as PropType<InputHTMLAttributes['enterKeyHint']>,
  inputAttrs: Object as PropType<Record<string, any>>,
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
  // internal end
}

export type InputProps = ExtractPropTypes<typeof props>
