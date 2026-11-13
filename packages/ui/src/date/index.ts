import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _DatePicker from './DatePicker.vue'
import { props as datePickerProps } from './picker-props'
import _Date from './presentation'
import { props as dateProps } from './props'

const DatePicker: import('../utils/components').ComponentWithInstall<typeof _DatePicker> = withInstall(_DatePicker)

const Date: import('../utils/components').ComponentWithInstall<typeof _Date & { Picker: typeof DatePicker }> =
  withInstall(
    _Date,
    Object.assign(_Date, {
      Picker: DatePicker,
    }),
    { components: [_Date, DatePicker] },
  )

withPropsDefaultsSetter(Date, dateProps)
withPropsDefaultsSetter(DatePicker, datePickerProps)

export { dateProps, datePickerProps, DatePicker, Date }

export type DateInstance = InstanceType<typeof _Date>
export type DatePickerInstance = InstanceType<typeof DatePicker>
export type { DateProps, DateType } from './props'
export type { DatePickerPresentation } from './picker-props'

export const _DateComponent: typeof Date = Date
export const _DatePickerComponent: typeof DatePicker = DatePicker

export default Date
export type DatePickerProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./picker-props').props
>

export type { DateDisabledTime, DateRules } from './date-rules'

export type { DateValue, DateSelection, DateSide, DateValueOptions } from '../date/date-value'

export type { DatePickerType, DatePickerOptions } from './picker-props'
export type { DateWeekStart } from './panel-props'
export type { DateEventPayload, DateChangeArgs, DateEmits, DatePickerEmits } from './events'

export type { DateShortcut, DateShortcutsPosition } from './panel-tools-props'

export type { DateWheelOptions } from './wheel-options'

export type { CalendarInteractiveMode } from './calendar-viewport-props'

export type { DatePopupOptions } from './popup-options'

export type { DatePickerField } from '../_components/picker-field/fields'
