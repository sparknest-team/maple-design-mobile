import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Picker from '../Picker.vue'

test('picker defaults initialize the selection and independent popup once', async () => {
  const wrapper = mount(Picker, {
    props: {
      dynamic: true,
      defaultOpen: true,
      defaultValue: ['b'],
      columns: [
        [
          { text: 'A', value: 'a' },
          { text: 'B', value: 'b' },
        ],
      ],
      popupContainer: false,
    },
  })
  await flushPromises()
  expect(wrapper.vm.mergedOpen).toBe(true)
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  expect(wrapper.emitted('update:open')).toBeUndefined()
  await wrapper.setProps({ defaultValue: ['a'], defaultOpen: false })
  expect(wrapper.vm.mergedOpen).toBe(true)
  expect(wrapper.get('[role="option"][aria-selected="true"]').text()).toContain('B')
  wrapper.vm.handlePopupUpdateShow(false)
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.mergedOpen).toBe(false)
  expect(wrapper.emitted('update:open')).toEqual([[false]])
  wrapper.unmount()
})
