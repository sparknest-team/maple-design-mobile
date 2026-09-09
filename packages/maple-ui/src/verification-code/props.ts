import type { ExtractPropTypes, PropType, VNode } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { FieldDecoratorVariant } from '../field-decorator/props'
import { defineListenerProp, pickProps } from '../utils/components'
import type { ComponentSize } from '../utils/constants'

export type VerificationCodeType = 'digit' | 'text' | 'alphanumeric'

export type VerificationCodeAlign = 'start' | 'center' | 'end'

export type VerificationCodeSeparator = (index: number, character: string) => VNode | string | null | undefined

export type VerificationCodeFormatter = (inputValue: string, index: number, value: string) => string | boolean

export const props = {
  modelValue: String,
  defaultValue: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 6,
    validator: (value: unknown) => Number.isInteger(value) && Number(value) > 0,
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
  },
  type: {
    type: String as PropType<VerificationCodeType>,
    default: 'digit',
  },
  variant: {
    type: String as PropType<FieldDecoratorVariant>,
    default: 'outline',
  },
  disabled: Boolean,
  masked: Boolean,
  maskSymbol: {
    type: String,
    default: '•',
  },
  readonly: Boolean,
  error: Boolean,
  autofocus: Boolean,
  gutter: {
    type: [String, Number],
    default: 8,
  },
  align: {
    type: String as PropType<VerificationCodeAlign>,
    default: 'center',
  },
  allowPaste: {
    type: Boolean,
    default: true,
  },
  pasteTransform: Function as PropType<(value: string) => string>,
  separator: Function as PropType<VerificationCodeSeparator>,
  formatter: Function as PropType<VerificationCodeFormatter>,
  ariaLabel: String,
  ...pickProps(fieldDecoratorProps, ['textColor', 'focusColor', 'blurColor']),
}

export type VerificationCodeProps = import('vue').ExtractPublicPropTypes<typeof props>
