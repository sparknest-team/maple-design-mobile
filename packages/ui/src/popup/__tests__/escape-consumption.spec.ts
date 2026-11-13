import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Popup from '../Popup.vue'

test('consumed Escape does not run the close guard, while ordinary Escape does', async () => {
  const beforeClose = vi.fn(() => false)
  const owner = mount(Popup, {
    attachTo: document.body,
    props: { defaultOpen: true, popupContainer: false, beforeClose },
    slots: {
      default: () => h('input', { onKeydown: (event: KeyboardEvent) => event.preventDefault() }),
    },
  })
  try {
    const input = owner.get('input').element
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(beforeClose).not.toHaveBeenCalled()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(beforeClose).toHaveBeenCalledTimes(1)
    expect(owner.emitted('update:open')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
