import type { PropType } from 'vue'
import { emptyValueProp } from '../utils/empty-value'
import type { DateFormatMode } from './date-format'
import type { DateRules } from './date-rules'
import type { DateValue, DateValueOptions } from './date-value'

export const dateRuleProps = {
  /** 日期精度；展示方式由各端 presentation 文件决定。 */
  type: {
    type: String as PropType<DateFormatMode>,
    default: 'date',
    validator: (value: string) => ['date', 'year', 'quarter', 'month', 'week'].includes(value),
  },
  timeZone: String,
  showTime: Boolean,
  format: [String, Function] as PropType<DateValueOptions['format']>,
  valueFormat: String,
  min: [String, Number, Date] as PropType<DateValue>,
  max: [String, Number, Date] as PropType<DateValue>,
  disabledDate: Function as PropType<DateRules['disabledDate']>,
  disabledTime: Function as PropType<DateRules['disabledTime']>,
  /** 默认选择即提交；设为 false 可先预览再确认。字段弹层另行控制提交。 */
  disableConfirm: { type: Boolean, default: true },
}
export const dateSingleValueProps = {
  emptyValue: emptyValueProp<DateValue | undefined>(),
  modelValue: [String, Number, Date] as PropType<DateValue | null>,
  defaultValue: [String, Number, Date] as PropType<DateValue>,
}
export const dateRangeValueProps = {
  emptyValue: emptyValueProp<(DateValue | undefined)[] | undefined>(),
  modelValue: Array as PropType<(DateValue | undefined)[] | null>,
  defaultValue: Array as PropType<(DateValue | undefined)[]>,
}
