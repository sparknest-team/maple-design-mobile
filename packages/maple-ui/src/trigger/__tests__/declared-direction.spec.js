import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Trigger from '..'

test('declared dir overrides the reference scope and updates the popup', async () => {
  const host = document.createElement('div')
  host.dir = 'ltr'
  document.body.append(host)
  const wrapper = mount(Trigger, {
    attachTo: host,
    props: {
      dir: 'rtl',
      defaultOpen: true,
      trigger: 'manual',
      animationName: '',
      popupContainer: false,
      popupClass: 'direction-panel',
    },
    slots: { default: () => h('button', 'Reference'), content: () => 'Content' },
  })
  try {
    await nextTick()
    expect(wrapper.get('.direction-panel').attributes('dir')).toBe('rtl')
    await wrapper.setProps({ dir: 'ltr' })
    expect(wrapper.get('.direction-panel').attributes('dir')).toBe('ltr')
    await wrapper.setProps({ dir: undefined })
    await nextTick()
    expect(wrapper.get('.direction-panel').attributes('dir')).toBe('ltr')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
