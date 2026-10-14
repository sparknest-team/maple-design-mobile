import type { PropType } from 'vue'
import { dateRangeValueProps, dateRuleProps } from '../date/core-props'
import { dateRangeInteractionProps } from '../date/date-current'
import { datePanelProps } from '../date/panel-props'
import type { DateRangeCalendarOptions } from './calendar-options'
import { props as presentationProps } from './presentation-props'

export type { DateRangeCalendarOptions } from './calendar-options'

export type { DateRangePickerPresentation } from './presentation-props'

export const props = {
  ...presentationProps,
  ...datePanelProps,
  ...dateRangeInteractionProps,
  ...dateRangeValueProps,

  datePickerProps: {
    type: Object as PropType<DateRangeCalendarOptions>,
    default: () => ({}),
  },
  type: presentationProps.type,
  disabled: { type: [Boolean, Array] as PropType<boolean | boolean[]>, default: undefined },
}
export type DateRangePickerProps = import('vue').ExtractPublicPropTypes<typeof props>

export type DateRangePickerType = NonNullable<DateRangePickerProps['type']>
/** 范围字段嵌套设置；模型、规则和 presentation 由根拥有。 */
export type DateRangePickerOptions = Omit<
  DateRangePickerProps,
  keyof typeof dateRuleProps | 'modelValue' | 'defaultValue' | 'disabled' | 'readonly' | 'presentation'
>
