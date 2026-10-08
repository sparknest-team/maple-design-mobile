import type { PropType } from 'vue'
import { checkboxValueProps } from '../checkbox/choice-value-props'

export const props = {
  ...checkboxValueProps,
  checkedColor: String,
  uncheckedColor: String,
  /** 是否禁用；未设置时继承分组或表单 */
  disabled: { type: Boolean, default: undefined },
  /** 是否只读；未设置时继承分组或表单 */
  readonly: { type: Boolean, default: undefined },
  /** 错误态；未设置时继承表单 */
  error: { type: Boolean, default: undefined },
  indeterminate: Boolean,
  iconSize: [String, Number],
  ripple: {
    type: Boolean,
    default: true,
  },
}

export interface CheckboxMethods {
  toggle(checked?: boolean): void
  focus(options?: FocusOptions): void
  blur(): void
}
export type { CheckboxModel } from '../checkbox/choice-value-props'
