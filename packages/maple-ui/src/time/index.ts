import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timePickerProps } from './picker-props'
import { props as timeProps } from './props'
import _Time from './Time.vue'
import TimePicker from './TimePicker.vue'

const Time = withInstall(
  _Time,
  Object.assign(_Time, {
    Picker: TimePicker,
  }),
  { components: [_Time, TimePicker] },
)

withPropsDefaultsSetter(Time, timeProps)
withPropsDefaultsSetter(TimePicker, timePickerProps)

export { timeProps, timePickerProps, TimePicker }

export type TimeInstance = InstanceType<typeof _Time>
export type TimePickerInstance = InstanceType<typeof TimePicker>
export type { TimeProps } from './props'
export type { DisabledTime, Format, Time as TimeValue, TimePickerPresentation } from './picker-props'

export const _TimeComponent = Time
export const _TimePickerComponent = TimePicker

export default Time
