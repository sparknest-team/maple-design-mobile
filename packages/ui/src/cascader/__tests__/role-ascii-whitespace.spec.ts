import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Panel from '../CascaderPanel.vue'

it.each([
  ['presentation\u00a0button button', false],
  ['button\u00a0presentation', true],
  ['presentation\tbutton', true],
  ['\u00a0presentation button', false],
] as const)('uses ASCII role separators for %s', async (role, selects) => {
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
