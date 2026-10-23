import type { ExtractPublicPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { beforeFieldCommitProp, fieldPresentationProp, readPrettyProp } from '../_components/field-presentation/context'
import { fieldVariants, type FieldDecoratorVariant } from '../field-decorator/props'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { popupContainerProp } from '../utils/popup-container'

export const inputTypes = ['text', 'password', 'number', 'tel', 'email'] as const
export const inputVariants = fieldVariants
export type InputType = (typeof inputTypes)[number]
export type InputVariant = FieldDecoratorVariant
export type InputMaxLength = number | { length: number; errorOnly?: boolean }
export type WordLength = (value: string) => number
export type WordSlice = (value: string, maxLength: number) => string

export const inputProps = {
  /** 字段展示方式，未设置时继承上层。 */
  presentation: fieldPresentationProp,
  readPretty: readPrettyProp,
  beforeCommit: beforeFieldCommitProp,
  popupContainer: popupContainerProp,
  open: { type: Boolean, default: undefined },
  defaultOpen: Boolean,
  /** 受控输入值。 */
  modelValue: String,
  /** v-model 修饰符，trim 在提交时生效。 */
  modelModifiers: { type: Object as PropType<{ trim?: boolean }>, default: () => ({}) },
  /** 非受控初始值。 */
  defaultValue: { type: String, default: '' },
  /** 输入类型，number 使用文本输入与归一化。 */
  type: {
    type: String as PropType<InputType>,
    default: 'text',
    validator: (value: InputType) => inputTypes.includes(value),
  },
  /** 继承 Group、Form 与全局配置的尺寸。 */
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  /** 外观，默认 outline，可继承 Group。 */
  variant: {
    type: String as PropType<InputVariant>,
    validator: (value: InputVariant) => inputVariants.includes(value),
  },
  /** 允许清除可编辑的非空输入。 */
  clearable: { type: Boolean, default: false },
  /** 禁用；未设置时继承。 */
  disabled: { type: Boolean, default: undefined },
  /** 只读；未设置时继承。 */
  readonly: { type: Boolean, default: undefined },
  /** 错误状态；未设置时继承 FormItem。 */
  error: { type: Boolean, default: undefined },
  /** 提示文字。 */
  placeholder: String,
  /** 启用浮动提示；未设置时继承 Group 和库默认值。 */
  hint: { type: Boolean, default: undefined },
  /** 显示边框或底线。 */
  line: { type: Boolean, default: true },
  /** 输入文字颜色。 */
  textColor: String,
  /** 聚焦颜色。 */
  focusColor: String,
  /** 失焦提示颜色。 */
  blurColor: String,
  /** 原生输入的可访问名称。 */
  ariaLabel: String,
  /** 初始自动聚焦。 */
  autofocus: Boolean,
  /** 虚拟键盘回车提示。 */
  enterkeyhint: String as PropType<InputHTMLAttributes['enterKeyHint']>,
  /** 最大长度或超限错误策略。 */
  maxLength: { type: [Number, Object] as PropType<InputMaxLength>, default: 0 },
  /** 显示字数统计。 */
  showWordLimit: { type: Boolean, default: false },
  /** 自定义计数。 */
  wordLength: Function as PropType<WordLength>,
  /** 自定义截断。 */
  wordSlice: Function as PropType<WordSlice>,
  /** 原生 input 属性，受控字段由组件决定。 */
  inputAttrs: Object as PropType<Record<string, unknown>>,
}

export const inputGroupProps = {
  /** 组内默认尺寸。 */
  size: inputProps.size,
  /** 组内默认变体，默认 filled。 */
  variant: inputProps.variant,
  /** 组内默认禁用状态。 */
  disabled: inputProps.disabled,
  /** 组内默认只读状态。 */
  readonly: inputProps.readonly,
  /** 组内默认浮动提示。 */
  hint: inputProps.hint,
}

export const inputPasswordProps = {
  ...inputProps,
  /** 受控密码可见性。 */
  visibility: { type: Boolean, default: undefined },
  /** 非受控初始密码可见性。 */
  defaultVisibility: { type: Boolean, default: false },
  /** 显示密码可见性切换按钮。 */
  visibilityToggle: { type: Boolean, default: true },
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>
export type InputGroupProps = ExtractPublicPropTypes<typeof inputGroupProps>
export type InputPasswordProps = ExtractPublicPropTypes<typeof inputPasswordProps>
