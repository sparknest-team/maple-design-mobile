import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Upload from '..'
import Button from '../../button'
import Checkbox from '../../checkbox'
import Space from '../../space'
import EnglishExternalDemo from '../example/demos/en-US/external-state.vue'
import EnglishDemo from '../example/demos/en-US/queue-request.vue'
import ExternalDemo from '../example/demos/external-state.vue'
import QueueDemo from '../example/demos/queue-request.vue'

const wrappers = []
beforeEach(() => {
  let sequence = 0
  vi.stubGlobal(
    'URL',
    Object.assign(class extends URL {}, {
      createObjectURL: vi.fn(() => `blob:queue-review-${++sequence}`),
      revokeObjectURL: vi.fn(),
    }),
  )
})
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
  vi.unstubAllGlobals()
})
const create = (Demo = QueueDemo) => {
  vi.useFakeTimers()
  const wrapper = mount(Demo, {
    global: { components: { MpUpload: Upload, MpButton: Button, MpCheckbox: Checkbox, MpSpace: Space } },
  })
  wrappers.push(wrapper)
  return wrapper
}
async function click(wrapper, text) {
  const button = wrapper.findAll('button').find((button) => button.text() === text)
  expect(button).toBeTruthy()
  await button.trigger('click')
  await flushPromises()
}
async function tick(ms) {
  vi.advanceTimersByTime(ms)
  await flushPromises()
}

test('actual queue demo cancels without stale progress and retries successfully', async () => {
  const wrapper = create()
  await click(wrapper, '加入示例文件')
  expect(wrapper.find('.mp-upload__item--ready').exists()).toBe(true)
  await click(wrapper, '提交队列')
  expect(wrapper.text()).toContain('活动请求：1')
  await tick(400)
  expect(wrapper.text()).toContain('(20%)')
  await wrapper.find('.mp-upload__item--uploading button[aria-label="取消"]').trigger('click')
  await flushPromises()
  expect(wrapper.find('.mp-upload__item--canceled').exists()).toBe(true)
  expect(wrapper.text()).toContain('活动请求：0')
  const canceledState = wrapper.text()
  await tick(600)
  expect(wrapper.text()).toBe(canceledState)
  await wrapper.find('.mp-upload__item--canceled button[aria-label="重试"]').trigger('click')
  await flushPromises()
  await tick(2200)
  expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
  expect(wrapper.text()).toContain('活动请求：0')
})

test.each([
  [QueueDemo, '加入示例文件'],
  [EnglishDemo, 'Add example file'],
])('local demo attachments remain downloadable until owner unmount', async (Demo, add) => {
  const wrapper = create(Demo)
  await click(wrapper, add)
  await click(wrapper, add)
  expect(
    wrapper
      .findComponent(Upload)
      .props('modelValue')
      .map((file) => file.url),
  ).toEqual(['blob:queue-review-1', 'blob:queue-review-2'])
  expect(URL.revokeObjectURL).not.toHaveBeenCalled()
  wrapper.unmount()
  wrappers.splice(wrappers.indexOf(wrapper), 1)
  expect(URL.revokeObjectURL.mock.calls).toEqual([['blob:queue-review-1'], ['blob:queue-review-2']])
})

test('first failure is visible and a retry succeeds', async () => {
  const wrapper = create()
  await wrapper.find('input[type=checkbox]').setValue(true)
  await click(wrapper, '加入示例文件')
  await click(wrapper, '提交队列')
  await tick(2200)
  expect(wrapper.find('.mp-upload__item--error').exists()).toBe(true)
  expect(wrapper.text()).toContain('活动请求：0')
  await wrapper.find('.mp-upload__item--error button[aria-label="重试"]').trigger('click')
  await flushPromises()
  await tick(2200)
  expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
})

test.each([
  [ExternalDemo, '加入外部上传项', '模拟外部完成', '模拟外部重试'],
  [EnglishExternalDemo, 'Add external upload item', 'Complete externally', 'Retry externally'],
])('external progress preserves cancellation, retries and removal', async (Demo, add, complete, retry) => {
  const wrapper = create(Demo)
  await click(wrapper, add)
  await click(wrapper, add)
  await wrapper.find('.mp-upload__item--uploading button').trigger('click')
  await flushPromises()
  await click(wrapper, complete)
  expect(wrapper.findAll('.mp-upload__item--canceled')).toHaveLength(1)
  expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(1)
  expect(wrapper.findAll('.mp-upload__item--canceled button')).toHaveLength(1)
  await click(wrapper, retry)
  expect(wrapper.findAll('.mp-upload__item--uploading')).toHaveLength(1)
  expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(1)
  await wrapper.find('.mp-upload__item--uploading button:last-child').trigger('click')
  await flushPromises()
  await click(wrapper, add)
  await click(wrapper, complete)
  expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(2)
  expect(wrapper.text()).not.toContain('external-1.txt')
})

test('unmounting the active demo clears its request timer', async () => {
  const wrapper = create()
  await click(wrapper, '加入示例文件')
  await click(wrapper, '提交队列')
  expect(wrapper.text()).toContain('活动请求：1')
  wrapper.unmount()
  wrappers.splice(wrappers.indexOf(wrapper), 1)
  expect(vi.getTimerCount()).toBe(0)
})

test('English queue demo exposes the same working submit and cleanup actions', async () => {
  const wrapper = create(EnglishDemo)
  await click(wrapper, 'Add example file')
  await click(wrapper, 'Submit queue')
  expect(wrapper.text()).toContain('Active requests：1')
  await tick(2200)
  expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
  expect(wrapper.text()).toContain('Active requests：0')
})

test('deactivation cancels the request and reactivation can retry', async () => {
  const enabled = ref(true)
  const Host = {
    setup: () => () =>
      h(KeepAlive, null, { default: () => (enabled.value ? h(QueueDemo, { editMode: 'direct' }) : null) }),
  }
  const wrapper = create(Host)
  await click(wrapper, '加入示例文件')
  await click(wrapper, '提交队列')
  expect(wrapper.text()).toContain('活动请求：1')
  enabled.value = false
  await flushPromises()
  expect(vi.getTimerCount()).toBe(0)
  enabled.value = true
  await flushPromises()
  expect(wrapper.find('.mp-upload__item--canceled').exists()).toBe(true)
  await wrapper.find('.mp-upload__item--canceled button[aria-label="重试"]').trigger('click')
  await flushPromises()
  await tick(2200)
  expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
})
