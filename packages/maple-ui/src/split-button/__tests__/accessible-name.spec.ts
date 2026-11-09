import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SplitButton from '../SplitButton.vue'

test('menu trigger has a default name and respects explicit labels', async () => {
  const wrapper = mount(SplitButton, { slots: { default: 'Action' } })
  try {
    const button = wrapper.get('[aria-haspopup=menu]')
    expect(button.attributes('aria-label')).toBe('更多操作')
    await wrapper.setProps({ triggerButtonProps: { 'aria-label': 'Choose destination' } })
    expect(button.attributes('aria-label')).toBe('Choose destination')
    await wrapper.setProps({ triggerButtonProps: { 'aria-labelledby': 'external-label' } })
    expect(button.attributes('aria-label')).toBeUndefined()
    expect(button.attributes('aria-labelledby')).toBe('external-label')
  } finally {
    wrapper.unmount()
  }
})

test('uses the active English locale for its default name', async () => {
  const { add, enUS, use } = await import('../../locale')
  add('en-US', { ...enUS })
  use('en-US')
  const wrapper = mount(SplitButton, { slots: { default: 'Action' } })
  try {
    expect(wrapper.get('[aria-haspopup=menu]').attributes('aria-label')).toBe('More actions')
  } finally {
    wrapper.unmount()
    use('zh-CN')
  }
})
