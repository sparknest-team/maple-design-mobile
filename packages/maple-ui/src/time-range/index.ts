import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timeRangePickerProps } from './picker-props'
import { props as timeRangeProps } from './props'
import _TimeRange from './TimeRange.vue'
import TimeRangePicker from './TimeRangePicker.vue'

const TimeRange = withInstall(
  _TimeRange,
  Object.assign(_TimeRange, {
    Picker: TimeRangePicker,
  }),
  { components: [_TimeRange, TimeRangePicker] },
)

withPropsDefaultsSetter(TimeRange, timeRangeProps)
withPropsDefaultsSetter(TimeRangePicker, timeRangePickerProps)

export { timeRangeProps, timeRangePickerProps, TimeRangePicker }

export type TimeRangeInstance = InstanceType<typeof _TimeRange>
export type TimeRangePickerInstance = InstanceType<typeof TimeRangePicker>
export type { TimeRangeProps, TimeRangePresentation } from './props'
export type { TimeRangePickerProps, TimeRangePickerPresentation } from './picker-props'

export const _TimeRangeComponent = TimeRange
export const _TimeRangePickerComponent = TimeRangePicker

export default TimeRange
