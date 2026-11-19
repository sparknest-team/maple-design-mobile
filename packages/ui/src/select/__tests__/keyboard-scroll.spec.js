import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select from '..'

test('search menu stays anchored when the dialog scrolls after the keyboard resizes the viewport', async () => {
  const dialog = document.createElement('div')
  dialog.style.overflowY = 'auto'
  document.body.append(dialog)
  const viewport = Object.assign(new EventTarget(), { width: 390, height: 800, offsetTop: 0, offsetLeft: 0 })
  vi.stubGlobal('visualViewport', viewport)
  const wrapper = mount(Select, {
    attachTo: dialog,
    props: {
      editMode: 'direct',
      filterable: true,
      open: true,
      triggerProps: { popupClass: 'keyboard-scroll-menu' },
      options: [{ label: 'A', value: 'a' }],
    },
  })
  try {
    await flushPromises()
    const reference = wrapper.get('.mp-select').element
    vi.spyOn(reference, 'getBoundingClientRect').mockImplementation(() => ({
      top: 200 - dialog.scrollTop,
      left: 10,
      width: 300,
      height: 40,
    }))
    const popup = document.querySelector('.keyboard-scroll-menu')
    viewport.height = 350
    viewport.dispatchEvent(new Event('resize'))
    await vi.waitFor(() => expect(popup.style.top).toBe('244px'))

    dialog.scrollTop = 80
    dialog.dispatchEvent(new Event('scroll'))
    await vi.waitFor(() => expect(popup.style.top).toBe('164px'))
  } finally {
    wrapper.unmount()
    dialog.remove()
    vi.unstubAllGlobals()
  }
})
