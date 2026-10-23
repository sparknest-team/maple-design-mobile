import type { PropType } from 'vue'
import { dateRuleProps } from './core-props'
import { dateCurrentProps } from './date-current'
import { dateLabelProps } from './date-labels'
import { datePanelToolsProps } from './panel-tools-props'

export type DateWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** Pure panel capabilities; field/portal props must never leak into this object. */
export const datePanelProps = {
  ...dateRuleProps,
  ...datePanelToolsProps,
  ...dateCurrentProps,
  ...dateLabelProps,
  readonly: Boolean,
  disabled: Boolean,
  /** 每周第一天，0 为周日；仅日历展示使用。 */
  dayStartOfWeek: {
    type: Number as PropType<DateWeekStart>,
    default: 0,
    validator: (value: number) => Number.isInteger(value) && value >= 0 && value <= 6,
  },
}
