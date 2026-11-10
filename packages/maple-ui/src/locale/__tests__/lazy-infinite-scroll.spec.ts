import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('InfiniteScroll retains its existing status text when locale loads later', async () => {
  const InfiniteScroll = (await import('../../infinite-scroll/InfiniteScroll.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(InfiniteScroll, { props: { status: 'loading', disabled: true } })
  const content = () => wrapper.text()
  try {
    expect(content()).toContain('加载中')
    await wrapper.setProps({ status: 'error' })
    expect(content()).toContain('加载失败，点击重试')
    await wrapper.setProps({ status: 'finished' })
    expect(content()).toContain('没有更多了')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(content()).toContain(locale.enUS.infiniteScrollFinishedText)
    await wrapper.setProps({ status: 'error' })
    expect(content()).toContain(locale.enUS.infiniteScrollErrorText)
    await wrapper.setProps({ status: 'loading' })
    expect(content()).toContain(locale.enUS.infiniteScrollLoadingText)
    locale.add('infinite-partial', {})
    locale.use('infinite-partial')
    await nextTick()
    expect(wrapper.get('.mp-infinite-scroll__loading-text').text()).toBe('')
    locale.merge('infinite-partial', { infiniteScrollLoadingText: 'Custom' })
    await nextTick()
    expect(wrapper.get('.mp-infinite-scroll__loading-text').text()).toBe('Custom')
    locale.merge('infinite-partial', { infiniteScrollLoadingText: '' })
    await nextTick()
    expect(wrapper.get('.mp-infinite-scroll__loading-text').text()).toBe('')
    locale.use('zh-CN')
    await nextTick()
    expect(content()).toContain('加载中')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { infiniteScrollFinishedText: 'Scoped' } } },
          { default: () => h(InfiniteScroll, { status: 'finished', disabled: true }) },
        ),
    })
    try {
      expect(scoped.text()).toContain('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
