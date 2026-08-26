import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import DatePicker from './DatePicker.vue'
import { props as datePickerProps } from './props'

withInstall(DatePicker)
withPropsDefaultsSetter(DatePicker, datePickerProps)

export { datePickerProps }

export type DatePickerInstance = InstanceType<typeof DatePicker>
export const _DatePickerComponent = DatePicker

export default DatePicker
