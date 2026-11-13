import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { fieldLoadingProps } from '../field-decorator/props'
import { inputProps, type InputVariant } from '../input/props'
import type { ComponentSize } from '../utils/constants'
import { emptyValueProp } from '../utils/empty-value'
import { isValidNumberMax, isValidNumberMin } from './number-value'

export const inputNumberModes = ['embed', 'button', 'input'] as const
export const inputNumberModelEvents = ['change', 'input'] as const
export type InputNumberMode = (typeof inputNumberModes)[number]
export type InputNumberModelEvent = (typeof inputNumberModelEvents)[number]
export type InputNumberSize = ComponentSize
export type InputNumberVariant = InputVariant
export type InputNumberFormatter = (value: string) => string
export type InputNumberParser = (value: string) => string

export const inputNumberProps = {
  ...fieldLoadingProps,
  /** 清空动作产生的模型值；省略保留原默认值。 */
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<number | undefined>(),
  /** 受控业务数值；空值为 undefined。 */
  modelValue: Number as PropType<number | null>,
  /** 非受控初始值。 */
  defaultValue: Number,
  /** 禁止手输，仍可使用步进按钮和方向键。 */
  disableInput: Boolean,
  /** 独立禁用增加或减少；按钮和方向键均遵守。 */
  disableIncrement: Boolean,
  disableDecrement: Boolean,
  /** 是否显示增加／减少按钮。 */
  incrementButton: { type: Boolean, default: true },
  decrementButton: { type: Boolean, default: true },
  /** 是否开启长按连续步进。 */
  press: { type: Boolean, default: true },
  /** 按钮布局。 */
  mode: {
    type: String as PropType<InputNumberMode>,
    default: 'embed',
    validator: (value: InputNumberMode) => inputNumberModes.includes(value),
  },
  /** 小数精度，范围 0–100，不小于步长的小数位数。 */
  precision: { type: Number, validator: (value: number) => Number.isInteger(value) && value >= 0 && value <= 100 },
  /** 正的有限步长。 */
  step: { type: Number, default: 1, validator: (value: number) => Number.isFinite(value) && value > 0 },
  /** 未设置时继承 Group / FormItem / Form。 */
  disabled: inputProps.disabled,
  /** 未设置时继承 FormItem。 */
  error: inputProps.error,
  /** 最大值。 */
  max: {
    type: Number,
    default: Infinity,
    validator: (value: number, props: Readonly<{ min?: unknown }> = {}) =>
      isValidNumberMax(value) && (!isValidNumberMin(props.min) || props.min <= value),
  },
  /** 最小值。 */
  min: {
    type: Number,
    default: -Infinity,
    validator: (value: number, props: Readonly<{ max?: unknown }> = {}) =>
      isValidNumberMin(value) && (!isValidNumberMax(props.max) || value <= props.max),
  },
  /** 格式化展示文本，不改变业务数字。 */
  formatter: Function as PropType<InputNumberFormatter>,
  /** 每次编辑只解析一次原始文本。 */
  parser: Function as PropType<InputNumberParser>,
  /** 提示文字。 */
  placeholder: inputProps.placeholder,
  /** 五档尺寸，未设置时继承。 */
  size: inputProps.size,
  /** 字段外观，未设置时继承 Group，默认 outline。 */
  variant: inputProps.variant,
  /** 浮动提示，未设置时继承 Group 和 FieldDecorator 默认值。 */
  hint: inputProps.hint,
  /** 是否允许清空。 */
  clearable: inputProps.clearable,
  /** model 更新时机；change 始终表示提交。 */
  modelEvent: {
    type: String as PropType<InputNumberModelEvent>,
    default: 'change',
    validator: (value: InputNumberModelEvent) => inputNumberModelEvents.includes(value),
  },
  /** 未设置时继承 Group / FormItem / Form。 */
  readonly: inputProps.readonly,
  /** 原生 input 补充属性，受控状态由组件决定。 */
  inputAttrs: inputProps.inputAttrs,
}
export type InputNumberProps = ExtractPublicPropTypes<typeof inputNumberProps>
