import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Popover from '../Popover.vue'

test('reference describes the expandable group without claiming it is a menu', async () => {
  const wrapper = mount(Popover, {
    attachTo: document.body,
    props: { title: 'Details', content: 'More information', popupContainer: false },
    slots: { default: () => h('button', 'Open') },
  })
  try {
    await nextTick()
    const reference = wrapper.get('button')
    expect(reference.attributes('aria-haspopup')).toBeUndefined()
    expect(reference.attributes('aria-expanded')).toBe('false')
    await reference.trigger('click')
    await nextTick()
    const panel = wrapper.get('[role=group]')
    expect(reference.attributes('aria-controls')).toBe(panel.attributes('id'))
    expect(reference.attributes('aria-expanded')).toBe('true')
    expect(panel.get(`#${panel.attributes('aria-labelledby')}`).text()).toBe('Details')
    expect(reference.attributes('aria-haspopup')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('explicit reference attributes survive updates and original attributes are restored', async () => {
  const wrapper = mount(Popover, {
    attachTo: document.body,
    props: { content: 'Info', popupContainer: false, referenceAttrs: { 'aria-haspopup': 'dialog' } },
    slots: { default: () => h('button', { 'aria-haspopup': 'listbox' }, 'Open') },
  })
  const reference = wrapper.get('button').element
  try {
    await nextTick()
    expect(reference.getAttribute('aria-haspopup')).toBe('dialog')
    await wrapper.setProps({ referenceAttrs: { 'aria-haspopup': 'tree' } })
    await nextTick()
    expect(reference.getAttribute('aria-haspopup')).toBe('tree')
    await wrapper.setProps({ referenceAttrs: {} })
    await nextTick()
    expect(reference.getAttribute('aria-haspopup')).toBe('listbox')
  } finally {
    wrapper.unmount()
  }
  expect(reference.getAttribute('aria-haspopup')).toBe('listbox')
})
