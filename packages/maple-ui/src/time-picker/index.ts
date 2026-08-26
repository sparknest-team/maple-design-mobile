import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as timePickerProps } from './props'
import TimePicker from './TimePicker.vue'

withInstall(TimePicker)
withPropsDefaultsSetter(TimePicker, timePickerProps)

export { timePickerProps }

export type TimePickerInstance = InstanceType<typeof TimePicker>
export const _TimePickerComponent = TimePicker

export default TimePicker
