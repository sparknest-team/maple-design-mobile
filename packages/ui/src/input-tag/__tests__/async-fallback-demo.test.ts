import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { InputTag } from '..'
import { Button } from '../../button'
import { Space } from '../../space'
import AsyncFallbackDemo from '../example/demos/async-fallback-restore.vue'

afterEach(() => vi.useRealTimers())

test('the saved input-tag demo remounts and resolves asynchronous fallback names', async () => {
  vi.useFakeTimers()
  const wrapper = mount(AsyncFallbackDemo, {
    attachTo: document.body,
    global: { components: { MpInputTag: InputTag, MpButton: Button, MpSpace: Space } },
  })
  try {
    const button = (name: string) => wrapper.findAll('button').find((item) => item.text().includes(name))!
    const saved = () => wrapper.get('[data-saved-value]').text()
    const tags = () => wrapper.findAll('.mp-input-tag__tag').map((item) => item.text())
    const original = wrapper.get('.mp-input-tag').element
    expect(tags()).toEqual(['孟帅', '小明', '李四'])

    await button('模拟保存并重新加载').trigger('click')
    await nextTick()
    expect(wrapper.get('.mp-input-tag').element).not.toBe(original)
    expect(tags()).toEqual(['shuai.meng', 'xiaoming', 'lisi'])
    expect(wrapper.get('[role=status]').text()).toContain('正在加载姓名')
    expect(JSON.parse(saved())).toEqual(['shuai.meng', 'xiaoming', 'lisi'])
    await button('切换到阅读态').trigger('click')
    expect(wrapper.text()).toContain('shuai.meng, xiaoming, lisi')

    vi.advanceTimersByTime(1500)
    await nextTick()
    expect(wrapper.get('[role=status]').text()).toContain('姓名已加载')
    expect(wrapper.text()).toContain('孟帅, 小明, 李四')
    expect(JSON.parse(saved())).toEqual(['shuai.meng', 'xiaoming', 'lisi'])
    await button('切换到编辑态').trigger('click')
    expect(tags()).toEqual(['孟帅', '小明', '李四'])

    await wrapper.findAll('.mp-tag__close-btn')[1].trigger('click')
    expect(tags()).toEqual(['孟帅', '李四'])
    await button('模拟保存并重新加载').trigger('click')
    await nextTick()
    expect(JSON.parse(saved())).toEqual(['shuai.meng', 'lisi'])
    expect(tags()).toEqual(['shuai.meng', 'lisi'])
    vi.advanceTimersByTime(1500)
    await nextTick()
    expect(tags()).toEqual(['孟帅', '李四'])
    expect(JSON.parse(saved())).toEqual(['shuai.meng', 'lisi'])
  } finally {
    wrapper.unmount()
  }
})
