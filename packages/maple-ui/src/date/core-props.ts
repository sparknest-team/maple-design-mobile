import type { PropType } from 'vue'
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
  showTime: Boolean,
  /** 未指定 format 时是否包含秒；显式 format 优先。 */
  useSeconds: { type: Boolean, default: true },
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
  modelValue: [String, Number, Date] as PropType<DateValue>,
  defaultValue: [String, Number, Date] as PropType<DateValue>,
}
export const dateRangeValueProps = {
  modelValue: Array as PropType<DateValue[]>,
  defaultValue: Array as PropType<DateValue[]>,
}
