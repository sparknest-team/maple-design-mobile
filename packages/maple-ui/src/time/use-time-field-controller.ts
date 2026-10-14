import { useFieldFocus } from '../_components/picker-field/use-field-focus'
import { cloneFieldValue } from '../_components/picker-field/use-field-value'
import type { TimeCommitInput } from './time-commit'
import { getTimeEventDates } from './time-events'
import { useTimeFieldTransaction } from './use-time-field-transaction'

interface FormNotifications {
  onChange?: () => void
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

type EventDates = ReturnType<typeof getTimeEventDates>
type ControllerOptions<T extends TimeCommitInput> = Omit<
  Parameters<typeof useTimeFieldTransaction<T>>[0],
  'onCommit'
> & {
  disabled: () => boolean
  clearable: () => boolean
  onCommit: (value: T, dates: EventDates) => void
  onSelect: (value: T, dates: EventDates) => void
  onClear: () => void
  onFocus: () => void
  onBlur: () => void
  form?: () => FormNotifications | undefined
}

/** Independent per-field orchestration. Views own initialization and interaction intent, never notifications. */
export function useTimeFieldController<T extends TimeCommitInput>(options: ControllerOptions<T>) {
  const transaction = useTimeFieldTransaction<T>({
    ...options,
    onCommit: (value) => {
      options.onCommit(value, getTimeEventDates(value, options.rules()))
      options.form?.()?.onChange?.()
    },
  })
  const focus = useFieldFocus({
    disabled: options.disabled,
    onFocus: () => {
      options.onFocus()
      options.form?.()?.onFocus?.()
    },
    onBlur: () => {
      options.onBlur()
      options.form?.()?.onBlur?.()
    },
  })

  function select(value: T, commit = false) {
    if (options.blocked()) {
      return false
    }
    // A new user selection starts a new transaction even if the parent kept the panel open.
    transaction.reset()
    transaction.draft.value = cloneFieldValue(value)
    options.onSelect(cloneFieldValue(value), getTimeEventDates(value, options.rules()))
    if (commit) {
      transaction.commit()
    }
    return true
  }

  function clearField() {
    if (!options.clearable() || !transaction.clear(undefined as T)) {
      return false
    }
    options.onClear()
    options.form?.()?.onClear?.()
    return true
  }

  return { ...transaction, ...focus, select, clearField }
}
