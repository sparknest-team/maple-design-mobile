import { type PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { type FormLayout } from './props'
import type { ValidateTrigger as FormItemValidateTrigger } from './validate-trigger'

export type { ValidateTrigger as FormItemValidateTrigger } from './validate-trigger'

export type FormItemAsteriskPosition = 'start' | 'end'

export type FormItemLayout = FormLayout

export const props = {
  field: {
    type: String,
    default: '',
  },
  label: String,
  layout: String as PropType<FormItemLayout>,
  required: Boolean,
  hideLabel: Boolean,
  hideAsterisk: Boolean,
  asteriskPosition: {
    type: String as PropType<FormItemAsteriskPosition>,
    default: 'start',
  },
  help: String,
  /** 在支持的表单控件内显示校验反馈图标。 */
  feedback: Boolean,
  /** 显式覆盖校验展示状态。 */
  validateStatus: String as PropType<'success' | 'warning' | 'error' | 'validating'>,
  extra: String,
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  noStyle: Boolean,
  rules: [Array, Function, Object] as PropType<any>,
  validateTrigger: {
    type: [String, Array] as PropType<FormItemValidateTrigger | FormItemValidateTrigger[]>,
    default: 'change',
  },
}
