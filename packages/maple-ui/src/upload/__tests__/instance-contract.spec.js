import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'
import { fieldEditModeProp } from '../../_components/field-presentation/context'

const mode = fieldEditModeProp.validator('click') ? 'click' : 'popup'
const owners = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})
const files = [
  { uid: 'a', name: 'accepted.txt', url: 'data:text/plain,a', status: 'success', percent: 100 },
  { uid: 'b', name: 'failed.txt', status: 'error', percent: 0 },
]
const methods = [
  'chooseFile',
  'submit',
  'abort',
  'retry',
  'remove',
  'reset',
  'clearSuccess',
  'clearError',
  'getFiles',
  'replace',
  'preview',
  'closePreview',
]
const render = (props) => {
  const w = mount(Upload, {
    attachTo: document.body,
    props: { editMode: mode, defaultValue: files, autoUpload: false, ...props },
  })
  owners.push(w)
  return w
}
test('all documented methods exist before a deferred editor mounts and getFiles reads filtered accepted snapshots', () => {
  const w = render({})
  for (const key of methods) {
    expect(w.vm[key]).toBeTypeOf('function')
  }
  expect(document.querySelector('input[type=file]')).toBeNull()
  expect(w.vm.getFiles().map((file) => file.uid)).toEqual(['a', 'b'])
  expect(w.vm.getFiles('error').map((file) => file.uid)).toEqual(['b'])
  const snapshot = w.vm.getFiles()
  snapshot[0].name = 'Changed outside'
  expect(w.vm.getFiles()[0].name).toBe('accepted.txt')
})
test('closed asynchronous commands settle safely and keep the accepted model unchanged', async () => {
  const w = render({})
  for (const name of ['chooseFile', 'submit', 'retry', 'remove', 'replace']) {
    expect(w.vm[name]).toBeTypeOf('function')
    const result = name === 'chooseFile' || name === 'submit' ? w.vm[name]() : w.vm[name](files[0])
    expect(result?.then).toBeTypeOf('function')
    await result
  }
  for (const name of ['abort', 'reset', 'clearSuccess', 'clearError', 'preview', 'closePreview']) {
    w.vm[name](files[0])
  }
  expect(document.querySelector('input[type=file]')).toBeNull()
  expect(w.vm.getFiles().map((file) => file.uid)).toEqual(['a', 'b'])
  expect(w.emitted('update:modelValue')).toBeUndefined()
})
test('a stored chooser delegates to the current mounted editor and survives closing and reopening', async () => {
  const w = render({})
  const choose = w.vm.chooseFile
  expect(choose).toBeTypeOf('function')
  const nativeClick = vi.spyOn(document.defaultView.HTMLInputElement.prototype, 'click').mockImplementation(() => {})
  await w.setProps({ open: true })
  await flushPromises()
  expect(document.querySelector('input[type=file]')).not.toBeNull()
  await choose()
  expect(nativeClick).toHaveBeenCalledTimes(1)
  await w.setProps({ open: false })
  await flushPromises()
  await choose()
  expect(nativeClick).toHaveBeenCalledTimes(1)
  await w.setProps({ open: true })
  await flushPromises()
  expect(w.vm.chooseFile).toBe(choose)
  await choose()
  expect(nativeClick).toHaveBeenCalledTimes(2)
})
test('submit awaits preparation and request creation while network completion remains callback-driven', async () => {
  let allow,
    request,
    settled = false
  const file = { uid: 'ready', name: 'new.txt', file: new File(['data'], 'new.txt'), status: 'ready', percent: 0 }
  const customRequest = vi.fn((options) => {
    request = options
    return { abort() {} }
  })
  const w = render({
    editMode: 'direct',
    defaultValue: [file],
    beforeUpload: () =>
      new Promise((resolve) => {
        allow = resolve
      }),
    customRequest,
  })
  const pending = w.vm.submit().then(() => {
    settled = true
  })
  await flushPromises()
  expect(settled).toBe(false)
  expect(customRequest).not.toHaveBeenCalled()
  allow(true)
  await pending
  expect(customRequest).toHaveBeenCalledTimes(1)
  expect(w.vm.getFiles()[0].status).toBe('uploading')
  request.onSuccess('saved')
  await flushPromises()
  expect(w.vm.getFiles()[0].status).toBe('success')
})

test('closing an editor retires its pending removal and stored methods use the reopened queue', async () => {
  let allow
  const w = render({
    beforeRemove: () =>
      new Promise((resolve) => {
        allow = resolve
      }),
  })
  const remove = w.vm.remove
  expect(remove).toBeTypeOf('function')
  await w.setProps({ open: true })
  await flushPromises()
  const pending = remove(files[0])
  await flushPromises()
  expect(w.vm.getFiles().map((file) => file.uid)).toEqual(['a', 'b'])
  await w.setProps({ open: false })
  await flushPromises()
  allow(true)
  await pending
  expect(w.emitted('update:modelValue')).toBeUndefined()
  expect(w.vm.getFiles().map((file) => file.uid)).toEqual(['a', 'b'])
  await w.setProps({ open: true, beforeRemove: () => true })
  await flushPromises()
  expect(w.vm.remove).toBe(remove)
  await remove(files[0])
  expect(w.vm.getFiles().map((file) => file.uid)).toEqual(['b'])
  expect(w.emitted('update:modelValue')).toBeUndefined()
})

test('read slot receives the public nullable file model and formatted text without mounting a queue', () => {
  let scope
  const w = mount(Upload, {
    props: { editMode: mode, readPretty: true, defaultValue: files },
    slots: {
      read: (value) => {
        scope = value
        return h('span', { id: 'upload-read-scope' }, value.value?.map((file) => file.name).join(', ') ?? value.text)
      },
    },
  })
  owners.push(w)
  expect(scope.value.map((file) => file.uid)).toEqual(['a', 'b'])
  expect(typeof scope.text).toBe('string')
  expect(w.get('#upload-read-scope').text()).toContain('accepted.txt')
  expect(document.querySelector('input[type=file]')).toBeNull()
})
