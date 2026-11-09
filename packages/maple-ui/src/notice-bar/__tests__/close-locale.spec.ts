import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Provider from '../../locale-provider'
import NoticeBar from '../NoticeBar.vue'

test('close control follows the nearest locale and still closes once', async () => {
  const english = ref(false)
  const owner = mount({
    render: () =>
      h(
        Provider,
        { messages: { 'zh-CN': { 'common.close': english.value ? 'Dismiss notice' : '关闭通知' } } },
        { default: () => h(NoticeBar, { mode: 'closeable' }) },
      ),
  })
  try {
    expect(owner.get('[role=button]').attributes('aria-label')).toBe('关闭通知')
    english.value = true
    await nextTick()
    expect(owner.get('[role=button]').attributes('aria-label')).toBe('Dismiss notice')
    await owner.get('[role=button]').trigger('keydown', { key: 'Enter' })
    expect(owner.getComponent(NoticeBar).emitted('close')).toHaveLength(1)
  } finally {
    owner.unmount()
  }
})
