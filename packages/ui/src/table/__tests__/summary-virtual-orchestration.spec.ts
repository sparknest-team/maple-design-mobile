import { flushPromises, mount } from '@vue/test-utils'
import { toRaw } from 'vue'
import { expect, test, vi } from 'vitest'
import Table from '..'
import type { TableColumnData, TableData } from '../types'

const modes = [
  ['inline', {}],
  ['split', { height: 180 }],
  ['virtual', { virtualListProps: { height: 180, estimatedSize: 30 } }],
] as const

for (const [mode, layout] of modes) {
  test(`${mode} summary follows filter/sort/current-page data and retains raw event identity`, async () => {
    const rows = [
      { key: 'a', name: 'Alpha', score: 2, status: 'active' },
      { key: 'b', name: 'Beta', score: 5, status: 'active' },
      { key: 'c', name: 'Gamma', score: 9, status: 'blocked' },
      { key: 'd', name: 'Delta', score: 1, status: 'active' },
    ]
    const columns = (direction: 'ascend' | 'descend', status = 'active'): TableColumnData[] => [
      { dataIndex: 'name', title: 'Name', filterable: { filteredValue: [status], filter: (values, row) => values.includes(row.status) } },
      { dataIndex: 'score', title: 'Score', sortable: { sortOrder: direction, sortDirections: ['ascend', 'descend'] } },
    ]
    const summaryRow = { key: 'summary', name: 'Aggregate', score: 0 }
    const summary = vi.fn(({ data }: { columns: TableColumnData[]; data: TableData[] }) => {
      summaryRow.score = data.reduce((total, row) => total + row.score, 0)
      return [summaryRow]
    })
    const owner = mount(Table, { props: {
      ...layout, columns: columns('descend'), data: rows, summary,
      pagination: { modelValue: 2, pageSize: 1, responsive: false },
      rowSelection: { type: 'checkbox' },
    } })
    try {
      await flushPromises()
      expect(summary.mock.lastCall![0].data.map(row => toRaw(row))).toEqual([rows[0]])
      expect(toRaw(summary.mock.lastCall![0].data[0])).toBe(rows[0])
      expect(owner.get('tfoot td[data-column-key="score"]').text()).toBe('2')
      await owner.get('tfoot td[data-column-key="score"]').trigger('click')
      expect(toRaw(owner.emitted('cell-click')!.at(-1)![0])).toBe(summaryRow)
      expect(toRaw(owner.emitted('row-click')!.at(-1)![0])).toBe(summaryRow)
      await owner.setProps({ pagination: { modelValue: 1, pageSize: 1, responsive: false } })
      expect(owner.get('tfoot td[data-column-key="score"]').text()).toBe('5')
      await owner.setProps({ columns: columns('ascend') })
      expect(owner.get('tfoot td[data-column-key="score"]').text()).toBe('1')
      await owner.setProps({ columns: columns('descend', 'blocked') })
      expect(owner.get('tfoot td[data-column-key="score"]').text()).toBe('9')
      expect(toRaw(summary.mock.lastCall![0].data[0])).toBe(rows[2])
    } finally { owner.unmount() }
  })

  test(`${mode} default totals preserve nested paths, nulls, nonnumeric values and empty pages`, async () => {
    const owner = mount(Table, { props: {
      ...layout, columns: ['name', 'stats.amount', 'mixed', 'optional'].map(dataIndex => ({ dataIndex })),
      data: [
        { key: 'a', name: 'Alpha', stats: { amount: 2 }, mixed: 'bad', optional: null },
        { key: 'b', name: 'Beta', stats: { amount: 3 }, mixed: 9 },
        { key: 'c', name: 'Gamma', stats: { amount: 100 }, mixed: 8, optional: 5 },
      ],
      summary: true, summaryText: 'Aggregate', pagination: { modelValue: 1, pageSize: 2, responsive: false },
    } })
    const totals = () => owner.findAll('tfoot td[data-column-key]').map(cell => cell.text())
    try {
      await flushPromises()
      expect(totals()).toEqual(['Aggregate', '5', '', '0'])
      await owner.setProps({ pagination: { modelValue: 2, pageSize: 2, responsive: false } })
      expect(totals()).toEqual(['Aggregate', '100', '8', '5'])
      await owner.setProps({ data: [] })
      expect(totals()).toEqual(['Aggregate', '0', '0', '0'])
    } finally { owner.unmount() }
  })
}

test('virtual prop overrides keep their original precedence without changing the summary data owner', async () => {
  const external = { key: 'external', name: 'External row', score: 99 }
  const owner = mount(Table, { props: {
    columns: [{ dataIndex: 'name' }, { dataIndex: 'score' }],
    data: [{ key: 'original', name: 'Original row', score: 7 }], pagination: false, summary: true,
    virtualListProps: {
      height: 150, estimatedSize: 30, itemKey: 'key',
      data: [{ key: 'external', raw: external }],
      component: { list: 'table', content: 'tbody' },
      listAttrs: { 'data-virtual-owner': 'caller' },
    } as any,
  } })
  try {
    await flushPromises()
    expect(owner.get('[data-virtual-owner="caller"] tbody').text()).toContain('External row')
    expect(owner.get('tfoot td[data-column-key="score"]').text()).toBe('7')
    expect(owner.get('[data-virtual-owner="caller"]').attributes('aria-rowcount')).toBeUndefined()
  } finally { owner.unmount() }
})

test('body and summary cells retain all native event payloads and shared hover debounce', async () => {
  const body = { key: 'body', name: 'Body', score: 2 }
  const total = { key: 'total', name: 'Total', score: 2 }
  const owner = mount(Table, { props: {
    columns: [{ dataIndex: 'name' }, { dataIndex: 'score' }], data: [body],
    summary: () => [total], pagination: false,
    virtualListProps: { height: 150, estimatedSize: 30 },
  } })
  try {
    await flushPromises()
    const cell = owner.get('tbody td[data-column-key="score"]')
    const summary = owner.get('tfoot td[data-column-key="score"]')
    for (const [target, raw] of [[cell, body], [summary, total]] as const) {
      for (const event of ['click', 'dblclick', 'contextmenu']) {
        await target.trigger(event)
        const payload = owner.emitted(`cell-${event}`)!.at(-1)!
        expect(toRaw(payload[0])).toBe(raw)
        expect((payload[1] as TableColumnData).dataIndex).toBe('score')
        expect((payload[2] as Event).type).toBe(event)
      }
    }
    await cell.trigger('mouseenter'); await summary.trigger('mouseenter')
    await cell.trigger('mouseleave'); await summary.trigger('mouseleave')
    expect(owner.emitted('cell-mouse-enter')).toBeUndefined()
    expect(owner.emitted('cell-mouse-leave')).toBeUndefined()
    await new Promise(resolve => setTimeout(resolve, 60))
    expect(owner.emitted('cell-mouse-enter')).toHaveLength(1)
    expect(owner.emitted('cell-mouse-leave')).toHaveLength(1)
    expect(toRaw(owner.emitted('cell-mouse-enter')![0][0])).toBe(total)
    expect(toRaw(owner.emitted('cell-mouse-leave')![0][0])).toBe(total)
  } finally { owner.unmount() }
})
