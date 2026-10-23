import { computed, shallowRef, watch } from 'vue'
import { cloneFieldValue } from '../_components/picker-field/use-field-value'
import { isDateDisabled, isDateSelectionValid, type DateRules } from './date-rules'
import { sameDateSelection, type DateSelection } from './date-value'

interface DateSelectionOptions {
  value: () => DateSelection
  rules: () => DateRules
  range: () => boolean
  allowReversedDraft?: () => boolean
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
  function unlocked(value: DateSelection) {
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
  function valid(value: DateSelection) {
    return isDateSelectionValid(value, options.rules(), options.range(), options.multiple?.()) && unlocked(value)
  }
  function editable(value: DateSelection) {
    if (valid(value)) {
      return true
    }
    if (!options.range() || !Array.isArray(value) || !value.length || value.length > 2 || !unlocked(value)) {
      return false
    }
    const present = value.filter((part) => part !== undefined && part !== '')
    // Incomplete or reversed ranges are editing drafts; endpoint restrictions still apply.
    return (
      present.length > 0 &&
      (present.length === 2 ? options.allowReversedDraft?.() === true : !options.disabledParts?.().some(Boolean)) &&
      value.every(
        (part, index) =>
          part === undefined || part === '' || !isDateDisabled(part, options.rules(), index === 0 ? 'start' : 'end'),
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
    if (options.blocked()) {
      return false
    }
    if (!editable(value)) {
      return false
    }
    draft.value = cloneFieldValue(value)
    settled = false
    options.onSelect(cloneFieldValue(value))
    return !immediate || !valid(value) || commit(value)
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
  return { draft, canConfirm, valid, editable, select, commit, clear, reset }
}
