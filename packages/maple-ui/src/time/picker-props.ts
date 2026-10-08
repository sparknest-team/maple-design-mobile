import type { PropType } from 'vue'
import { timeDisabledProps } from './disabled-props'
import type { TimeWheelPresentationProps } from './presentation-props'
import { timeStepProp } from './step-prop'
import type { TimeValue } from './time-value'

export type ClockFormat = 'ampm' | '24hr'
export type TimePickerPresentation = 'picker' | 'clock'
export type AmPm = 'am' | 'pm'
export type Time = {
  hour: string
  minute: string
  second?: string
}

export const hoursAmpm = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
export const hours24 = ['00', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
export const minSec = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']

export const props = {
  /** 隐藏禁用的时间选项；时钟保留刻度角度。 */
  hideDisabledOptions: Boolean,
  /** 跳过确认，选择后立即提交。 */
  disableConfirm: Boolean,
  /** 非受控初始值，仅在初始化读取。 */
  defaultValue: [String, Number, Date] as PropType<TimeValue>,
  modelValue: [String, Number, Date] as PropType<TimeValue>,
  presentation: {
    type: String as PropType<TimePickerPresentation>,
    default: 'picker',
  },
  pickerProps: Object as PropType<TimeWheelPresentationProps<Record<string, unknown>>>,
  elevation: {
    type: [Boolean, Number],
    default: false,
  },
  hint: String,
  color: String,
  titleColor: String,
  /** 字符串解析、显示及输出格式；默认 HH:mm:ss。 */
  format: String,
  /** 十二小时面板。 */
  use12Hours: Boolean,
  ...timeDisabledProps,
  min: String,
  max: String,
  step: timeStepProp,
  disabled: Boolean,
  readonly: Boolean,
}
