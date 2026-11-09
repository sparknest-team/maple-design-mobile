import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import VirtualList from '../../_components/virtual-list-v2'
import CascaderColumn from '../cascader-column'

test('switches the column between ordinary and virtual rendering when props change', async () => {
  const wrapper = mount(CascaderColumn, {
    props: {
      column: [{ key: 'a', label: 'Alpha', value: 'a', isLeaf: true, path: [] }] as any,
      selectedPath: [],
      totalLevel: 1,
    },
  })
  try {
    expect(wrapper.findComponent(VirtualList).exists()).toBe(false)
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    await wrapper.setProps({ virtualListProps: { height: 120, component: 'section' } })
    expect(wrapper.findComponent(VirtualList).exists()).toBe(true)
    expect(wrapper.findComponent(VirtualList).element.tagName).toBe('SECTION')
    expect(wrapper.get('ul[role="menu"]').findAll('li[role="menuitem"]')).toHaveLength(1)
    await wrapper.setProps({ virtualListProps: undefined })
    expect(wrapper.findComponent(VirtualList).exists()).toBe(false)
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
