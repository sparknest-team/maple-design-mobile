import type { Ref } from 'vue'

/** Readonly mobile trigger keys. Bind locally, never to window or other fields. */
export function useTriggerKeyboard(options: { open: Ref<boolean>; blocked: () => boolean; cancel: () => void }) {
  function ignores(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return true
    }
    const target = event.target as HTMLElement | null
    return Boolean(target?.closest('button, a, select, textarea, [contenteditable="true"]'))
  }
  function handleKeydown(event: KeyboardEvent) {
    if (ignores(event)) {
      return
    }
    if (event.key === 'Escape' && options.open.value) {
      event.preventDefault()
      event.stopPropagation()
      options.cancel()
      return
    }
    if (event.key === 'Tab') {
      if (options.open.value) {
        options.cancel()
      }
      // Native focus navigation (and the Popup's own focus trap) retains ownership.
      return
    }
    if (options.blocked() || options.open.value || event.repeat) {
      return
    }
    if (event.key === ' ') {
      event.preventDefault()
    } else if (event.key === 'Enter' || event.key === 'ArrowDown') {
      event.preventDefault()
      options.open.value = true
    }
  }
  function handleKeyup(event: KeyboardEvent) {
    if (ignores(event) || options.blocked() || options.open.value || event.key !== ' ') {
      return
    }
    event.preventDefault()
    options.open.value = true
  }
  return { handleKeydown, handleKeyup }
}
