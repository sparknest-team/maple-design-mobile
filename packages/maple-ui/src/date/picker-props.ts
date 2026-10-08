import type { PropType } from 'vue'
import { dateRuleProps, dateSingleValueProps } from './core-props'
import type { DateValue } from './date-value'
import { props as presentationProps } from './presentation-props'

export type {
  DatePickerPresentation,
  TouchDirection,
  Month,
  Week,
  ComponentProps,
  PanelBtnDisabled,
  Choose,
  Preview,
} from './presentation-props'
export { MONTH_LIST, WEEK_HEADER } from './presentation-props'
export const props = {
  ...presentationProps,
  ...dateRuleProps,
  ...dateSingleValueProps,
  modelValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  defaultValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  type: presentationProps.type,
  disabled: { type: Boolean, default: undefined },
}
export type DatePickerProps = import('vue').ExtractPublicPropTypes<typeof props>
