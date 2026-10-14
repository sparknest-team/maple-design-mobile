import { type PropType } from 'vue'
import type { DisabledTime } from './time-constraints'
import type { DateTimePickerOptions } from './time-picker-options'
import type { DateWheelOptions } from './wheel-options'

type DisabledDate = (val: string) => boolean

type DatePickerType = 'year' | 'date' | 'month'

export type DatePickerPresentation = 'calendar' | 'picker' | 'calendarClock' | 'calendarPicker'

export type TouchDirection = 'x' | 'y'

export type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'

export type Week = '0' | '1' | '2' | '3' | '4' | '5' | '6'

export type ComponentProps = {
  type: string
  disabledDate: DisabledDate | undefined
  color: string | undefined
  dayStartOfWeek: number
  max: string | undefined
  min: string | undefined
  abbreviation: boolean
  showCurrent: boolean
  multiple: boolean
  range: boolean
  buttonElevation: boolean | number
}

export type PanelBtnDisabled = {
  left: boolean
  right: boolean
}

export type Choose = {
  chooseMonth: Month | undefined
  chooseYear: string | undefined
  chooseDay: string | undefined
  chooseYears: Array<string>
  chooseMonths: Array<string>
  chooseDays: Array<string>
  chooseRangeYear: Array<string>
  chooseRangeMonth: Array<string>
  chooseRangeDay: Array<string>
}

export type Preview = {
  previewMonth?: Month
  previewYear: string
}

export const MONTH_LIST: Array<Month> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export const WEEK_HEADER: Array<Week> = ['0', '1', '2', '3', '4', '5', '6']

export const props = {
  pickerProps: { type: Object as PropType<DateWheelOptions>, default: () => ({}) },
  abbreviation: { type: Boolean, default: true },
  pickerValue: [String, Array] as PropType<string | string[]>,
  modelValue: [String, Array] as PropType<string | Array<string>>,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
  },
  presentation: {
    type: String as PropType<DatePickerPresentation>,
    default: 'picker',
  },
  showTime: Boolean,
  useSeconds: Boolean,
  hint: String,
  disabledDate: Function as PropType<DisabledDate>,
  // Maple DisabledTime is `(n)=>boolean` object shape (mobile clock); Cedar DatePicker DisabledTime is Date-based — intentional signature difference, shared name/polarity.
  disabledTime: Object as PropType<DisabledTime>,
  timePickerProps: {
    type: Object as PropType<DateTimePickerOptions>,
    default: () => ({}),
  },
  color: String,
  titleColor: String,
  elevation: {
    type: [Boolean, Number],
    default: false,
  },
  buttonElevation: {
    type: [Boolean, Number],
    default: true,
  },
  dayStartOfWeek: {
    type: Number,
    default: 0,
  },
  min: String,
  max: String,
  showCurrent: {
    type: Boolean,
    default: true,
  },
  readonly: Boolean,
  multiple: Boolean,
  range: Boolean,
  touchable: {
    type: Boolean,
    default: true,
  },
}
