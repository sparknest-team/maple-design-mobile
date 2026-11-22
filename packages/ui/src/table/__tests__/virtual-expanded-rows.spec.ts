import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Table from '..'

describe('virtual table expanded rows', () => {
  it('renders expanded detail rows and tree children', async () => {
    const wrapper = mount(Table, {
      props: {
        columns: [{ title: 'Name', dataIndex: 'name' }],
        data: [
          { key: 'detail', name: 'Detail parent' },
          { key: 'tree', name: 'Tree parent', children: [{ key: 'child', name: 'Tree child' }] },
        ],
        pagination: false,
        height: 200,
        virtualListProps: { height: 200, estimatedSize: 40 },
        defaultExpandedKeys: ['detail', 'tree'],
      },
      slots: {
        'expand-row': ({ record }: { record: { key: string } }) =>
          record.key === 'detail' ? h('span', 'Detail content') : null,
      },
    })
    await flushPromises()
    expect(wrapper.find('tbody').text()).toContain('Detail content')
    expect(wrapper.find('tbody').text()).toContain('Tree child')
    wrapper.unmount()
  })

  it('renders expanded virtual records on the server', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(Table, {
            columns: [{ title: 'Name', dataIndex: 'name' }],
            data: [{ key: 'parent', name: 'Parent', children: [{ key: 'child', name: 'Child' }] }],
            pagination: false,
            height: 200,
            virtualListProps: { height: 200, estimatedSize: 40 },
            defaultExpandedKeys: ['parent'],
          }),
      }),
    )
    expect(html).toContain('Parent')
    expect(html).toContain('Child')
  })
})
