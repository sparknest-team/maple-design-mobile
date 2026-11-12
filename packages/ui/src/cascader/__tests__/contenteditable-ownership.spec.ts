import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Panel from '../CascaderPanel.vue'

it.each([false, true])('distinguishes editable descendants in multiple=%s', async (multiple) => {
  for (const [value, selects] of [
    ['FALSE', true],
    ['inherit', true],
    ['false', true],
    ['true', false],
    ['plaintext-only', false],
    ['', false],
  ] as const) {
    const wrapper = mount(Panel, {
      props: { multiple, options: [{ value: 'a', label: 'Alpha' }] },
      slots: { option: () => h('span', { contenteditable: value }, [h('span', { 'data-child': '' }, 'Alpha')]) },
    })
    try {
      await wrapper.get('[data-child]').trigger('click')
      const updates = wrapper.emitted('update:modelValue')
      expect(Boolean(updates), `${value} multiple=${multiple}`).toBe(selects)
    } finally {
      wrapper.unmount()
    }
  }
})

it.each([
  ['true', false],
  ['false', true],
] as const)('honours inherited editability from parent=%s', async (parent, selects) => {
  const wrapper = mount(Panel, {
    props: { options: [{ value: 'a', label: 'Alpha' }] },
    slots: {
      option: () =>
        h('span', { contenteditable: parent }, [h('span', { contenteditable: 'inherit', 'data-child': '' }, 'Alpha')]),
    },
  })
  try {
    await wrapper.get('[data-child]').trigger('click')
    expect(Boolean(wrapper.emitted('update:modelValue'))).toBe(selects)
  } finally {
    wrapper.unmount()
  }
})
