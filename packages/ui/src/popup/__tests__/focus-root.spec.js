import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Popup from '../Popup.vue'

test('Popup focuses its actual dialog panel and restores the opening control', async () => {
  const opener = document.createElement('button')
  document.body.append(opener)
  const wrapper = mount(Popup, {
    attachTo: document.body,
    props: { open: false, popupContainer: false },
    global: { stubs: { transition: false } },
  })
  try {
    opener.focus()
    await wrapper.setProps({ open: true })
    await nextTick()
    const panel = wrapper.get('[role="dialog"]')
    expect(panel.attributes('data-modal-focus-root')).toBeDefined()
    expect(document.activeElement).toBe(panel.element)
    await wrapper.setProps({ open: false })
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 100))
    await nextTick()
    expect(document.activeElement).toBe(opener)
  } finally {
    wrapper.unmount()
    opener.remove()
  }
})
