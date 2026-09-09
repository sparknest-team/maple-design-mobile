import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Upload from '..'
import { delay, mockFileReader, mockStubs, triggerKeyboard } from '../../utils/test'
import VarUpload from '../Upload'

beforeEach(() => {
  let id = 0
  class TestURL extends URL {}
  TestURL.createObjectURL = vi.fn(() => 'blob:upload-' + id++)
  TestURL.revokeObjectURL = vi.fn()
  vi.stubGlobal('URL', TestURL)
})
afterEach(() => vi.unstubAllGlobals())

const createEvent = (filename, type) => ({
  target: {
    files: [new File([], filename, { type })],
  },
})

test('upload releases only owned object URLs on removal and unmount', async () => {
  const external = { uid: 'external', url: 'blob:external', status: 'ready', percent: 0 }
  const wrapper = mount(VarUpload, {
    props: { modelValue: [external], 'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }) },
  })
  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  const owned = wrapper.vm.modelValue[1].url
  expect(URL.createObjectURL).toHaveBeenCalledTimes(1)
  await wrapper.setProps({ modelValue: [external] })
  expect(URL.revokeObjectURL).toHaveBeenCalledWith(owned)
  await wrapper.vm.handleChange(createEvent('dog.png', 'image/png'))
  wrapper.unmount()
  expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2)
  expect(URL.revokeObjectURL).not.toHaveBeenCalledWith('blob:external')
})

test('upload ignores a pending reader after unmount', async () => {
  let resolve
  const beforeRead = () =>
    new Promise((done) => {
      resolve = done
    })
  const update = vi.fn()
  const wrapper = mount(VarUpload, { props: { beforeRead, 'onUpdate:modelValue': update } })
  const pending = wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  wrapper.unmount()
  resolve(true)
  await pending
  expect(update).not.toHaveBeenCalled()
  expect(URL.createObjectURL).not.toHaveBeenCalled()
})

test('upload validates replacement file size and handles rejected hooks', async () => {
  const oversize = vi.fn()
  const wrapper = mount(VarUpload, {
    props: { maxFileSize: 2, beforeRead: () => new File(['large'], 'replacement.png'), onOversize: oversize },
  })
  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(oversize).toHaveBeenCalledTimes(1)
  expect(URL.createObjectURL).not.toHaveBeenCalled()
  await wrapper.setProps({ beforeRead: () => Promise.reject(new Error('rejected')) })
  await expect(wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))).resolves.toBeUndefined()
  expect(URL.createObjectURL).not.toHaveBeenCalled()
  wrapper.unmount()
})

test('upload plugin', () => {
  const app = createApp({}).use(Upload)
  expect(app.component(Upload.name)).toBeTruthy()
})

test('upload onAfterRead', async () => {
  const onAfterRead = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      onAfterRead,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(onAfterRead).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('upload beforeAdd', async () => {
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
      beforeAdd: (files) => files.filter((file) => file.name.endsWith('jpg')),
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(wrapper.vm.modelValue).toHaveLength(0)

  await wrapper.vm.handleChange(createEvent('cat.jpg', 'image/jpg'))
  expect(wrapper.vm.modelValue).toHaveLength(1)

  await wrapper.setProps({
    modelValue: [],
    multiple: true,
    'onUpdate:modelValue': onUpdateModelValue,
    beforeAdd(files) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(files.filter((file) => file.name.endsWith('jpg')))
        }, 1000)
      })
    },
  })

  const event = {
    target: {
      files: [new File([], 'cat.jpg'), new File([], 'dog.png'), new File([], 'dog.jpg')],
    },
  }

  await wrapper.vm.handleChange(event)
  expect(wrapper.vm.modelValue).toHaveLength(2)

  wrapper.unmount()
})

test('upload beforeRead', async () => {
  const onAfterRead = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      onAfterRead,
      beforeRead: (file) => file.name.endsWith('jpg'),
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(onAfterRead).toHaveBeenCalledTimes(0)

  await wrapper.vm.handleChange(createEvent('cat.jpg', 'image/png'))
  expect(onAfterRead).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('upload preview', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [
        {
          url: 'https://maplejs.org/cat.jpg',
          thumbnailUrl: 'https://maplejs.org/cat.jpg',
        },
      ],
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.find('.mp-upload__file').trigger('click')
  await delay(100)
  expect(document.querySelector('[data-image-preview-stage]')).not.toBeNull()
  wrapper.vm.closePreview()
  await delay(300)

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload preview event', async () => {
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onPreview = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [
        {
          url: 'https://maplejs.org/cat.jpg',
          thumbnailUrl: 'https://maplejs.org/cat.jpg',
        },
      ],
      onPreview,
    },
  })
  await wrapper.find('.mp-upload__file').trigger('click')
  expect(onPreview).toHaveBeenCalledTimes(1)
  wrapper.vm.closePreview()
  await delay(300)
  mockRestoreStubs()
  wrapper.unmount()
})

test('upload prevent default preview', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [
        {
          url: 'https://maplejs.org/cat.jpg',
          thumbnailUrl: 'https://maplejs.org/cat.jpg',
        },
      ],
      preventDefaultPreview: true,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  wrapper.setProps({ preventDefaultPreview: true })
  await delay(100)
  await wrapper.find('.mp-upload__file').trigger('click')
  expect(document.querySelectorAll('.mp-popup').length).toBe(1)

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload onOversize', async () => {
  const onOversize = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      maxFileSize: -1,
      onOversize,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(onOversize).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

test('upload onRemove', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onRemove = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      onRemove,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(onUpdateModelValue).toHaveBeenCalledTimes(1)

  await wrapper.find('.mp-upload__file-close').trigger('click')
  expect(onUpdateModelValue).toHaveBeenCalledTimes(2)
  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.modelValue).toStrictEqual([])

  wrapper.unmount()
  mockRestore()
})

test('upload beforeRemove', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const beforeRemove = vi.fn(() => false)
  const onRemove = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      beforeRemove,
      onRemove,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(onUpdateModelValue).toHaveBeenCalledTimes(1)

  await wrapper.find('.mp-upload__file-close').trigger('click')
  expect(beforeRemove).toHaveBeenCalledTimes(1)
  expect(onUpdateModelValue).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledTimes(0)
  expect(wrapper.vm.modelValue).toHaveLength(1)

  wrapper.unmount()
  mockRestore()
})

test('upload disabled', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))
  const onRemove = vi.fn()
  const onAfterRead = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      disabled: false,
      modelValue: [],
      onAfterRead,
      onRemove,
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()
  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  expect(onAfterRead).toHaveBeenCalledTimes(1)

  await wrapper.setProps({ disabled: true })
  expect(wrapper.html()).toMatchSnapshot()
  expect(wrapper.find('.mp-upload__action-input[disabled]').exists()).toBeTruthy()

  await wrapper.find('.mp-upload__file-close').trigger('click')
  expect(onRemove).toHaveBeenCalledTimes(0)

  wrapper.unmount()
  mockRestore()
})

test('upload length over maxFiles in multiple mode', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      maxFiles: 1,
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  const event = {
    target: {
      files: [new File([], 'cat.png'), new File([], 'dog.png')],
    },
  }

  await wrapper.vm.handleChange(event)
  expect(wrapper.vm.modelValue.length).toBe(1)

  wrapper.unmount()
  mockRestore()
})

test('upload hideList', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      showFileList: false,
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  const event = {
    target: {
      files: [new File([], 'cat.png'), new File([], 'dog.png')],
    },
  }

  await wrapper.vm.handleChange(event)
  expect(wrapper.vm.files.length).toBe(0)

  wrapper.unmount()
  mockRestore()
})

test('upload file utils', () => {
  const modelValue = [
    {
      uid: '1',
      name: 'loading',
      status: 'uploading',
    },
    {
      uid: '2',
      name: 'success',
      status: 'success',
    },
    {
      uid: '3',
      name: 'error',
      status: 'error',
    },
  ]

  const wrapper = mount(VarUpload, {
    props: {
      modelValue,
    },
  })

  expect(wrapper.vm.getLoading()).toStrictEqual([modelValue[0]])
  expect(wrapper.vm.getSuccess()).toStrictEqual([modelValue[1]])
  expect(wrapper.vm.getError()).toStrictEqual([modelValue[2]])
})

test('upload progress', () => {
  const modelValue = [
    {
      uid: '1',
      name: 'progress',
      status: 'uploading',
      percent: 40,
    },
  ]

  const wrapper = mount(VarUpload, {
    props: {
      modelValue,
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  wrapper.unmount()
})

test('upload resolve-type as default when file type is image', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      resolveType: 'object-url',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  await delay(100)
  expect(wrapper.vm.files[0].thumbnailUrl.startsWith('blob:')).toBe(true)
  expect(wrapper.vm.files[0].status).toBe('ready')
  expect(wrapper.vm.files[0].percent).toBe(0)

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload resolve-type as default when file type is not image', async () => {
  const { mockRestore } = mockFileReader('data:')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      resolveType: 'object-url',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('data.json', 'application/json'))
  await delay(100)
  expect(wrapper.vm.files[0].thumbnailUrl.includes('data:')).toBe(false)

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload resolve-type as file when file type is image', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      resolveType: 'file',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  await delay(100)
  expect(wrapper.vm.files[0].thumbnailUrl).toBe('')

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload resolve-type as data-url when file type is image', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      resolveType: 'data-url',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('cat.png', 'image/png'))
  await delay(100)
  expect(wrapper.vm.files[0].thumbnailUrl.includes('data:image/png;base64,')).toBe(true)

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload resolve-type as data-url when file type is not image', async () => {
  const { mockRestore } = mockFileReader('data:')
  const { mockRestore: mockRestoreStubs } = mockStubs()
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      resolveType: 'data-url',
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })

  await wrapper.vm.handleChange(createEvent('data.json', 'application/json'))
  await delay(100)
  expect(wrapper.vm.files[0].thumbnailUrl.includes('data:')).toBe(true)

  mockRestoreStubs()
  wrapper.unmount()
  mockRestore()
})

test('upload onClickAction', async () => {
  const onClickAction = vi.fn()

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      onClickAction,
    },
  })

  await wrapper.find('.mp-upload__action').trigger('click')
  expect(onClickAction).toBeCalledTimes(1)
  await wrapper.setProps({ disabled: true })
  await wrapper.find('.mp-upload__action').trigger('click')
  expect(onClickAction).toBeCalledTimes(1)
  wrapper.unmount()
})

test('upload showRemoveButton', async () => {
  const { mockRestore } = mockFileReader('data:image/png;base64,')
  const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
      'onUpdate:modelValue': onUpdateModelValue,
    },
  })
  const event = {
    target: {
      files: [new File([], 'cat.png'), new File([], 'dog.png')],
    },
  }

  await wrapper.vm.handleChange(event)
  expect(wrapper.find('.mp-upload__file-close').exists()).toBe(true)

  await wrapper.setProps({
    showRemoveButton: false,
  })
  expect(wrapper.find('.mp-upload__file-close').exists()).toBe(false)

  wrapper.unmount()
  mockRestore()
})

test('upload keyboard enter for chooseFile', async () => {
  const click = vi.fn()
  const origin = HTMLInputElement.prototype.click
  HTMLInputElement.prototype.click = click

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
    },
  })

  await wrapper.find('.mp-upload__action').trigger('focus')
  await triggerKeyboard(window, 'keydown', { key: 'Enter' })
  expect(click).toHaveBeenCalledTimes(1)

  HTMLInputElement.prototype.click = origin
  wrapper.unmount()
})

test('upload keyboard space for chooseFile', async () => {
  const click = vi.fn()
  const origin = HTMLInputElement.prototype.click
  HTMLInputElement.prototype.click = click

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [],
    },
  })

  await wrapper.find('.mp-upload__action').trigger('focus')
  await triggerKeyboard(window, 'keydown', { key: ' ' })
  await triggerKeyboard(window, 'keyup', { key: ' ' })
  expect(click).toHaveBeenCalledTimes(1)

  HTMLInputElement.prototype.click = origin
  wrapper.unmount()
})

test('upload remove button slot', () => {
  const { mockRestore: mockRestoreStubs } = mockStubs()

  const wrapper = mount(VarUpload, {
    props: {
      modelValue: [
        {
          url: 'https://maplejs.org/cat.jpg',
          thumbnailUrl: 'https://maplejs.org/cat.jpg',
        },
      ],
    },
    slots: {
      'remove-button': () => 'remove',
    },
  })

  expect(wrapper.html()).toMatchSnapshot()

  mockRestoreStubs()
  wrapper.unmount()
})
