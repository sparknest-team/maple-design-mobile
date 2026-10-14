import type { ExtractPublicPropTypes, InputHTMLAttributes, PropType } from 'vue'
import { choiceOptionsProps, radioGroupValueProps } from '../checkbox/choice-group-props'
import { radioValueProps } from '../checkbox/choice-value-props'
import { componentSizes } from '../utils/constants'
import type { ComponentSize, Orientation } from '../utils/constants'
import { radioVariantProp } from './variant'

export type RadioValue = import('../checkbox/choice-value-props').ChoiceValue
export const radioProps = {
  ...radioValueProps,
  /** 外观，分组设置优先。 */
  variant: radioVariantProp,
  /** 状态缺省时继承分组/表单。 */
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  error: { type: Boolean, default: undefined },
  /** 实例颜色及图标长度，number 为 px。 */
  checkedColor: String,
  uncheckedColor: String,
  iconSize: [String, Number],
  /** 触控水波纹。 */
  ripple: { type: Boolean, default: true },
  /** 原生表单字段名；缺省继承分组。 */
  name: String,
  /** 原生 input 属性，受控状态由组件管理。 */
  inputAttrs: Object as PropType<InputHTMLAttributes>,
  /** 无障碍名称。 */
  ariaLabel: String,
  /** 内部复合控件隔离分组上下文。 */
  uninjectGroupContext: { type: Boolean, default: false },
}
export const radioGroupProps = {
  ...radioGroupValueProps,
  ...choiceOptionsProps,
  ariaLabel: { type: String, default: '' },
  name: String,
  variant: radioVariantProp,
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: unknown) => componentSizes.includes(value as ComponentSize),
  },
  direction: { type: String as PropType<Orientation>, default: 'horizontal' },
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  error: { type: Boolean, default: undefined },
}
export type RadioProps = ExtractPublicPropTypes<typeof radioProps>
export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>
export interface RadioMethods {
  select(): void
  focus(options?: FocusOptions): void
  blur(): void
}
export type { RadioModel } from '../checkbox/choice-value-props'

export type RadioEmits = {
  'update:modelValue': [value: RadioValue]
  change: [value: RadioValue, event?: Event]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
export type RadioGroupEmits = {
  'update:modelValue': [value: import('../checkbox/choice-value-props').RadioModel]
  change: [value: import('../checkbox/choice-value-props').RadioModel, event?: Event]
}
export interface RadioSlots {
  default?: (state: { checked: boolean; disabled: boolean }) => import('vue').VNodeChild
  radio?: (state: { checked: boolean; disabled: boolean }) => import('vue').VNodeChild
  'checked-icon'?: () => import('vue').VNodeChild
  'unchecked-icon'?: () => import('vue').VNodeChild
}
export interface RadioGroupSlots {
  default?: () => import('vue').VNodeChild
  label?: (state: { data: import('./types').RadioOption; checked: boolean }) => import('vue').VNodeChild
  radio?: RadioSlots['radio']
}
