import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Mention from '..'
import { Button } from '../../button'
import { Space } from '../../space'
import AsyncFallbackDemo from '../example/demos/async-fallback-restore.vue'

afterEach(() => vi.useRealTimers())

test('the saved mention demo remounts and resolves asynchronous fallback names', async () => {
  vi.useFakeTimers()
  const wrapper = mount(AsyncFallbackDemo, {
    attachTo: document.body,
    global: { components: { MpMention: Mention, MpButton: Button, MpSpace: Space } },
  })
  try {
    const button = (name: string) => wrapper.findAll('button').find((item) => item.text().includes(name))!
    const saved = () => wrapper.get('[data-saved-value]').text()
    const input = () => wrapper.get('textarea')
    const original = input().element
    expect((original as HTMLTextAreaElement).value).toBe('请联系 @孟帅、@小明、@李四')

    await button('模拟保存并重新加载').trigger('click')
    await nextTick()
    expect(input().element).not.toBe(original)
    expect((input().element as HTMLTextAreaElement).value).toBe('请联系 @shuai.meng、@xiaoming、@lisi')
    expect(wrapper.get('[role=status]').text()).toContain('正在加载姓名')
    expect(saved()).toBe('请联系 @[shuai.meng]、@[xiaoming]、@[lisi]')
    await button('切换到阅读态').trigger('click')
    expect(wrapper.text()).toContain('请联系 @shuai.meng、@xiaoming、@lisi')

    vi.advanceTimersByTime(1500)
    await nextTick()
    expect(wrapper.get('[role=status]').text()).toContain('姓名已加载')
    expect(wrapper.text()).toContain('请联系 @孟帅、@小明、@李四')
    expect(saved()).toBe('请联系 @[shuai.meng]、@[xiaoming]、@[lisi]')
    await button('切换到编辑态').trigger('click')
    const element = input().element as HTMLTextAreaElement
    expect(element.value).toBe('请联系 @孟帅、@小明、@李四')

    element.focus()
    const end = element.value.indexOf('@小明') + '@小明'.length
    element.setSelectionRange(end, end)
    await input().trigger('keydown', { key: 'Backspace' })
    await nextTick()
    expect(element.value).toBe('请联系 @孟帅、、@李四')
    await button('模拟保存并重新加载').trigger('click')
    await nextTick()
    expect(saved()).toBe('请联系 @[shuai.meng]、、@[lisi]')
    expect((input().element as HTMLTextAreaElement).value).toBe('请联系 @shuai.meng、、@lisi')
    vi.advanceTimersByTime(1500)
    await nextTick()
    expect((input().element as HTMLTextAreaElement).value).toBe('请联系 @孟帅、、@李四')
    expect(saved()).toBe('请联系 @[shuai.meng]、、@[lisi]')
  } finally {
    wrapper.unmount()
  }
})
