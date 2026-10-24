import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Tag from '..'

test('checkable Tag uses its boolean primary model and initialization-only default', async () => {
  const wrapper = mount(Tag, { props: { checkable: true, defaultValue: false } })
  expect(wrapper.get('[role="checkbox"]').attributes('aria-checked')).toBe('false')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.setProps({ defaultValue: true })
  expect(wrapper.get('[role="checkbox"]').attributes('aria-checked')).toBe('false')
  await wrapper.get('[role="checkbox"]').trigger('click')
  expect(wrapper.get('[role="checkbox"]').attributes('aria-checked')).toBe('true')
  expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  wrapper.unmount()
})
