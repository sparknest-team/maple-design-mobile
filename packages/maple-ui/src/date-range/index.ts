import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _DateRange from './DateRange.vue'
import DateRangePicker from './DateRangePicker.vue'
import { props as dateRangePickerProps } from './picker-props'
import { props as dateRangeProps } from './props'

const DateRange: typeof _DateRange & {
  Picker: typeof DateRangePicker
  install?: (app: import('vue').App) => void
} = withInstall(
  _DateRange,
  Object.assign(_DateRange, {
    Picker: DateRangePicker,
  }),
  { components: [_DateRange, DateRangePicker] },
)

withPropsDefaultsSetter(DateRange, dateRangeProps)
withPropsDefaultsSetter(DateRangePicker, dateRangePickerProps)

export { dateRangeProps, dateRangePickerProps, DateRangePicker }

export type DateRangeInstance = InstanceType<typeof _DateRange>
export type DateRangePickerInstance = InstanceType<typeof DateRangePicker>
export type { DateRangeProps, DateRangeType, DateRangePresentation } from './props'
export type { DateRangePickerProps, DateRangePickerPresentation, DateRangePickerType } from './picker-props'

export const _DateRangeComponent: typeof DateRange = DateRange
export const _DateRangePickerComponent: typeof DateRangePicker = DateRangePicker

export default DateRange

export type { DateValue, DateSelection, DateSide, DateValueOptions } from '../date/date-value'
export type { DateDisabledTime, DateRules } from '../date/date-rules'
