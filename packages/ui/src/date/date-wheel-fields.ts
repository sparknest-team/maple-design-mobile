import {
  dateFields,
  mergePickerFields,
  pickerFieldIndexes,
  type DatePickerField,
} from '../_components/picker-field/fields'

export function dateWheelFieldIndexes(fields?: readonly DatePickerField[], type: 'year' | 'month' | 'date' = 'date') {
  const defaults = type === 'year' ? [0] : type === 'month' ? [0, 1] : [0, 1, 2]
  const indexes = pickerFieldIndexes(fields, dateFields, defaults).filter((index) => defaults.includes(index))
  return indexes
}
export const mergeDateWheelFields = mergePickerFields
