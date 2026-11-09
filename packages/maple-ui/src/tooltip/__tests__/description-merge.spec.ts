import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tooltip from '../Tooltip.vue'

test('combines original and custom descriptions with tooltip and restores them', async () => {
  const wrapper = mount(Tooltip, {
    attachTo: document.body,
    props: {
      trigger: 'manual',
      content: 'Tip',
      popupContainer: false,
      referenceAttrs: { 'aria-describedby': 'custom shared' },
    },
    slots: { default: () => h('button', { 'aria-describedby': 'original shared' }, 'Open') },
  })
  const reference = wrapper.get('button').element
  try {
    await nextTick()
    expect(reference.getAttribute('aria-describedby')).toBe('original shared custom')
    wrapper.vm.open()
    await nextTick()
    const id = wrapper.get('[role=tooltip]').attributes('id')
    expect(reference.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['original', 'shared', 'custom', id])
    await wrapper.setProps({ referenceAttrs: { 'aria-describedby': 'new' } })
    expect(reference.getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['original', 'shared', 'new', id])
    wrapper.vm.close()
    await nextTick()
    expect(reference.getAttribute('aria-describedby')).toBe('original shared new')
  } finally {
    wrapper.unmount()
  }
  expect(reference.getAttribute('aria-describedby')).toBe('original shared')
})
