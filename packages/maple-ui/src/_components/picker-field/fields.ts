import type { PropType } from 'vue'

export type TimePickerField = 'hour' | 'minute' | 'second'
export type DatePickerField = 'year' | 'month' | 'day'
export const dateFields = ['year', 'month', 'day'] as const
export const timeFields = ['hour', 'minute', 'second'] as const
const validFields = (value: readonly string[], allowed: readonly string[]) =>
  value.length > 0 && new Set(value).size === value.length && value.every((field) => allowed.includes(field))

/** 滚轮列及其顺序；只影响滚轮，不修改格式、模型值或日历网格。 */
export const datePickerFieldsProp = {
  type: Array as PropType<readonly DatePickerField[]>,
  validator: (value: readonly DatePickerField[]) => validFields(value, dateFields),
}
/** 时间滚轮列及其顺序；范围的起止两端共用。 */
export const timePickerFieldsProp = {
  type: Array as PropType<readonly TimePickerField[]>,
  validator: (value: readonly TimePickerField[]) => validFields(value, timeFields),
}

/** Only omitted configuration uses defaults; an explicit list is authoritative. */
export function pickerFieldIndexes(
  fields: readonly (DatePickerField | TimePickerField)[] | undefined,
  allowed: readonly string[],
  defaults: number[],
) {
  if (!fields) {
    return defaults
  }
  const indexes = [...new Set(fields)].flatMap((field) => {
    const index = allowed.indexOf(field)
    return index < 0 ? [] : [index]
  })
  return indexes
}

export function mergePickerFields(current: (string | number)[], indexes: number[], selected: (string | number)[]) {
  const next = [...current]
  indexes.forEach((index, position) => {
    if (selected[position] !== undefined) {
      next[index] = selected[position]
    }
  })
  return next
}
