import { type PropType } from 'vue'
import { fieldEditModeProp, readPrettyProp } from '../_components/field-presentation/context'
import type { RowProps } from '../row/props'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { emptyTextProp, emptyValuesProp } from '../utils/empty-value'
import { formItemDecorationProps, type FormItemValidateStatus } from './item-decoration'
import { formItemLayoutProps } from './layout-props'
import { type FormLayout } from './props'
import { isFormRuleList } from './rule-validation'
import type { FormRule } from './types'
import type { ValidateTrigger as FormItemValidateTrigger } from './validate-trigger'

export type { ValidateTrigger as FormItemValidateTrigger } from './validate-trigger'

export type { FormItemAsteriskPosition } from './item-decoration'

export type FormItemLayout = FormLayout

export const props = {
  /** 编辑模式；未设置时继承 Form，字段可单独覆盖。 */
  editMode: fieldEditModeProp,
  readPretty: readPrettyProp,
  /** 模型空值识别；不改变受控判定或清空输出。 */
  emptyValues: emptyValuesProp,
  /** 纯阅读空值文案；字段 > FormItem > Form，缺省为 '-'。 */
  emptyText: emptyTextProp,
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
  rules: { type: [Array, Function, Object] as PropType<FormRule | FormRule[]>, validator: isFormRuleList },
  validateTrigger: {
    type: [String, Array] as PropType<FormItemValidateTrigger | FormItemValidateTrigger[]>,
    default: 'change',
  },
}
