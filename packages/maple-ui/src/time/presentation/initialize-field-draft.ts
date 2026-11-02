import type { TimeFieldProps } from '../field-state'
import type { TimeCommitInput } from '../time-commit'
import { getFormattedTimeChoices } from '../time-value'

/** Mobile wheels need a visible candidate, but initialization never commits a model. */
export function initializeTimeFieldDraft(
  value: TimeCommitInput,
  rules: TimeFieldProps,
  range: boolean,
): TimeCommitInput {
  if (range) {
    if (value != null && (!Array.isArray(value) || value.length > 2)) {
      return value
    }
    return [0, 1].map((index) => {
      const part = Array.isArray(value) ? value[index] : undefined
      return part == null || part === ''
        ? (getFormattedTimeChoices(Array.isArray(value) ? value[index ^ 1] : undefined, rules).value ?? '')
        : part
    })
  }
  return value == null || value === '' ? getFormattedTimeChoices(undefined, rules).value : value
}
