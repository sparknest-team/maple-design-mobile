import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'

test('standalone Card and Tag update their close names when the locale loads later', async () => {
  const Card = (await import('../../card/Card.vue')).default
  const Tag = (await import('../../tag/Tag.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(
    { render: () => h('main', [h(Card, { floating: true, ripple: false }), h(Tag, { closable: true })]) },
    { attachTo: document.body },
  )
  const labels = () =>
    wrapper.findAll('button[aria-label], [role=button][aria-label]').map((button) => button.attributes('aria-label'))
  try {
    await vi.waitFor(() => expect(labels()).toEqual(['关闭', '关闭']))
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual(['Close', 'Close'])
    locale.add('close-label-test-partial', {})
    locale.use('close-label-test-partial')
    await nextTick()
    expect(labels()).toEqual(['Close', 'Close'])
    locale.merge('close-label-test-partial', { 'common.close': '' })
    await nextTick()
    expect(labels()).toEqual(['', ''])
    locale.use('zh-CN')
    await nextTick()
    expect(labels()).toEqual(['关闭', '关闭'])
  } finally {
    wrapper.unmount()
  }
}, 20000)
