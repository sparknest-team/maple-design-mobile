import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('PageHeader remains localized when the public locale loads after the component', async () => {
  const PageHeader = (await import('../../page-header/PageHeader.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(PageHeader, { props: { showBack: true } })
  const label = () => wrapper.get('button').attributes('aria-label')
  try {
    expect(label()).toBe('返回')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(label()).toBe('Back')
    locale.add('header-partial', {})
    locale.use('header-partial')
    await nextTick()
    expect(label()).toBe('Back')
    locale.merge('header-partial', { 'common.back': '' })
    await nextTick()
    expect(label()).toBe('')
    locale.use('zh-CN')
    await nextTick()
    expect(label()).toBe('返回')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'common.back': 'Scoped' } } },
          { default: () => h(PageHeader, { showBack: true }) },
        ),
    })
    try {
      expect(scoped.get('button').attributes('aria-label')).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
