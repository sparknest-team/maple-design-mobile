import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'
import Button from '../../button'
import Checkbox from '../../checkbox'
import Dialog from '../../dialog'
import Form, { FormItem } from '../../form'
import Radio, { RadioGroup } from '../../radio'
import Space from '../../space'
import CustomSurface from '../example/demos/custom-surface.vue'
import ExternalTrigger from '../example/demos/external-trigger.vue'
import ListTypes from '../example/demos/list-type.vue'
import ManualUpload from '../example/demos/manual-upload.vue'
import RemoveConfirm from '../example/demos/remove-confirm.vue'
import States from '../example/demos/states.vue'
import TriggerPosition from '../example/demos/trigger-position.vue'

const owners = []
const components = {
  'mp-upload': Upload,
  'mp-button': Button,
  'mp-space': Space,
  'mp-form': Form,
  'mp-form-item': FormItem,
  'mp-radio': Radio,
  'mp-radio-group': RadioGroup,
  'mp-checkbox': Checkbox,
  'mp-dialog': Dialog,
}
function render(component) {
  const wrapper = mount(component, { attachTo: document.body, global: { components } })
  owners.push(wrapper)
  return wrapper
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
  vi.useRealTimers()
  document.body.innerHTML = ''
})

test('list layouts share files added through the controlled model', async () => {
  const wrapper = render(ListTypes)
  const upload = wrapper.findComponent(Upload)
  const files = [...upload.props('modelValue'), { uid: 'extra', name: 'extra.txt', status: 'ready', percent: 0 }]
  upload.vm.$emit('update:modelValue', files)
  for (const type of ['text', 'picture-card', 'picture']) {
    await wrapper.get(`input[type=radio][value="${type}"]`).setValue(true)
    expect(upload.props('listType')).toBe(type)
    expect(upload.props('modelValue').map((file) => file.uid)).toEqual(['sample-image', 'extra'])
  }
})

test('reading and interaction states restore the same upload value', async () => {
  const wrapper = render(States)
  const upload = wrapper.findComponent(Upload)
  await wrapper.get('input[value="readonly"]').setValue(true)
  expect(upload.props('readonly')).toBe(true)
  await wrapper.get('input[value="disabled"]').setValue(true)
  expect(upload.props('readonly')).toBe(false)
  expect(upload.props('disabled')).toBe(true)
  await wrapper.get('input[value="reading"]').setValue(true)
  expect(upload.props('readPretty')).toBe(true)
  expect(wrapper.find('input[type=file]').exists()).toBe(false)
  await wrapper.get('input[value="editable"]').setValue(true)
  expect(wrapper.find('input[type=file]').exists()).toBe(true)
  expect(upload.props('modelValue')).toHaveLength(1)
})

test('an external chooser moves without remounting the upload or losing files', async () => {
  const wrapper = render(ExternalTrigger)
  const upload = wrapper.findComponent(Upload)
  const input = wrapper.get('input[type=file]').element
  const choose = vi.spyOn(input, 'click').mockImplementation(() => {})
  expect(upload.props('showUploadButton')).toBe(false)
  await wrapper
    .findAll('button')
    .find((button) => button.text() === '选择文件')
    .trigger('click')
  await flushPromises()
  expect(choose).toHaveBeenCalledTimes(1)
  await wrapper.get('input[type=file]').trigger('cancel')
  await flushPromises()
  await wrapper.get('input[value="after"]').setValue(true)
  await wrapper
    .findAll('button')
    .find((button) => button.text() === '选择文件')
    .trigger('click')
  await flushPromises()
  expect(choose).toHaveBeenCalledTimes(2)
  expect(wrapper.get('input[type=file]').element).toBe(input)
  expect(upload.props('modelValue')).toHaveLength(1)
})

test('remove confirmation cancels or commits the pending removal', async () => {
  const wrapper = render(RemoveConfirm)
  const upload = wrapper.findComponent(Upload)
  const file = upload.props('modelValue')[0]
  let removal = upload.vm.remove(file)
  await flushPromises()
  const dialog = wrapper.findComponent(Dialog)
  expect(dialog.props('open')).toBe(true)
  dialog.vm.cancel()
  await removal
  await flushPromises()
  expect(upload.props('modelValue')).toHaveLength(1)
  removal = upload.vm.remove(file)
  await flushPromises()
  dialog.vm.confirm()
  await removal
  await flushPromises()
  expect(upload.props('modelValue')).toHaveLength(0)
})

test('the custom preview opens a Dialog for the selected file', async () => {
  const wrapper = render(CustomSurface)
  await wrapper.get('.mp-upload__thumb').trigger('click')
  const dialog = wrapper.findComponent(Dialog)
  expect(dialog.props('open')).toBe(true)
  expect(dialog.props('title')).toBe('landscape.svg')
  await flushPromises()
  expect(document.querySelector('.custom-preview-image').getAttribute('src')).toMatch(/^data:image\/svg/)
})

test('manual uploads report failure, retry successfully and can be canceled', async () => {
  vi.useFakeTimers()
  const wrapper = render(ManualUpload)
  const upload = wrapper.findComponent(Upload)
  await wrapper.get('input[type=checkbox]').setValue(true)
  const add = () =>
    wrapper
      .findAll('button')
      .find((button) => button.text() === '加入示例文件')
      .trigger('click')
  await add()
  await upload.vm.submit()
  vi.advanceTimersByTime(1600)
  await flushPromises()
  expect(upload.props('modelValue')[0].status).toBe('error')
  await upload.vm.retry(upload.props('modelValue')[0])
  vi.advanceTimersByTime(1600)
  await flushPromises()
  expect(upload.props('modelValue')[0].status).toBe('success')
  await add()
  await upload.vm.submit()
  upload.vm.abort()
  await flushPromises()
  expect(upload.props('modelValue')[1].status).toBe('canceled')
})

test('the position demo changes layout while preserving the selected model', async () => {
  const wrapper = render(TriggerPosition)
  const upload = wrapper.findComponent(Upload)
  const input = wrapper.get('input[type=file]').element
  expect(upload.props('triggerPosition')).toBe('after')
  await wrapper.get('input[value="before"]').setValue(true)
  expect(upload.props('triggerPosition')).toBe('before')
  await wrapper.get('input[value="picture-card"]').setValue(true)
  expect(upload.props('listType')).toBe('picture-card')
  expect(upload.props('modelValue')).toHaveLength(1)
  expect(wrapper.get('input[type=file]').element).toBe(input)
})
