import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Table from '..'
import type { TableData } from '../types'

it('updates virtual row positions as lazy tree children load and collapse', async () => {
  let finish: ((children?: TableData[]) => void) | undefined
  const wrapper = mount(Table, {
    props: {
      columns: [{ title: 'Name', dataIndex: 'name' }],
      data: [
        { key: 'parent', name: 'Parent' },
        { key: 'last', name: 'Last', isLeaf: true },
      ],
      pagination: false,
      virtualListProps: { height: 200, estimatedSize: 30 },
      loadMore: (_record: TableData, done: (children?: TableData[]) => void) => {
        finish = done
      },
    },
  })
  try {
    await flushPromises()
    const table = wrapper.get('.mp-table-body table')
    const positions = () => table.findAll('tbody tr').map((row) => [row.text(), row.attributes('aria-rowindex')])
    expect(table.attributes('aria-rowcount')).toBe('3')
    expect(positions()).toEqual([
      ['Parent', '2'],
      ['Last', '3'],
    ])
    await wrapper.get('button[aria-expanded]').trigger('click')
    expect(finish).toBeTypeOf('function')
    expect(table.attributes('aria-rowcount')).toBe('3')
    finish!([{ key: 'child', name: 'Child', isLeaf: true }])
    await flushPromises()
    expect(table.attributes('aria-rowcount')).toBe('4')
    expect(positions()).toEqual([
      ['Parent', '2'],
      ['Child', '3'],
      ['Last', '4'],
    ])
    await wrapper.get('button[aria-expanded]').trigger('click')
    await flushPromises()
    expect(table.attributes('aria-rowcount')).toBe('3')
    expect(positions()).toEqual([
      ['Parent', '2'],
      ['Last', '3'],
    ])
  } finally {
    wrapper.unmount()
  }
})

it('ignores a stale lazy result after a same-key record replacement', async () => {
  const jobs: ((children?: TableData[]) => void)[] = []
  const row = (name: string) => ({ key: 'parent', name })
  const wrapper = mount(Table, {
    props: {
      columns: [{ title: 'Name', dataIndex: 'name' }],
      data: [row('Old parent'), { key: 'last', name: 'Last', isLeaf: true }],
      pagination: false,
      virtualListProps: { height: 200, estimatedSize: 30 },
      loadMore: (_record: TableData, done: (children?: TableData[]) => void) => {
        jobs.push(done)
      },
      defaultExpandedKeys: ['parent'],
    },
  })
  try {
    await flushPromises()
    const table = wrapper.get('.mp-table-body table')
    await wrapper.get('button[aria-expanded]').trigger('click')
    await wrapper.setProps({ data: [row('New parent'), { key: 'last', name: 'Last', isLeaf: true }] })
    await wrapper.get('button[aria-expanded]').trigger('click')
    expect(jobs).toHaveLength(2)
    jobs[1]([{ key: 'new', name: 'New child', isLeaf: true }])
    await flushPromises()
    expect(table.attributes('aria-rowcount')).toBe('4')
    expect(table.findAll('tbody tr').map((row) => [row.text(), row.attributes('aria-rowindex')])).toEqual([
      ['New parent', '2'],
      ['New child', '3'],
      ['Last', '4'],
    ])
    jobs[0]([
      { key: 'old1', name: 'Old child 1', isLeaf: true },
      { key: 'old2', name: 'Old child 2', isLeaf: true },
    ])
    await flushPromises()
    expect(table.attributes('aria-rowcount')).toBe('4')
    expect(table.findAll('tbody tr').map((row) => [row.text(), row.attributes('aria-rowindex')])).toEqual([
      ['New parent', '2'],
      ['New child', '3'],
      ['Last', '4'],
    ])
  } finally {
    wrapper.unmount()
  }
})
