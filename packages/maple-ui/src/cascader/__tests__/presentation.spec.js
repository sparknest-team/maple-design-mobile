import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import CascaderMenu from '../CascaderMenu.vue'
import Cascader from '../index'

const options = [
  {
    value: 'a',
    label: 'Group',
    children: [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ],
  },
]
const controller = (wrapper) => wrapper.getComponent(EditorPanel).getComponent(CascaderMenu).props('controller')
const action = (wrapper, name) =>
  wrapper
    .getComponent(EditorPanel)
    .findAll('button')
    .find((button) => button.text() === name)
const choose = async (wrapper) => {
  const state = controller(wrapper)
  state.handleClickOption(
    [...state.optionMap.values()].find((option) => option.value === 1),
    true,
  )
  await nextTick()
}
describe('Cascader shared field overlays', () => {
  for (const presentation of ['popup']) {
    test(presentation + ' confirms a multi-select draft once', async () => {
      const wrapper = mount(Cascader, { props: { presentation, multiple: true, options } })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        await choose(wrapper)
        expect(wrapper.emitted('change')).toBeUndefined()
        await action(wrapper, '确认').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('change')).toEqual([[[1]]])
      } finally {
        wrapper.unmount()
      }
    })
    test(presentation + ' cancels and starts a fresh draft', async () => {
      const wrapper = mount(Cascader, { props: { presentation, multiple: true, options, defaultValue: [] } })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        await choose(wrapper)
        await wrapper.getComponent(EditorPanel).get('button[aria-label="关闭"]').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('change')).toBeUndefined()
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        expect(controller(wrapper).computedValueMap.size).toBe(0)
      } finally {
        wrapper.unmount()
      }
    })
    test(presentation + ' respects a controlled rejection of opening', async () => {
      const wrapper = mount(Cascader, { props: { presentation, options, open: false } })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:open')).toEqual([[true]])
        expect(wrapper.findComponent(CascaderMenu).exists()).toBe(false)
        expect(wrapper.emitted('change')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    })
  }
})
