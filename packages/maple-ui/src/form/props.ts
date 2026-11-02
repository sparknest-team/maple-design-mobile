import { type PropType } from 'vue'
import { fieldEditModeProp, readPrettyProp } from '../_components/field-presentation/context'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { emptyTextProp, emptyValuesProp } from '../utils/empty-value'
import { formLayoutProps } from './layout-props'
import type { FormLayout } from './layout-props'

export type FormScrollToError = 'start' | 'end'

export type { FormLayout, FormLabelAlign } from './layout-props'
export type FormRules = Record<string, unknown | unknown[]>

export const props = {
  /** 表单内字段的统一编辑模式；未设置时保留各字段默认值。 */
  editMode: fieldEditModeProp,
  readPretty: readPrettyProp,
  /** 模型空值识别；不改变受控判定或清空输出。 */
  emptyValues: emptyValuesProp,
  /** 纯阅读空值文案；字段 > FormItem > Form，缺省为 '-'。 */
  emptyText: emptyTextProp,
  ...formLayoutProps,
  /** 表单 id 及显式字段容器 id 前缀。 */
  id: String,
  model: Object as PropType<Record<string, any>>,
  layout: {
    type: String as PropType<FormLayout>,
    default: 'vertical',
  },
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  size: {
    type: String as PropType<ComponentSize>,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  rules: Object as PropType<FormRules>,
  scrollToError: String as PropType<FormScrollToError>,
  scrollToErrorOffsetY: {
    type: [String, Number],
    default: 0,
  },
}
