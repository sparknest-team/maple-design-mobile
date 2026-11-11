import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ActionSheet from '../ActionSheet.vue'

test('defaultOpen initializes an uncontrolled sheet without writing into its owner', async () => {
  const wrapper = mount(ActionSheet, {
    props: { defaultOpen: true, actions: [{ name: 'Action' }], popupContainer: false },
  })
  expect(wrapper.vm.open).toBe(true)
  expect(wrapper.emitted('update:open')).toBeUndefined()
  await wrapper.setProps({ defaultOpen: false })
  expect(wrapper.vm.open).toBe(true)
  wrapper.vm.handleSelect({ name: 'Action' })
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.open).toBe(false)
  expect(wrapper.emitted('update:open')).toEqual([[false]])
  wrapper.unmount()
})
