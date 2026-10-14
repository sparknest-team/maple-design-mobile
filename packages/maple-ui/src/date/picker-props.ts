import type { PropType } from 'vue'
import { dateRuleProps, dateSingleValueProps } from './core-props'
import { dateNowProps } from './date-current'
import type { DateValue } from './date-value'
import { datePanelProps } from './panel-props'
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
  ...datePanelProps,
  ...dateNowProps,
  ...dateSingleValueProps,
  modelValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  defaultValue: [String, Number, Date, Array] as PropType<DateValue | DateValue[]>,
  type: presentationProps.type,
  disabled: { type: Boolean, default: undefined },
}
export type DatePickerProps = import('vue').ExtractPublicPropTypes<typeof props>

export type DatePickerType = NonNullable<DatePickerProps['type']>
/** 字段嵌套设置；模型、规则和 presentation 由根拥有。 */
export type DatePickerOptions = Omit<
  DatePickerProps,
  | keyof typeof dateRuleProps
  | 'modelValue'
  | 'defaultValue'
  | 'disabled'
  | 'readonly'
  | 'multiple'
  | 'range'
  | 'presentation'
>
