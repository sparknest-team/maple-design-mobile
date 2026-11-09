import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Table from '..'
import Locale from '../../locale'
import LocaleProvider from '../../locale-provider'
import enUS from '../../locale/en-US'
import faIR from '../../locale/fa-IR'
import jaJP from '../../locale/ja-JP'
import zhTW from '../../locale/zh-TW'

test('scrollable table region follows the active locale', async () => {
  Locale.add('en-US', enUS)
  Locale.use('zh-CN')
  const wrapper = mount(Table)
  try {
    expect(wrapper.get('[role=region]').attributes('aria-label')).toBe('可滚动表格')
    Locale.use('en-US')
    await nextTick()
    expect(wrapper.get('[role=region]').attributes('aria-label')).toBe('Scrollable table')
  } finally {
    wrapper.unmount()
    Locale.use('zh-CN')
  }
})

test.each([
  ['zh-TW', zhTW, '可捲動表格'],
  ['ja-JP', jaJP, 'スクロール可能な表'],
  ['fa-IR', faIR, 'جدول قابل پیمایش'],
] as const)('provides a translated region name for %s', (name, message, expected) => {
  Locale.add(name, message)
  Locale.use(name)
  const wrapper = mount(Table)
  try {
    expect(wrapper.get('[role=region]').attributes('aria-label')).toBe(expected)
  } finally {
    wrapper.unmount()
    Locale.use('zh-CN')
  }
})

test('a partial custom locale falls back to the English region name', () => {
  Locale.add('partial-table-test', {})
  Locale.use('partial-table-test')
  const wrapper = mount(Table)
  try {
    expect(wrapper.get('[role=region]').attributes('aria-label')).toBe('Scrollable table')
  } finally {
    wrapper.unmount()
    Locale.use('zh-CN')
  }
})

test('a local locale provider overrides the global name and updates reactively', async () => {
  const messages = ref({ 'zh-CN': { 'table.scrollable': '本地区域' } })
  const wrapper = mount({ render: () => h(LocaleProvider, { messages: messages.value }, () => h(Table)) })
  try {
    expect(wrapper.get('[role=region]').attributes('aria-label')).toBe('本地区域')
    messages.value = { 'zh-CN': { 'table.scrollable': '新名称' } }
    await nextTick()
    expect(wrapper.get('[role=region]').attributes('aria-label')).toBe('新名称')
  } finally {
    wrapper.unmount()
  }
})
