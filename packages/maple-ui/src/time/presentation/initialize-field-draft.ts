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
    return [0, 1].map(
      (index) => getFormattedTimeChoices(Array.isArray(value) ? value[index] : undefined, rules).value ?? '',
    )
  }
  return getFormattedTimeChoices(Array.isArray(value) ? undefined : value, rules).value
}
