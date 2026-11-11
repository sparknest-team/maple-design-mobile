import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/late-request.vue'

vi.mock('@maple-design/ui-vue', () => import('..'))

test('late transport handles abort obsolete attempts and only accept current success', async () => {
  const wrapper = mount(Demo, { global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } } })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  try {
    await click('加入本地文件')
    await click('发起模拟请求')
    await click('取消模拟请求')
    await click('返回所有句柄')
    expect(wrapper.get('[role=status]').text()).toContain('句柄等待：0；发起：1；abort：1；有效成功：0')
    await click('返回所有成功回调')
    expect(wrapper.text()).toContain('late-1.txt: canceled')
    await click('重置模拟')
    await click('加入本地文件')
    await click('发起模拟请求')
    await click('取消模拟请求')
    await click('发起模拟请求')
    expect(wrapper.get('[role=status]').text()).toContain('句柄等待：2；发起：2')
    await click('返回所有句柄')
    await click('返回所有成功回调')
    expect(wrapper.get('[role=status]').text()).toContain('句柄等待：0；发起：2；abort：1；有效成功：1')
    expect(wrapper.text()).toContain('late-2.txt: success')
    await click('重置模拟')
    expect(wrapper.get('[role=status]').text()).toContain('句柄等待：0；发起：0；abort：0；有效成功：0')
  } finally {
    wrapper.unmount()
  }
})
