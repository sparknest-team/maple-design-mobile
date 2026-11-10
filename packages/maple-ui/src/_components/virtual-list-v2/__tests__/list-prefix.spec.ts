import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import VirtualList from '../VirtualList.vue'

test('inserts list prefix inside the table before the virtual row container', async () => {
  const wrapper = mount(VirtualList, {
    props: {
      data: Array.from({ length: 50 }, (_, key) => ({ key })),
      height: 100,
      estimatedSize: 20,
      component: { list: 'table', content: 'tbody' },
    },
    slots: {
      'list-prefix': () => h('thead', [h('tr', [h('th', 'Name')])]),
      item: ({ item }: { item: { key: number } }) => h('tr', [h('td', String(item.key))]),
    },
  })
  try {
    const table = wrapper.get('table').element
    expect(Array.from(table.children, (element) => element.tagName)).toEqual(['THEAD', 'TBODY'])
    expect(table.querySelector('thead th')?.textContent).toBe('Name')
    ;(wrapper.vm as any).scrollTo({ index: 20 })
    await nextTick()
    expect(table.querySelector('thead th')?.textContent).toBe('Name')
    expect(table.querySelector('[data-virtual-list-index="20"]')).not.toBeNull()
  } finally {
    wrapper.unmount()
  }
})
