import { isDateDisabled, type DateRules } from './date-rules'
import { outputDateValue, parseDateValue, sameDateSelection } from './date-value'

/** Give empty wheel endpoints a real draft without changing an existing or locked endpoint. */
export function dateWheelDraft(
  value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined,
  options: DateRules & { disabled?: boolean | boolean[] },
  range: boolean,
  now = new Date(),
): Date | string | number | (Date | string | number | null | undefined)[] | null | undefined {
  if ((!range && Array.isArray(value)) || (range && value != null && !Array.isArray(value))) {
    return value
  }
  const values = Array.isArray(value) ? [...value] : [value]
  const count = range ? 2 : 1
  const minimum = parseDateValue(options.min, options)
  const maximum = parseDateValue(options.max, options)
  const fallback = parseDateValue(now, options)
  if (!fallback || (options.min !== undefined && !minimum) || (options.max !== undefined && !maximum)) {
    return value
  }
  let changed = false
  for (let index = 0; index < count; index++) {
    if (values[index] !== undefined && values[index] !== '' && values[index] !== null) {
      continue
    }
    if (Array.isArray(options.disabled) && options.disabled[index]) {
      continue
    }
    // Start an empty range at the same instant, or reuse its existing endpoint.
    let point = (range ? parseDateValue(values[index ^ 1], options) : undefined) ?? fallback
    if (minimum && point.valueOf() < minimum.valueOf()) {
      point = minimum
    }
    if (maximum && point.valueOf() > maximum.valueOf()) {
      point = maximum
    }
    const candidate = outputDateValue(point.toDate(), options)
    if (!isDateDisabled(candidate, options, index === 1 ? 'end' : 'start')) {
      values[index] = candidate
      changed = true
    }
  }
  if (!changed) {
    return value
  }
  const next = range ? values : values[0]
  return sameDateSelection(next, value, options) ? value : next
}
