import { type PropType } from 'vue'
import { radioValueProps } from '../checkbox/choice-value-props'
import { radioVariantProp } from './variant'

export const props = {
  ...radioValueProps,
  variant: radioVariantProp,
  disabled: { type: Boolean, default: undefined },
  /** 是否只读；未设置时继承分组或表单 */
  readonly: { type: Boolean, default: undefined },
  /** 错误态；未设置时继承表单 */
  error: { type: Boolean, default: undefined },
  checkedColor: String,
  uncheckedColor: String,
  iconSize: [String, Number],
  ripple: {
    type: Boolean,
    default: true,
  },
}

export interface RadioMethods {
  select(): void
  focus(options?: FocusOptions): void
  blur(): void
}
export type { RadioModel } from '../checkbox/choice-value-props'
