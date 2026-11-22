import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Table from '..'

const data = [
  { key: 'a', name: 'A', expand: 'details' },
  { key: 'b', name: 'B', expand: 'details' },
]
const columns = [{ title: 'Name', dataIndex: 'name' }]

test('expand is idempotent for repeated keys and supports bulk collapse', () => {
  const wrapper = mount(Table, { props: { data, columns, pagination: false, expandable: {} } })
  try {
    wrapper.vm.expand('a')
    wrapper.vm.expand(['a', 'b', 'b'])
    expect(wrapper.emitted('update:expandedKeys')?.at(-1)).toEqual([['a', 'b']])
    wrapper.vm.expand('a', false)
    expect(wrapper.emitted('update:expandedKeys')?.at(-1)).toEqual([['b']])
  } finally {
    wrapper.unmount()
  }
})

test('controlled expanded keys remain controlled and proposed keys are unique', () => {
  const wrapper = mount(Table, { props: { data, columns, pagination: false, expandable: {}, expandedKeys: ['a'] } })
  try {
    wrapper.vm.expand(['a', 'b'])
    expect(wrapper.emitted('update:expandedKeys')?.at(-1)).toEqual([['a', 'b']])
    expect(wrapper.props('expandedKeys')).toEqual(['a'])
  } finally {
    wrapper.unmount()
  }
})
