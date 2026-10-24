import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NumberKeyboard from '../NumberKeyboard.vue'

test('keyboard defaults separate initial text from initial panel state', async () => {
  const wrapper = mount(NumberKeyboard, { props: { defaultValue: '12', defaultOpen: true, popupContainer: false } })
  expect(wrapper.vm.open).toBe(true)
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  expect(wrapper.emitted('update:open')).toBeUndefined()
  await wrapper.setProps({ defaultValue: '99', defaultOpen: false })
  expect(wrapper.vm.open).toBe(true)
  wrapper.vm.handleKeyPress({ text: '3' })
  await wrapper.vm.$nextTick()
  expect(wrapper.emitted('update:modelValue')).toEqual([['123']])
  wrapper.vm.handleClose()
  await wrapper.vm.$nextTick()
  expect(wrapper.emitted('update:open')).toEqual([[false]])
  wrapper.unmount()
})
