import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import LocaleProvider from '../../locale-provider'

import en from '../../locale/en-US'
import zh from '../../locale/zh-CN'
import Table from '..'

test.each(['checkbox', 'radio'] as const)('%s selection controls follow the locale and identify each row', async type => {
  const locale = ref('en-US')
  const wrapper = mount({ render: () => h(LocaleProvider, { locale: locale.value, messages: { 'en-US': en, 'zh-CN': zh } }, () => h(Table, {
    columns: [{ title: 'Name', dataIndex: 'name' }],
    data: [{ key: 'ada', name: 'Ada' }, { key: 'bob', name: 'Bob' }], pagination: false, height: 200,
    rowSelection: { type, showCheckedAll: true },
  })) })
  try {
    const rows = wrapper.findAll(`tbody input[type="${type}"]`)
    expect(rows.map(input => input.attributes('aria-label'))).toEqual(['Select row ada', 'Select row bob'])
    if (type === 'checkbox') expect(wrapper.get('thead input[type="checkbox"]').attributes('aria-label')).toBe('Select All')
    expect(wrapper.get(`thead th[data-operation-key="selection-${type}"]`).attributes('aria-label')).toBe(type === 'checkbox' ? 'Select All' : 'Selection')
    await rows[0].setValue(true)
    expect((rows[0].element as HTMLInputElement).checked).toBe(true)
    locale.value = 'zh-CN'
    await wrapper.vm.$nextTick()
    expect(rows.map(input => input.attributes('aria-label'))).toEqual(['选择行 ada', '选择行 bob'])
    if (type === 'checkbox') expect(wrapper.get('thead input[type="checkbox"]').attributes('aria-label')).toBe('全选')
    expect(wrapper.get(`thead th[data-operation-key="selection-${type}"]`).attributes('aria-label')).toBe(type === 'checkbox' ? '全选' : '选择')
    locale.value = 'en-US'
    await wrapper.vm.$nextTick()
    expect(rows[0].attributes('aria-label')).toBe('Select row ada')
    if (type === 'radio') expect(wrapper.get('thead th[data-operation-key="selection-radio"]').attributes('aria-label')).toBe('Selection')
  } finally { wrapper.unmount() }
})

test('a visible selection title remains the select-all name', () => {
  const wrapper = mount(Table, { props: {
    columns: [{ title: 'Name', dataIndex: 'name' }], data: [{ key: 'ada', name: 'Ada' }], pagination: false,
    rowSelection: { type: 'checkbox', showCheckedAll: true, title: 'Choose all items' },
  } })
  try {
    const input = wrapper.get('thead input[type="checkbox"]')
    expect(input.attributes('aria-label')).toBeUndefined()
    expect(input.element.closest('label')?.textContent).toContain('Choose all items')
  } finally { wrapper.unmount() }
})
