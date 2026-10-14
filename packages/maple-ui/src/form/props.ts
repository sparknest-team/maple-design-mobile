import { type PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { formLayoutProps } from './layout-props'
import type { FormLayout } from './layout-props'

export type FormScrollToError = 'start' | 'end'

export type { FormLayout, FormLabelAlign } from './layout-props'
export type FormRules = Record<string, unknown | unknown[]>

export const props = {
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
