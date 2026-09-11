import { afterEach } from 'vitest'

afterEach(() => {
  // Teleport popups attach to document.body; remove leftovers when a test throws before unmount.
  document.body
    .querySelectorAll('.mp-trigger-popup, .mp-popup, .mp-overlay, .mp-dropdown-menu')
    .forEach((el) => el.remove())
})
