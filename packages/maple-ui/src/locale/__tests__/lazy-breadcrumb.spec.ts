import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Breadcrumb retains localized labels when locale is loaded later', async () => {
  const Breadcrumb = (await import('../../breadcrumb/Breadcrumb.vue')).default
  const { useBreadcrumbDropdownLabel } = await import('../../breadcrumb/platform')
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const routes = Array.from({ length: 5 }, (_, i) => ({ label: String(i), path: `#${i}` }))
  const wrapper = mount(Breadcrumb, { props: { routes, maxCount: 2 } })
  const dropdown = mount(
    defineComponent({
      setup() {
        const label = useBreadcrumbDropdownLabel()
        return () => h('span', label.value)
      },
    }),
  )
  const label = () => wrapper.attributes('aria-label')
  const ellipsis = () =>
    wrapper
      .find('[aria-label="省略的路径"], [aria-label="Omitted breadcrumb items"], [aria-label="Omitted"]')
      .attributes('aria-label')
  try {
    expect(label()).toBe('面包屑导航')
    expect(ellipsis()).toBe('省略的路径')
    expect(dropdown.text()).toBe('更多操作')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(label()).toBe('Breadcrumb')
    expect(ellipsis()).toBe('Omitted breadcrumb items')
    expect(dropdown.text()).toBe('More actions')
    locale.add('breadcrumb-partial', {})
    locale.use('breadcrumb-partial')
    await nextTick()
    expect(label()).toBe('Breadcrumb')
    expect(ellipsis()).toBe('Omitted breadcrumb items')
    expect(dropdown.text()).toBe('More actions')
    locale.merge('breadcrumb-partial', {
      'breadcrumb.label': '',
      'breadcrumb.ellipsis': 'Omitted',
      'splitButton.moreActions': 'More custom',
    })
    await nextTick()
    expect(label()).toBe('')
    expect(ellipsis()).toBe('Omitted')
    expect(dropdown.text()).toBe('More custom')
    locale.use('zh-CN')
    await nextTick()
    expect(label()).toBe('面包屑导航')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'breadcrumb.label': 'Scoped' } } },
          { default: () => h(Breadcrumb, { routes }) },
        ),
    })
    try {
      expect(scoped.get('[role="navigation"]').attributes('aria-label')).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
    dropdown.unmount()
  }
}, 20000)
