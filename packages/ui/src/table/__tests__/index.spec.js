import '../../pagination/Pagination.vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Table from '..'

const data = Array.from({ length: 100 }, (_, i) => ({ key: String(i), score: 100 - i }))
const columns = [
  { title: 'Score', dataIndex: 'score', fixed: 'left', sortable: { sortDirections: ['ascend', 'descend'] } },
]
test('sorts before paging and delivers the touched record', async () => {
  const w = mount(Table, { props: { columns, data, pagination: { pageSize: 5 } } })
  await w.get('th [role="button"]').trigger('click')
  expect(w.findAll('tbody td').map((cell) => cell.text())).toEqual(['1', '2', '3', '4', '5'])
  await w.get('tbody tr').trigger('touchstart')
  expect(w.emitted('row-touchstart')[0][0]).toEqual(data[99])
  expect(data[0].score).toBe(100)
  w.unmount()
})
test('virtualizes records in a semantic table', () => {
  const w = mount(Table, {
    props: { columns, data, pagination: false, virtualListProps: { height: 100, fixedSize: true, estimatedSize: 40 } },
  })
  expect(w.findAll('tbody tr').length).toBeGreaterThan(0)
  expect(w.findAll('tbody tr').length).toBeLessThan(data.length)
  expect(w.get('[role=region]').element.style.height).toBe('100px')
  expect(w.get('[role=region] table').attributes('aria-rowcount')).toBe('101')
  expect(w.get('td').classes()).toContain('mp-table-col-fixed-left')
  w.unmount()
})

test('built-in pagination changes the rendered page', async () => {
  const { renderToString } = await import('vue/server-renderer')
  const { h } = await import('vue')
  const html = await renderToString(h(Table, { columns, data, pagination: { pageSize: 3 } }))
  expect(html).toContain('mp-pagination')
  expect(html).toContain('100</')
  const w = mount(Table, { props: { columns, data, pagination: { pageSize: 3 } } })
  const { flushPromises } = await import('@vue/test-utils')
  await flushPromises()
  await w.get('button[aria-label="下一页"]').trigger('click')
  expect(w.get('tbody td').text()).toBe('97')
  expect(w.emitted('page-change')[0]).toEqual([2])
  w.unmount()
})
