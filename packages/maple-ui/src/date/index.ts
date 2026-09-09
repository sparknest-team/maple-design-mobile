import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Date from './Date.vue'
import DatePicker from './DatePicker.vue'
import { props as datePickerProps } from './picker-props'
import { props as dateProps } from './props'

const Date = withInstall(
  _Date,
  Object.assign(_Date, {
    Picker: DatePicker,
  }),
  { components: [_Date, DatePicker] },
)

withPropsDefaultsSetter(Date, dateProps)
withPropsDefaultsSetter(DatePicker, datePickerProps)

export { dateProps, datePickerProps, DatePicker }

export type DateInstance = InstanceType<typeof _Date>
export type DatePickerInstance = InstanceType<typeof DatePicker>
export type { DateProps, DateType } from './props'
export type { DatePickerPresentation } from './picker-props'

export const _DateComponent: typeof Date = Date
export const _DatePickerComponent: typeof DatePicker = DatePicker

export default Date
export type DatePickerProps = import('vue').ExtractPublicPropTypes<typeof import('./picker-props').props>
