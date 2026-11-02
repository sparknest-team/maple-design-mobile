import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Menu from '..'

const settle = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 40))
  await nextTick()
}
describe('nested menu reading direction', () => {
  it('opens the loaded child with the visual forward key and restores its parent', async () => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const popup = document.createElement('div')
    popup.dir = 'ltr'
    document.body.append(popup)
    const wrapper = mount(Menu, {
      attachTo: host,
      props: {
        defaultOpen: true,
        popupContainer: popup,
        hideOnSelect: false,
        submenuTrigger: 'click',
        options: [
          {
            label: 'Parent',
            children: [
              { label: 'Blocked', value: 'blocked', disabled: true },
              { label: 'Child', value: 'child' },
            ],
          },
        ],
      },
      slots: { default: () => h('button', 'Menu') },
    })
    try {
      await settle()
      const parent = popup.querySelector<HTMLElement>('[data-menu-item]')!
      parent.focus()
      parent.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }))
      await settle()
      expect(document.activeElement?.textContent).toContain('Child')
      document.activeElement!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      )
      await settle()
      expect(wrapper.emitted('select')?.[0]?.[0]).toBe('child')
      document.activeElement!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
      )
      await settle()
      expect(document.activeElement).toBe(parent)
    } finally {
      wrapper.unmount()
      host.remove()
      popup.remove()
    }
  })
})
