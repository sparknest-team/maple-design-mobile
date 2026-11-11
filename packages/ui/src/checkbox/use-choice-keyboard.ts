import { onDeactivated, onScopeDispose } from 'vue'

/** Per-instance keyboard state, bound to the focusable control rather than window. */
export function useChoiceKeyboard(activate: () => void, blocked: () => boolean) {
  let spacePressed = false
  const reset = () => {
    spacePressed = false
  }
  function keydown(event: KeyboardEvent) {
    if (event.defaultPrevented || blocked() || event.altKey || event.ctrlKey || event.metaKey) {
      reset()
      return
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
    }
    if (event.key === ' ') {
      spacePressed = true
    }
    if (event.key === 'Enter' && !event.repeat) {
      activate()
    }
  }
  function keyup(event: KeyboardEvent) {
    if (event.key !== ' ') {
      return
    }
    if (event.defaultPrevented) {
      reset()
      return
    }
    event.preventDefault()
    const active = spacePressed && !blocked() && !event.altKey && !event.ctrlKey && !event.metaKey
    reset()
    if (active) {
      activate()
    }
  }
  onDeactivated(reset)
  onScopeDispose(reset)
  return { keydown, keyup, reset }
}
