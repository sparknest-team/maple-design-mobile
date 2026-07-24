import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timeRangePickerProps } from './props'
import TimeRangePicker from './TimeRangePicker.vue'

withInstall(TimeRangePicker)
withPropsDefaultsSetter(TimeRangePicker, timeRangePickerProps)

export type TimeRangePickerInstance = InstanceType<typeof TimeRangePicker>
export type { TimeRangePickerProps, TimeRangePickerPresentation } from './props'
export { timeRangePickerProps }

export const _TimeRangePickerComponent = TimeRangePicker

export default TimeRangePicker
