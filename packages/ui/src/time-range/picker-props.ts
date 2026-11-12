import { type ExtractPropTypes, type PropType } from 'vue'
import { timePickerFieldsProp } from '../_components/picker-field/fields'
import { props as pickerPropsSource } from '../picker/props'
import { timeDisabledProps } from '../time/disabled-props'
import type { TimeWheelPresentationProps } from '../time/presentation-props'
import { timeStepProp } from '../time/step-prop'
import type { TimeValue } from '../time/time-value'

export type TimeRangePickerPresentation = 'picker'

export const props = {
  timeFields: timePickerFieldsProp,
  /** 隐藏禁用的时间选项。 */
  hideDisabledOptions: Boolean,
  /** 跳过确认，选择后立即提交。 */
  disableConfirm: Boolean,
  /** 非受控初始值，仅在初始化读取。 */
  defaultValue: Array as PropType<TimeValue[]>,
  modelValue: {
    type: Array as PropType<TimeValue[]>,
    default: undefined,
  },
  presentation: {
    type: String as PropType<TimeRangePickerPresentation>,
    default: 'picker',
  },
  /** 字符串解析、显示及输出格式；默认 HH:mm:ss。 */
  format: String,
  /** 使用十二小时面板；未传 format 时默认 hh:mm:ss a。 */
  use12Hours: Boolean,
  step: timeStepProp,
  min: String,
  max: String,
  ...timeDisabledProps,
  pickerProps: {
    type: Object as PropType<TimeWheelPresentationProps<Partial<ExtractPropTypes<typeof pickerPropsSource>>>>,
    default: () => ({}),
  },
  showNowButton: { type: Boolean, default: true },
  showNextDay: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  elevation: {
    type: [Boolean, Number],
    default: false,
  },
}

export type TimeRangePickerProps = import('vue').ExtractPublicPropTypes<typeof props>

export type { TimePickerField } from '../_components/picker-field/fields'
