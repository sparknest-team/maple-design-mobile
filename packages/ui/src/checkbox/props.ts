import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { emptyValueProp } from '../utils/empty-value'
import { choiceIconSizeProp, choiceOrientationProp } from './choice-appearance-props'
import { checkboxGroupValueProps, choiceOptionsProps } from './choice-group-props'
import { checkboxValueProps } from './choice-value-props'

export type CheckboxValue = string | number | boolean
export const checkboxProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<boolean | (string | number | boolean)[] | null>(),
  ...checkboxValueProps,
  /** 是否禁用；未设置时继承分组或表单 */
  disabled: { type: Boolean, default: undefined },
  /** 是否只读；未设置时继承分组或表单 */
  readonly: { type: Boolean, default: undefined },
  /** 错误态；未设置时继承分组或表单 */
  error: { type: Boolean, default: undefined },
  /** 是否半选 */
  indeterminate: { type: Boolean, default: false },
  /** 是否脱离外层 CheckboxGroup */
  uninjectGroupContext: { type: Boolean, default: false },
  /** 实例选中颜色，错误和禁用状态优先 */
  checkedColor: String,
  /** 实例未选中颜色，错误和禁用状态优先 */
  uncheckedColor: String,
  /** 图标尺寸；数字为 px，字符串为 CSS 长度 */
  iconSize: choiceIconSizeProp,
  /** 是否启用点击波纹 */
  ripple: { type: Boolean, default: true },
  /** 原生表单字段名 */
  name: String,
  /** 无可见标签时的无障碍名称 */
  ariaLabel: String,
}
export const checkboxGroupProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<(string | number | boolean)[]>(),
  ...checkboxGroupValueProps,
  ...choiceOptionsProps,
  /** 组内排列方向 */
  orientation: choiceOrientationProp,
  /** 是否禁用；未设置时继承表单 */
  disabled: { type: Boolean, default: undefined },
  /** 是否只读；未设置时继承表单 */
  readonly: { type: Boolean, default: undefined },
  /** 错误态；未设置时继承表单 */
  error: { type: Boolean, default: undefined },
  /** 传递给组内原生输入的字段名 */
  name: String,
  /** 分组无障碍名称 */
  ariaLabel: String,
}
export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>
export type CheckboxGroupProps = ExtractPublicPropTypes<typeof checkboxGroupProps>
export interface CheckboxMethods {
  toggle(checked?: boolean): void
  focus(options?: FocusOptions): void
  blur(): void
}
