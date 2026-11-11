import { ref, watch } from 'vue'

/** One focus boundary per field; readonly is focusable, disabled is not. */
export function useFieldFocus(options: { disabled: () => boolean; onFocus: () => void; onBlur: () => void }) {
  const focused = ref(false)
  function handleFocus() {
    if (focused.value || options.disabled()) {
      return
    }
    focused.value = true
    options.onFocus()
  }
  function handleBlur() {
    if (!focused.value) {
      return
    }
    focused.value = false
    options.onBlur()
  }
  // Disabling an already focused field must not leave a stale focus/form state.
  watch(
    options.disabled,
    (disabled) => {
      if (disabled) {
        handleBlur()
      }
    },
    { flush: 'sync' },
  )
  return { focused, handleFocus, handleBlur }
}
