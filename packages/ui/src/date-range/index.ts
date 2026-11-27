import { withInstall } from '../utils/components'
import _DateRangePicker from './DateRangePicker.vue'
import { props as dateRangePickerProps } from './picker-props'
import _DateRange from './presentation'
import { props as dateRangeProps } from './props'

const DateRangePicker: import('../utils/components').ComponentWithInstall<typeof _DateRangePicker> =
  withInstall(_DateRangePicker)

const DateRange: import('../utils/components').ComponentWithInstall<
  typeof _DateRange & { Picker: typeof DateRangePicker }
> = withInstall(
  _DateRange,
  Object.assign(_DateRange, {
    Picker: DateRangePicker,
  }),
  { components: [_DateRange, DateRangePicker] },
)

export { dateRangeProps, dateRangePickerProps, DateRangePicker, DateRange }

export type DateRangeInstance = InstanceType<typeof _DateRange>
export type DateRangePickerInstance = InstanceType<typeof DateRangePicker>
export type { DateRangeProps, DateRangeType, DateRangeEditMode } from './props'
export type { DateRangePickerProps, DateRangePickerPresentation } from './picker-props'

export const _DateRangeComponent: typeof DateRange = DateRange
export const _DateRangePickerComponent: typeof DateRangePicker = DateRangePicker

export default DateRange

export type { DateValue, DateSide, DateValueOptions } from '../date/date-value'
export type { DateDisabledTime, DateRules } from '../date/date-rules'

export type { DateRangePickerType, DateRangePickerOptions } from './picker-props'
export type { DateRangeEmits, DateRangePickerEmits } from '../date/events'

export type { DateRangeCalendarOptions } from './calendar-options'

export type { DateWheelOptions } from '../date/wheel-options'

export type { DateRangePopupOptions } from './popup-options'

export type { DatePickerField } from '../_components/picker-field/fields'

export type { RangeInputAttributes } from '../_components/picker-field/props'
