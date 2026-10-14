import type { HTMLAttributes } from 'vue'
import type { TimeStep } from '../time/time-rules'

/** 日期内嵌时间面板的展示选项；值、格式和校验始终由日期所有者管理。 */
export interface DateTimePickerOptions extends Pick<HTMLAttributes, 'class' | 'style'> {
  use12Hours?: boolean
  step?: TimeStep
  hideDisabledOptions?: boolean
}

const timeAppearanceKeys = new Set(['use12Hours', 'step', 'hideDisabledOptions', 'class', 'style'])

export function dateTimePickerOptions(options?: object): DateTimePickerOptions {
  return Object.fromEntries(Object.entries(options ?? {}).filter(([key]) => timeAppearanceKeys.has(key)))
}
