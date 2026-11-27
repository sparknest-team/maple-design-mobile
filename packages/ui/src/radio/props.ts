import type { InputHTMLAttributes, PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { choiceIconSizeProp, choiceOrientationProp } from '../checkbox/choice-appearance-props'
import { choiceOptionsProps, radioGroupValueProps } from '../checkbox/choice-group-props'
import { radioValueProps } from '../checkbox/choice-value-props'
import { componentSizes } from '../utils/constants'
import type { ComponentSize } from '../utils/constants'
import { emptyValueProp } from '../utils/empty-value'
import { radioVariantProp } from './variant'

export type RadioValue = string | number | boolean
export const radioProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<string | number | boolean | null>(),
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
  iconSize: choiceIconSizeProp,
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
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<string | number | boolean | null>(),
  ...radioGroupValueProps,
  ...choiceOptionsProps,
  ariaLabel: { type: String, default: '' },
  name: String,
  variant: radioVariantProp,
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: unknown) => componentSizes.includes(value as ComponentSize),
  },
  orientation: choiceOrientationProp,
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

export type { RadioEmits, RadioGroupEmits, RadioSlots, RadioGroupSlots } from './types'
