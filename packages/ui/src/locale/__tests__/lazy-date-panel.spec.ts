import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('date navigation keeps labels when global locale loads later', async () => {
  const Header = (await import('../../date/picker-panels/PanelHeader.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const { dateText } = await import('../date-text')
  expect(dateText('toString')).toBeUndefined()
  const owner = mount(Header, {
    props: { date: { previewYear: '2025', previewMonth: '02' }, disabled: { left: false, right: false } },
  })
  try {
    expect(owner.find('[aria-label="上一月"]').exists()).toBe(true)
    expect(owner.find('[aria-label="下一月"]').exists()).toBe(true)
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(owner.find('[aria-label="Previous month"]').exists()).toBe(true)
    expect(owner.find('[aria-label="Next month"]').exists()).toBe(true)
    locale.add('date-partial', {})
    locale.use('date-partial')
    await nextTick()
    expect(owner.find('[aria-label="下一月"]').exists()).toBe(false)
    locale.merge('date-partial', { datePickerNextMonth: 'Custom next' })
    await nextTick()
    expect(owner.find('[aria-label="Custom next"]').exists()).toBe(true)
    locale.use('zh-CN')
    await nextTick()
    expect(owner.find('[aria-label="下一月"]').exists()).toBe(true)
  } finally {
    owner.unmount()
  }
}, 20000)
