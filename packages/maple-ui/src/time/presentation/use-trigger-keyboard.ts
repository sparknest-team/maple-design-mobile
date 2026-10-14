import type { Ref } from 'vue'

/** Mobile trigger keys; editable native inputs retain text key ownership. Bind locally, never to window or other fields. */
export function useTriggerKeyboard(options: {
  open: Ref<boolean>
  blocked: () => boolean
  cancel: () => void
  beforeOpen?: (event: KeyboardEvent) => void
}) {
  function requestOpen(event: KeyboardEvent) {
    options.beforeOpen?.(event)
    options.open.value = true
  }
  function ignores(event: KeyboardEvent) {
    if (
      event.isComposing ||
      event.keyCode === 229 ||
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return true
    }
    const target = event.target as HTMLElement | null
    if (
      target?.tagName === 'INPUT' &&
      !(target as HTMLInputElement).readOnly &&
      !['ArrowDown', 'Escape', 'Tab'].includes(event.key)
    ) {
      return true
    }
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
      requestOpen(event)
    }
  }
  function handleKeyup(event: KeyboardEvent) {
    if (ignores(event) || options.blocked() || options.open.value || event.key !== ' ') {
      return
    }
    event.preventDefault()
    requestOpen(event)
  }
  return { handleKeydown, handleKeyup }
}
