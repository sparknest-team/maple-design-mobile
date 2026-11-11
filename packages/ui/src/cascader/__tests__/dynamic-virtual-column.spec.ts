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
    expect(wrapper.get('ul[role="menu"]').findAll('li:is([role="menuitem"],[role="menuitemradio"])')).toHaveLength(1)
    await wrapper.setProps({ virtualListProps: undefined })
    expect(wrapper.findComponent(VirtualList).exists()).toBe(false)
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('switching parent starts a new virtual column at the top', async () => {
  const options = (prefix: string) =>
    Array.from({ length: 40 }, (_, i) => ({
      key: `${prefix}-${i}`,
      value: `${prefix}-${i}`,
      label: `${prefix} ${i}`,
      isLeaf: true,
      path: [],
    }))
  const wrapper = mount(CascaderColumn, {
    attachTo: document.body,
    props: {
      column: options('first') as any,
      level: 1,
      selectedPath: ['first'],
      totalLevel: 2,
      virtualListProps: { height: 120, estimatedSize: 32, fixedSize: true, buffer: 0 },
    },
  })
  try {
    const list = wrapper.findComponent(VirtualList)
    ;(list.element as HTMLElement).scrollTop = 640
    await list.trigger('scroll')
    await wrapper.setProps({ column: options('second') as any, selectedPath: ['second'] })
    const nextList = wrapper.findComponent(VirtualList)
    expect((nextList.element as HTMLElement).scrollTop).toBe(0)
    expect(wrapper.find('[title="second 0"]').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
