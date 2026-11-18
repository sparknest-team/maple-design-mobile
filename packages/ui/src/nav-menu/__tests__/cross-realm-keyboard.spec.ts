import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NavMenu, { NavMenuItem } from '..'
import NavMenuOptions from '../NavMenuOptions'

for (const mode of ['items', 'options'] as const) {
  test(`${mode} keyboard navigation accepts buttons created in another document`, async () => {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    const other = iframe.contentDocument!
    const wrapper =
      mode === 'items'
        ? mount(NavMenu, {
            attachTo: document.body,
            slots: { default: () => [h(NavMenuItem, { label: 'One' }), h(NavMenuItem, { label: 'Two' })] },
          })
        : mount(NavMenuOptions, {
            attachTo: document.body,
            props: {
              options: [
                { key: 'a', label: 'One' },
                { key: 'b', label: 'Two' },
              ],
            },
          })
    try {
      const selector = mode === 'items' ? '[data-nav-item]' : '[data-nav-option]'
      const originals = wrapper.findAll(selector)
      const buttons = originals.map((original) => {
        const button = other.createElement('button')
        button.setAttribute(mode === 'items' ? 'data-nav-item' : 'data-nav-option', '')
        original.element.replaceWith(button)
        return button
      })
      expect(buttons[0] instanceof HTMLElement).toBe(false)
      buttons[0].focus()
      buttons[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: mode === 'items' ? 'ArrowRight' : 'ArrowDown',
          bubbles: true,
          cancelable: true,
        }),
      )
      await nextTick()
      expect(document.activeElement).toBe(buttons[1])
    } finally {
      wrapper.unmount()
      iframe.remove()
    }
  })
}
