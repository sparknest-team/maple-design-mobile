import { afterEach } from 'vitest'

afterEach(() => {
  if (typeof document === 'undefined') {
    return
  }
  // Teleport popups attach to document.body; remove leftovers when a test throws before unmount.
  document.body.querySelectorAll('.mp-trigger-popup, .mp-popup, .mp-overlay, .mp-menu').forEach((el) => el.remove())
})
