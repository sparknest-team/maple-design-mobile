import { type PropType } from 'vue'
import { fieldPresentationProp, readPrettyProp } from '../_components/field-presentation/context'
import type { RowProps } from '../row/props'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { formItemDecorationProps, type FormItemValidateStatus } from './item-decoration'
import { formItemLayoutProps } from './layout-props'
import { type FormLayout } from './props'
import type { ValidateTrigger as FormItemValidateTrigger } from './validate-trigger'

export type { ValidateTrigger as FormItemValidateTrigger } from './validate-trigger'

export type { FormItemAsteriskPosition } from './item-decoration'

export type FormItemLayout = FormLayout

export const props = {
  /** 字段展示方式，未设置时继承上层。 */
  presentation: fieldPresentationProp,
  readPretty: readPrettyProp,
  ...formItemLayoutProps,
  ...formItemDecorationProps,
  /** 表单项 Row 配置。 */
  rowProps: Object as PropType<RowProps>,
  /** 表单项布局容器的 class。 */
  rowClass: [String, Array, Object],
  field: {
    type: String,
    default: '',
  },
  label: String,
  required: Boolean,
  hideLabel: Boolean,
  hideAsterisk: Boolean,
  help: String,
  /** 在支持的表单控件内显示校验反馈图标。 */
  feedback: Boolean,
  /** 显式覆盖校验展示状态。 */
  validateStatus: String as PropType<FormItemValidateStatus>,
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
