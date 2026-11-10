import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('standalone Empty keeps locale and provider behavior when the public locale loads later', async () => {
  const Empty = (await import('../../empty/Empty.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(Empty)
  try {
    expect(wrapper.text()).toBe('暂无数据')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(wrapper.text()).toBe(locale.enUS.emptyDescription)
    locale.add('empty-test-partial', {})
    locale.use('empty-test-partial')
    await nextTick()
    expect(wrapper.text()).toBe('')
    locale.merge('empty-test-partial', { emptyDescription: 'Custom' })
    await nextTick()
    expect(wrapper.text()).toBe('Custom')
    locale.merge('empty-test-partial', { emptyDescription: '' })
    await nextTick()
    expect(wrapper.text()).toBe('')
    locale.use('zh-CN')
    await nextTick()
    expect(wrapper.text()).toBe('暂无数据')
    const LocaleProvider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          LocaleProvider,
          { locale: 'local', messages: { local: { emptyDescription: 'Scoped' } } },
          { default: () => h(Empty) },
        ),
    })
    try {
      expect(scoped.text()).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
