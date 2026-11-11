import type { HTMLAttributes } from 'vue'

/** 日期/时间列由日期所有者生成，内嵌滚轮仅允许改变尺寸和外观。 */
export interface DateWheelOptions extends Pick<HTMLAttributes, 'class' | 'style'> {
  optionHeight?: number | string
  optionCount?: number | string
}

const wheelAppearanceKeys = new Set(['optionHeight', 'optionCount', 'class', 'style'])

export function dateWheelOptions(options?: object): DateWheelOptions {
  return Object.fromEntries(Object.entries(options ?? {}).filter(([key]) => wheelAppearanceKeys.has(key)))
}
