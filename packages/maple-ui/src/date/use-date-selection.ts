import { computed, shallowRef, watch } from 'vue'
import { cloneFieldValue } from '../_components/picker-field/use-field-value'
import { isDateSelectionValid, type DateRules } from './date-rules'
import { sameDateSelection, type DateSelection } from './date-value'

interface DateSelectionOptions {
  value: () => DateSelection
  rules: () => DateRules
  range: () => boolean
  multiple?: () => boolean
  blocked: () => boolean
  disabledParts?: () => boolean[]
  onSelect: (value: DateSelection) => void
  onCommit: (value: DateSelection) => void
  onConfirm?: () => void
}
export function useDateSelection(options: DateSelectionOptions) {
  const draft = shallowRef<DateSelection>(cloneFieldValue(options.value()))
  let settled = false
  function reset() {
    draft.value = cloneFieldValue(options.value())
    settled = false
  }
  watch(
    options.value,
    () => {
      // A controlled parent echo is still part of the settled confirmation.
      // Only a different external value starts a new transaction.
      if (!settled || !sameDateSelection(options.value(), draft.value, options.rules())) {
        reset()
      }
    },
    { deep: true, flush: 'sync' },
  )
  function valid(value: DateSelection) {
    if (!isDateSelectionValid(value, options.rules(), options.range(), options.multiple?.())) {
      return false
    }
    const previous = options.value()
    return (
      !options.range() ||
      !options
        .disabledParts?.()
        .some(
          (disabled, index) =>
            disabled &&
            (!Array.isArray(value) ||
              !Array.isArray(previous) ||
              !sameDateSelection(value[index], previous[index], options.rules())),
        )
    )
  }
  const canConfirm = computed(() => !options.blocked() && valid(draft.value))
  function commit(value = draft.value) {
    if (settled || options.blocked() || !valid(value)) {
      return false
    }
    draft.value = cloneFieldValue(value)
    settled = true
    if (!sameDateSelection(value, options.value(), options.rules())) {
      options.onCommit(cloneFieldValue(value))
    }
    options.onConfirm?.()
    return true
  }
  function select(value: DateSelection, immediate = false) {
    if (options.blocked() || !valid(value)) {
      return false
    }
    draft.value = cloneFieldValue(value)
    settled = false
    options.onSelect(cloneFieldValue(value))
    return !immediate || commit(value)
  }
  function clear() {
    if (options.blocked() || options.disabledParts?.().some(Boolean)) {
      return false
    }
    const value = options.range() || options.multiple?.() ? [] : undefined
    draft.value = value
    settled = true
    if (!sameDateSelection(value, options.value(), options.rules())) {
      options.onCommit(value)
    }
    options.onConfirm?.()
    return true
  }
  return { draft, canConfirm, valid, select, commit, clear, reset }
}
