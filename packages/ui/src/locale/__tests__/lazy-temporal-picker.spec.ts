import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('Picker keeps translated labels when the public locale loads later', async () => {
  const Picker = (await import('../../picker/Picker.vue')).default
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const { temporalText } = await import('../temporal-text')
  expect(temporalText('toString')).toBeUndefined()
  const owner = mount(Picker, { props: { columns: [[{ text: 'One', value: 'one' }]] } })
  const title = () => owner.get('.mp-picker__title').text()
  try {
    expect(title()).toBe('请选择')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(title()).toBe('Pick it')
    locale.add('picker-partial', {})
    locale.use('picker-partial')
    await nextTick()
    expect(title()).toBe('')
    locale.merge('picker-partial', { pickerTitle: 'Custom title' })
    await nextTick()
    expect(title()).toBe('Custom title')
    locale.use('zh-CN')
    await nextTick()
    expect(title()).toBe('请选择')
  } finally {
    owner.unmount()
  }
}, 20000)
