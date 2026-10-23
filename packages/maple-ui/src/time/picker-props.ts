import type { PropType } from 'vue'
import { timeDisabledProps } from './disabled-props'
import type { TimeWheelPresentationProps } from './presentation-props'
import { timeStepProp } from './step-prop'
import type { TimeValue } from './time-value'

export const props = {
  /** 显示此刻按钮；此刻仅更新草稿，仍需确认。 */
  showNowButton: { type: Boolean, default: true },
  /** 隐藏禁用的时间选项。 */
  hideDisabledOptions: Boolean,
  /** 跳过确认，选择后立即提交。 */
  disableConfirm: Boolean,
  /** 非受控初始值，仅在初始化读取。 */
  defaultValue: [String, Number, Date] as PropType<TimeValue>,
  modelValue: [String, Number, Date] as PropType<TimeValue>,
  pickerProps: Object as PropType<TimeWheelPresentationProps<Record<string, unknown>>>,
  elevation: {
    type: [Boolean, Number],
    default: false,
  },
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
