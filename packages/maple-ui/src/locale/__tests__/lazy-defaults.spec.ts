import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('standalone Alert and Loading keep their locale behavior when the public locale is loaded later', async () => {
  const Alert = (await import('../../alert/Alert.vue')).default
  const Loading = (await import('../../loading/Loading.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount({ render: () => h('main', [h(Alert, { closable: true }), h(Loading)]) })
  const labels = () => [
    wrapper.get('[role=button]').attributes('aria-label'),
    wrapper.get('.mp-loading__sr-only').text(),
  ]
  try {
    expect(labels()).toEqual(['关闭', '加载中'])
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual(['Close', 'Loading'])
    locale.add('lazy-test-partial', {})
    locale.use('lazy-test-partial')
    await nextTick()
    expect(labels()).toEqual(['Close', 'Loading'])
    locale.merge('lazy-test-partial', { 'common.close': '', 'loading.text': 'Custom loading' })
    await nextTick()
    expect(labels()).toEqual(['', 'Custom loading'])
    locale.use('zh-CN')
    await nextTick()
    expect(labels()).toEqual(['关闭', '加载中'])
  } finally {
    wrapper.unmount()
  }
}, 20000)
