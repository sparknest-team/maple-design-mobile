import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { provideRangeDisabledParts, useRangeDisabledParts, useRangeFieldIndex } from '../mobile-range-field-context'
import { provideRangeField } from '../range-field-context'

test('mobile endpoint locks inherit, merge and react without leaking between panels', async () => {
  const parentLocks = ref([true, false])
  const childLocks = ref([false, false])
  const Probe = defineComponent({
    setup() {
      const disabled = useRangeDisabledParts()
      const index = useRangeFieldIndex()
      return () =>
        h(
          'button',
          {
            onClick: () => {
              index.value = index.value ^ 1
            },
          },
          `${index.value}:${disabled()}`,
        )
    },
  })
  const Nested = defineComponent({
    setup() {
      provideRangeDisabledParts(() => childLocks.value)
      return () => h(Probe)
    },
  })
  const Owner = defineComponent({
    setup() {
      provideRangeField()
      provideRangeDisabledParts(() => parentLocks.value)
      return () => h(Nested)
    },
  })
  const wrapper = mount(defineComponent({ setup: () => () => h('main', [h(Owner), h(Probe)]) }))
  const buttons = () => wrapper.findAll('button')
  expect(buttons().map((button) => button.text())).toEqual(['1:true,false', '0:'])
  await buttons()[0].trigger('click')
  expect(buttons()[0].text()).toBe('1:true,false')
  childLocks.value = [false, true]
  await wrapper.vm.$nextTick()
  expect(buttons()[0].text()).toBe('0:true,true')
  parentLocks.value = [false, false]
  await wrapper.vm.$nextTick()
  expect(buttons()[0].text()).toBe('0:false,true')
  childLocks.value = [false, false]
  await wrapper.vm.$nextTick()
  await buttons()[0].trigger('click')
  expect(buttons()[0].text()).toBe('1:false,false')
  expect(buttons()[1].text()).toBe('0:')
  wrapper.unmount()
})
