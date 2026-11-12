import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Panel from '../CascaderPanel.vue'

it.each([
  ['BUTTON', false],
  ['searchbox', false],
  ['listbox', false],
  ['menu', false],
  ['menubar', false],
  ['grid', false],
  ['tree', false],
  ['treegrid', false],
  ['radiogroup', false],
  ['tablist', false],
  ['scrollbar', false],
  ['Button', false],
  ['UNKNOWN BUTTON', false],
  ['PRESENTATION button', true],
  ['LiNk', false],
  ['lin\u212A', true],
] as const)('uses ASCII case-insensitive role matching for %s', async (role, selects) => {
  const action = vi.fn()
  const wrapper = mount(Panel, {
    props: { options: [{ value: 'a', label: 'Alpha' }] },
    slots: {
      option: () => h('span', { role, tabindex: -1, onClick: action }, [h('span', { 'data-child': '' }, 'Action')]),
    },
  })
  try {
    await wrapper.get('[data-child]').trigger('click')
    expect(action).toHaveBeenCalledTimes(1)
    expect(Boolean(wrapper.emitted('update:modelValue'))).toBe(selects)
  } finally {
    wrapper.unmount()
  }
})
