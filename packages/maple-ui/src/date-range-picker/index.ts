import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import DateRangePicker from './DateRangePicker.vue'
import { props as dateRangePickerProps } from './props'

withInstall(DateRangePicker)
withPropsDefaultsSetter(DateRangePicker, dateRangePickerProps)

export type DateRangePickerInstance = InstanceType<typeof DateRangePicker>
export type { DateRangePickerProps, DateRangePickerPresentation, DateRangePickerType } from './props'
export { dateRangePickerProps }

export const _DateRangePickerComponent = DateRangePicker

export default DateRangePicker
