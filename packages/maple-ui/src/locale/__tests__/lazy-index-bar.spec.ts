import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('IndexBar keeps its accessible name when locale loads after the component', async () => {
  const IndexBar = (await import('../../index-bar/IndexBar.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(IndexBar)
  const label = () => wrapper.get('nav').attributes('aria-label')
  try {
    expect(label()).toBe('索引导航')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(label()).toBe(locale.enUS['indexBar.navigation'])
    locale.add('index-bar-partial', {})
    locale.use('index-bar-partial')
    await nextTick()
    expect(label()).toBe('Index navigation')
    locale.merge('index-bar-partial', { 'indexBar.navigation': '' })
    await nextTick()
    expect(label()).toBe('')
    locale.use('zh-CN')
    await nextTick()
    expect(label()).toBe('索引导航')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'indexBar.navigation': 'Scoped' } } },
          { default: () => h(IndexBar) },
        ),
    })
    try {
      expect(scoped.get('nav').attributes('aria-label')).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
