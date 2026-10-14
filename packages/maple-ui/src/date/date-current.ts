import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import { dateUsesSeconds, outputDateValue, parseDateValue, type DateValueOptions } from './date-value'

const currentKey: InjectionKey<ComputedRef<boolean>> = Symbol('date-current-highlight')
export const dateCurrentProps = {
  /** 仅控制日历中的当前日期高亮，不改变选择。 */
  showCurrent: { type: Boolean, default: true },
}
export const dateNowProps = {
  /** 单选面板的选择当前按钮，仍走普通选择与确认校验。 */
  showNowButton: { type: Boolean, default: true },
}
export const dateRangeInteractionProps = {
  /** 交互候选反序时，是否连同日期交换时间；模型/手输/快捷项不重排。 */
  exchangeTime: { type: Boolean, default: true },
}
export function provideDateCurrent(value: () => boolean) {
  provide(currentKey, computed(value))
}
export function useDateCurrent(fallback: () => boolean = () => true) {
  return inject(currentKey, undefined) ?? computed(fallback)
}
export function currentDateValue(options: DateValueOptions & { dayStartOfWeek?: number }, now = new Date()) {
  let point = parseDateValue(now, options)!
  const type = options.type ?? 'date'
  if (type === 'year' || type === 'month' || type === 'quarter') {
    point = point.startOf(type)
  } else if (type === 'week') {
    point = point.subtract((point.day() - (options.dayStartOfWeek ?? 0) + 7) % 7, 'day').startOf('day')
  } else if (!options.showTime) {
    point = point.startOf('day')
  } else {
    point = point.millisecond(0)
    if (!dateUsesSeconds(options)) {
      point = point.second(0)
    }
  }
  return outputDateValue(point.toDate(), options)
}
