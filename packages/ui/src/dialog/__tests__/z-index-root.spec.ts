import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Popup from '../../popup/Popup.vue'
import Dialog from '../Dialog.vue'

test.each([
  ['Dialog', Dialog],
  ['Popup', Popup],
] as const)(
  '%s uses the public z-index on its outer stacking context, including low values and updates',
  async (_name, Component) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { open: true, popupContainer: false, zIndex: 1 },
      slots: { default: () => h('span', 'content') },
    })
    try {
      const root = wrapper.get('.mp-popup').element as HTMLElement
      expect(root.style.zIndex).toBe('1')
      await wrapper.setProps({ zIndex: 0 })
      expect(root.style.zIndex).toBe('0')
      await wrapper.setProps({ zIndex: 40 })
      expect(root.style.zIndex).toBe('40')
    } finally {
      wrapper.unmount()
    }
  },
)
