import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Upload from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/regressions/before-remove.vue'

useDemoControls()

const createDemo = () => mount(Demo, { global: { components: { MpUpload: Upload } } })
const action = (wrapper, text) => wrapper.findAll('button').find((button) => button.text() === text)

test('rejected confirmation keeps the file and releases its removal lock', async () => {
  const wrapper = createDemo()
  try {
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await action(wrapper, '异常拒绝删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：1；等待：0；钩子：1；删除：0')
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：0；等待：0；钩子：2；删除：1')
  } finally {
    wrapper.unmount()
  }
})

test('replacement and KeepAlive suspension invalidate old confirmations', async () => {
  const wrapper = createDemo()
  try {
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await action(wrapper, '替换同 UID 文件').trigger('click')
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('replacement.txt')
    expect(wrapper.text()).toContain('文件：1；等待：0；钩子：1；删除：0')
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(false)
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：1；等待：0；钩子：2；删除：0')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(true)
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：0；等待：0；钩子：3；删除：1')
  } finally {
    wrapper.unmount()
  }
})

test('reset invalidates pending removal without emitting remove', async () => {
  const wrapper = createDemo()
  try {
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await action(wrapper, '重置上传队列').trigger('click')
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：0；等待：0；钩子：1；删除：0')
  } finally {
    wrapper.unmount()
  }
})

test('async removal serializes repeated actions and ignores confirmation while disabled', async () => {
  const wrapper = createDemo()
  try {
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    expect(wrapper.text()).toContain('文件：1；等待：1；钩子：1；删除：0')
    await action(wrapper, '取消删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：1；等待：0；钩子：1；删除：0')
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await wrapper.findAll('input[type=checkbox]')[2].setValue(true)
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：1；等待：0；钩子：2；删除：0')
    await wrapper.findAll('input[type=checkbox]')[2].setValue(false)
    await wrapper.find('button[aria-label="删除"]').trigger('click')
    await action(wrapper, '确认删除').trigger('click')
    await flushPromises()
    expect(wrapper.text()).toContain('文件：0；等待：0；钩子：3；删除：1')
  } finally {
    wrapper.unmount()
  }
})

test('unmount settles local pending confirmations as canceled', async () => {
  const wrapper = createDemo()
  await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
  const upload = wrapper.findComponent(Upload)
  const result = upload.props('beforeRemove')(upload.props('modelValue')[0], upload.props('modelValue'))
  wrapper.unmount()
  expect(await result).toBe(false)
})
