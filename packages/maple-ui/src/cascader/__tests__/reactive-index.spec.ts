import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '..'
import BasePanel from '../base-cascader-panel'
import CascaderMenu from '../CascaderMenu.vue'
import Panel from '../CascaderPanel.vue'

test('rebuilds strict selection labels without publishing a model', async () => {
  const wrapper = mount(Cascader, {
    props: {
      editMode: 'direct',
      defaultValue: 'root',
      options: [{ value: 'root', label: 'Root', children: [{ value: 'leaf', label: 'Leaf' }] }],
    },
  })
  try {
    await wrapper.setProps({ checkStrictly: true })
    const controller = wrapper.findComponent(CascaderMenu).props('controller')
    expect(controller.fieldItems[0]?.label).toBe('Root')
    await wrapper.setProps({ checkStrictly: false })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

for (const [kind, Component] of [
  ['field', Cascader],
  ['panel', Panel],
] as const) {
  test(`${kind}: adding and removing lazy loading rebuilds leaf classification`, async () => {
    const wrapper = mount(Component as any, {
      props: { ...(kind === 'field' ? { editMode: 'direct' } : {}), options: [{ value: 'root', label: 'Root' }] },
    })
    const first = () =>
      kind === 'field'
        ? [...wrapper.findComponent(CascaderMenu).props('controller').optionMap.values()][0]
        : wrapper.findComponent(BasePanel).props('displayColumns')[0][0]
    try {
      expect(first()?.isLeaf).toBe(true)
      await wrapper.setProps({ loadMore: () => {} })
      expect(first()?.isLeaf).toBe(false)
      await wrapper.setProps({ loadMore: undefined })
      expect(first()?.isLeaf).toBe(true)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}
test('standalone panel rebuilds strict parent candidate index', async () => {
  const wrapper = mount(Panel, {
    props: { options: [{ value: 'root', label: 'Root', children: [{ value: 'leaf', label: 'Leaf' }] }] },
  })
  try {
    const vm = wrapper.vm as unknown as { filteredLeafOptions: { value: unknown }[] }
    expect(vm.filteredLeafOptions.map((item) => item.value)).toEqual(['leaf'])
    await wrapper.setProps({ checkStrictly: true })
    expect(vm.filteredLeafOptions.map((item) => item.value)).toContain('root')
    expect(wrapper.emitted('change')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
