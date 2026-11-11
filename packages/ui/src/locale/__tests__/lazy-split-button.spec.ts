import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('SplitButton retains its trigger label when the locale loads later', async () => {
  const SplitButton = (await import('../../split-button/SplitButton.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const wrapper = mount(SplitButton, { slots: { default: 'Save' } })
  const label = () => wrapper.get('button[aria-haspopup="menu"]').attributes('aria-label')
  try {
    expect(label()).toBe('更多操作')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(label()).toBe('More actions')
    locale.add('split-partial', {})
    locale.use('split-partial')
    await nextTick()
    expect(label()).toBe('More actions')
    locale.merge('split-partial', { 'splitButton.moreActions': '' })
    await nextTick()
    expect(label()).toBe('')
    await wrapper.setProps({ triggerButtonProps: { 'aria-label': 'Custom' } })
    expect(label()).toBe('Custom')
    await wrapper.setProps({ triggerButtonProps: {} })
    locale.use('zh-CN')
    await nextTick()
    expect(label()).toBe('更多操作')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'splitButton.moreActions': 'Scoped' } } },
          { default: () => h(SplitButton) },
        ),
    })
    try {
      expect(scoped.get('button[aria-haspopup="menu"]').attributes('aria-label')).toBe('Scoped')
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 20000)
