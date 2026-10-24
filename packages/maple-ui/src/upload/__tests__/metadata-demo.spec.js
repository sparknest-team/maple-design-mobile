import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/metadata-request.vue'

useDemoControls()

vi.mock('@maple-design/ui', () => import('..'))
test('metadata rejection settles once and late rejected canceled work cannot overwrite retries', async () => {
  const OriginalXHR = XMLHttpRequest
  const send = vi.fn()
  class FakeXHR {
    upload = {}
    abort = vi.fn()
    open = vi.fn()
    send = send
  }
  vi.stubGlobal('XMLHttpRequest', FakeXHR)
  const wrapper = mount(Demo, { global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } } })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  try {
    await wrapper.get('input').setValue('http://127.0.0.1:4197/upload')
    await click('加入合成文件')
    await click('提交元数据请求')
    await click('拒绝 headers')
    expect(wrapper.text()).toContain('metadata-1.txt: error')
    expect(wrapper.get('p[role=status]').text()).toContain('错误：1')
    await click('提交元数据请求')
    await click('返回 data')
    expect(wrapper.text()).toContain('metadata-1.txt: uploading')
    await click('拒绝 headers')
    expect(wrapper.get('p[role=status]').text()).toContain('错误：2')
    await click('提交元数据请求')
    await click('拒绝 data')
    expect(wrapper.get('p[role=status]').text()).toContain('错误：3')
    await click('提交元数据请求')
    await click('取消元数据请求')
    await click('拒绝 headers')
    await click('拒绝 data')
    expect(wrapper.text()).toContain('metadata-1.txt: canceled')
    expect(wrapper.get('p[role=status]').text()).toContain('成功：0；错误：3')
    expect(send).not.toHaveBeenCalled()
    await click('重置元数据示例')
    expect(wrapper.get('p[role=status]').text()).toContain('成功：0；错误：0')
  } finally {
    wrapper.unmount()
    vi.stubGlobal('XMLHttpRequest', OriginalXHR)
  }
})
test('metadata demo cancels either unresolved metadata branch before XHR send', async () => {
  const OriginalXHR = XMLHttpRequest
  const instances = []
  class FakeXHR {
    upload = {}
    open = vi.fn()
    abort = vi.fn()
    setRequestHeader = vi.fn()
    getResponseHeader = () => 'application/json'
    send = vi.fn(() => {
      this.status = 200
      this.responseText = '{"local":true}'
      this.onload?.(new Event('load'))
    })
    constructor() {
      instances.push(this)
    }
  }
  vi.stubGlobal('XMLHttpRequest', FakeXHR)
  const wrapper = mount(Demo, { global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } } })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  try {
    await wrapper.get('input').setValue('http://127.0.0.1:4197/upload')
    await click('加入合成文件')
    for (const [first, second] of [
      ['返回 headers', '返回 data'],
      ['返回 data', '返回 headers'],
    ]) {
      await click('提交元数据请求')
      await click(first)
      await click('取消元数据请求')
      await click(second)
      expect(instances.at(-1).send).not.toHaveBeenCalled()
      expect(wrapper.text()).toContain('metadata-1.txt: canceled')
    }
    await click('提交元数据请求')
    await click('返回 headers')
    expect(instances.at(-1).send).not.toHaveBeenCalled()
    await click('返回 data')
    expect(instances.at(-1).send).toHaveBeenCalledTimes(1)
    expect(wrapper.get('[role=status]').text()).toContain('成功：1；错误：0')
    expect(wrapper.text()).toContain('metadata-1.txt: success')
  } finally {
    wrapper.unmount()
    vi.stubGlobal('XMLHttpRequest', OriginalXHR)
  }
})
