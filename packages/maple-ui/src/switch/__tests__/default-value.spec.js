import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Switch from '..'

test('defaultValue uses the actual custom value and does not reset after initialization', async () => {
  const wrapper = mount(Switch, {
    props: { editMode: 'direct', defaultValue: 'yes', checkedValue: 'yes', uncheckedValue: 'no' },
  })
  expect(wrapper.attributes('aria-checked')).toBe('true')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.setProps({ defaultValue: 'no' })
  expect(wrapper.attributes('aria-checked')).toBe('true')
  await wrapper.trigger('click')
  expect(wrapper.emitted('update:modelValue')).toEqual([['no']])
  expect(wrapper.attributes('aria-checked')).toBe('false')
  wrapper.unmount()
})
