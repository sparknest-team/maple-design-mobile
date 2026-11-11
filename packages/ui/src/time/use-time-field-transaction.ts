import { computed } from 'vue'
import { useFieldTransaction } from '../_components/picker-field/use-field-transaction'
import { getTimeCommitValue, type TimeCommitInput, type TimeCommitRules } from './time-commit'

/** Field transactions are local; only presentation-specific draft initialization is injected. */
export function useTimeFieldTransaction<T extends TimeCommitInput>(
  options: Parameters<typeof useFieldTransaction<T>>[0] & {
    rules: () => TimeCommitRules
    range: () => boolean
  },
) {
  const transaction = useFieldTransaction<T>(options)
  const canConfirm = computed(
    () =>
      !options.blocked() && getTimeCommitValue(transaction.draft.value, options.rules(), options.range()) !== undefined,
  )
  function commit(value: T = transaction.draft.value) {
    const next = getTimeCommitValue(value, options.rules(), options.range())
    return next !== undefined && transaction.commit(next as T)
  }
  // Clear intentionally bypasses time validation: undefined is the public empty value.
  return { ...transaction, commit, canConfirm }
}
