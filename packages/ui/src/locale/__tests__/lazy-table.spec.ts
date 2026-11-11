import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Table preserves its region name when the global locale loads later', async () => {
  const Table = (await import('../../table/Table.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(Table)
  const label = () => wrapper.get('[role=region]').attributes('aria-label')
  try {
    expect(label()).toBe('可滚动表格')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(label()).toBe('Scrollable table')
    locale.add('table-partial-lazy', {})
    locale.use('table-partial-lazy')
    await nextTick()
    expect(label()).toBe('Scrollable table')
    locale.merge('table-partial-lazy', { 'table.scrollable': '' })
    await nextTick()
    expect(label()).toBe('')
    locale.use('zh-CN')
    await nextTick()
    expect(label()).toBe('可滚动表格')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(Provider, { locale: 'local', messages: { local: { 'table.scrollable': 'Scoped' } } }, () => h(Table)),
    })
    try {
      expect(scoped.get('[role=region]').attributes('aria-label')).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
