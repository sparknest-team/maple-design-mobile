import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Pagination keeps defaults and localization after the locale module loads', async () => {
  const Pagination = (await import('../../pagination/Pagination.vue')).default
  const { usePaginationLocale } = await import('../../pagination/platform')
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const Inspector = defineComponent({
    setup() {
      const text = usePaginationLocale()
      return () =>
        h(
          'output',
          JSON.stringify({
            ...text.value,
            total: text.value.total(42),
            count: text.value.count(10),
            page: text.value.page(3),
          }),
        )
    },
  })
  const wrapper = mount({ render: () => h('main', [h(Pagination, { total: 42 }), h(Inspector)]) })
  const snapshot = () => JSON.parse(wrapper.get('output').text())
  try {
    expect(snapshot()).toMatchObject({
      navigation: '分页',
      previous: '上一页',
      next: '下一页',
      goto: '前往',
      perPage: '条 / 页',
      total: '共 42 条',
      count: '10 条 / 页',
      page: '前往 3',
    })
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(snapshot().navigation).toBe(locale.enUS.paginationNavigation)
    locale.add('pagination-partial', {})
    locale.use('pagination-partial')
    await nextTick()
    expect(snapshot()).toMatchObject({
      navigation: 'Pagination',
      previous: 'Previous page',
      goto: 'undefined',
      perPage: 'undefined / undefined',
      total: 'undefined',
    })
    locale.merge('pagination-partial', { paginationNavigation: '', paginationTotal: 'Total {0}', paginationJump: 'Go' })
    await nextTick()
    expect(snapshot()).toMatchObject({ navigation: '', goto: 'Go', total: 'Total 42' })
    locale.use('zh-CN')
    await nextTick()
    expect(snapshot().navigation).toBe('分页')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { paginationNavigation: 'Scoped' } } },
          { default: () => h(Pagination, { total: 42 }) },
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
}, 60000)
