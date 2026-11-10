import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Search retains global language behavior when locale loads later', async () => {
  const Search = (await import('../../search/index')).default
  const { useSearchLocale } = await import('../../search/use-search-locale')
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const Inspector = defineComponent({
    setup() {
      const t = useSearchLocale()
      return () =>
        h(
          'output',
          JSON.stringify({ search: t.searchText.value, cancel: t.cancelText.value, history: t.historyText.value }),
        )
    },
  })
  const wrapper = mount({ render: () => h('main', [h(Search), h(Inspector)]) })
  const labels = () => JSON.parse(wrapper.get('output').text())
  try {
    expect(labels()).toEqual({ search: '搜索', cancel: '取消', history: '搜索历史' })
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual({ search: 'Search', cancel: 'Cancel', history: 'Search history' })
    locale.add('search-partial', {})
    locale.use('search-partial')
    await nextTick()
    expect(labels()).toEqual({ search: 'Search', cancel: 'Cancel', history: 'Search history' })
    locale.merge('search-partial', { 'search.search': '', 'search.cancel': 'Custom' })
    await nextTick()
    expect(labels()).toMatchObject({ search: '', cancel: 'Custom' })
    locale.use('zh-CN')
    await nextTick()
    expect(labels().search).toBe('搜索')
  } finally {
    wrapper.unmount()
  }
}, 60000)
