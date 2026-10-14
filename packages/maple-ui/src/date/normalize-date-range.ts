import { cloneFieldValue } from '../_components/picker-field/use-field-value'
import { outputDateValue, parseDateValue, type DateSelection, type DateValueOptions } from './date-value'

/** Only renderer interaction candidates are normalized; never external models or typed/shortcut values. */
export function normalizeDateRange(
  value: DateSelection,
  options: DateValueOptions & { exchangeTime?: boolean } = {},
): DateSelection {
  if (!Array.isArray(value) || value.length !== 2) {
    return cloneFieldValue(value)
  }
  const start = parseDateValue(value[0], options)
  const end = parseDateValue(value[1], options)
  if (!start || !end || !start.isAfter(end)) {
    return cloneFieldValue(value)
  }
  if (!options.showTime || options.exchangeTime !== false) {
    return cloneFieldValue([value[1], value[0]])
  }
  const nextStart = end
    .hour(start.hour())
    .minute(start.minute())
    .second(start.second())
    .millisecond(start.millisecond())
  const nextEnd = start.hour(end.hour()).minute(end.minute()).second(end.second()).millisecond(end.millisecond())
  return [outputDateValue(nextStart.toDate(), options), outputDateValue(nextEnd.toDate(), options)]
}
