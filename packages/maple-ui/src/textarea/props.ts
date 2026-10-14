import type { ExtractPublicPropTypes, PropType } from 'vue'
import { inputProps, type InputMaxLength, type InputVariant } from '../input/props'
import { textareaDefaults } from './defaults'

export interface TextareaAutoSize {
  minRows?: number
  maxRows?: number
}
export type TextareaMaxLength = InputMaxLength
export type TextareaVariant = InputVariant
export type { WordLength, WordSlice } from '../input/props'
export const textareaProps = {
  /** 与 Input 保持一致的 modelValue 契约。 */
  modelValue: inputProps.modelValue,
  /** 与 Input 保持一致的 modelModifiers 契约。 */
  modelModifiers: inputProps.modelModifiers,
  /** 与 Input 保持一致的 defaultValue 契约。 */
  defaultValue: inputProps.defaultValue,
  /** 与 Input 保持一致的 placeholder 契约。 */
  placeholder: inputProps.placeholder,
  /** 与 Input 保持一致的 disabled 契约。 */
  disabled: inputProps.disabled,
  /** 与 Input 保持一致的 readonly 契约。 */
  readonly: inputProps.readonly,
  /** 与 Input 保持一致的 variant 契约。 */
  variant: inputProps.variant,
  /** 与 Input 保持一致的 size 契约。 */
  size: inputProps.size,
  /** 与 Input 保持一致的 error 契约。 */
  error: inputProps.error,
  /** 与 Input 保持一致的 maxLength 契约。 */
  maxLength: inputProps.maxLength,
  /** 与 Input 保持一致的 showWordLimit 契约。 */
  showWordLimit: inputProps.showWordLimit,
  /** 与 Input 保持一致的 clearable 契约。 */
  clearable: inputProps.clearable,
  /** 与 Input 保持一致的 wordLength 契约。 */
  wordLength: inputProps.wordLength,
  /** 与 Input 保持一致的 wordSlice 契约。 */
  wordSlice: inputProps.wordSlice,
  /** 与 Input 保持一致的 ariaLabel 契约。 */
  ariaLabel: inputProps.ariaLabel,
  /** 与 Input 保持一致的 autofocus 契约。 */
  autofocus: inputProps.autofocus,
  /** 与 Input 保持一致的 enterkeyhint 契约。 */
  enterkeyhint: inputProps.enterkeyhint,
  /** 与 Input 保持一致的 hint 契约。 */
  hint: inputProps.hint,
  /** 与 Input 保持一致的 line 契约。 */
  line: inputProps.line,
  /** 与 Input 保持一致的 textColor 契约。 */
  textColor: inputProps.textColor,
  /** 与 Input 保持一致的 focusColor 契约。 */
  focusColor: inputProps.focusColor,
  /** 与 Input 保持一致的 blurColor 契约。 */
  blurColor: inputProps.blurColor,
  /** 原生文本域行数。 */
  rows: [String, Number],
  /** 允许垂直调整高度；autoSize 开启时忽略。 */
  resize: { type: Boolean, default: textareaDefaults.resize },
  /** 按内容调整高度，可限制最小/最大行数。 */
  autoSize: { type: [Boolean, Object] as PropType<boolean | TextareaAutoSize>, default: false },
  /** 原生属性；受控值、状态和组件事件不可覆盖。 */
  textareaAttrs: Object as PropType<Record<string, unknown>>,
}
export type TextareaProps = ExtractPublicPropTypes<typeof textareaProps>
