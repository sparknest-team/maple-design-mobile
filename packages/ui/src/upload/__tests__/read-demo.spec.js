import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Space from '../../space'
import EnglishDemo from '../example/demos/en-US/replacement-validation.vue'
import Demo from '../example/demos/replacement-validation.vue'

useDemoControls()

vi.mock('@maple-design/ui-vue', () => import('..'))

test.each([
  [Demo, '加入小图片', '返回最早缩略图', '拒绝最早缩略图', '重置队列'],
  [EnglishDemo, 'Add small image', 'Resolve oldest thumbnail', 'Reject oldest thumbnail', 'Reset queue'],
])(
  'reset starts a fresh thumbnail transaction before the stale promise settles',
  async (Component, add, resolve, reject, reset) => {
    const wrapper = mount(Component, {
      props: { editMode: 'direct' },
      global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } },
    })
    const click = async (name) => {
      await wrapper
        .findAll('button')
        .find((button) => button.text() === name)
        .trigger('click')
      await flushPromises()
    }
    try {
      await wrapper.findAll('input[type=checkbox]')[2].setValue(true)
      await click(add)
      expect(wrapper.get('.thumbnail-pending').text()).toContain('1')
      await click(reset)
      await click(add)
      expect(wrapper.get('.thumbnail-pending').text()).toBe('Pending thumbnails: 2')
      await click(resolve)
      expect(wrapper.findAll('.mp-upload__item')).toHaveLength(0)
      expect(wrapper.get('.thumbnail-pending').text()).toBe('Pending thumbnails: 1')
      await click(resolve)
      expect(wrapper.findAll('.mp-upload__item')).toHaveLength(1)
      expect(wrapper.text()).toContain('sample-2.svg')
      expect(wrapper.text()).not.toContain('sample-1.svg')
      await click(add)
      await click(reject)
      expect(wrapper.text()).toContain('read-error')
      expect(wrapper.findAll('.mp-upload__item')).toHaveLength(1)
      await click(add)
      await click(resolve)
      expect(wrapper.findAll('.mp-upload__item')).toHaveLength(2)
      await click(reset)
      expect(wrapper.findAll('img')).toHaveLength(0)
      await click(add)
      expect(wrapper.get('.thumbnail-pending').text()).toBe('Pending thumbnails: 1')
      await click(reset)
      await click(add)
      expect(wrapper.get('.thumbnail-pending').text()).toBe('Pending thumbnails: 2')
      await click(resolve === 'Resolve oldest thumbnail' ? 'Resolve newest thumbnail' : '返回最新缩略图')
      expect(wrapper.get('.thumbnail-pending').text()).toBe('Pending thumbnails: 1')
      expect(wrapper.text()).toContain('sample-6.svg')
      await click(reject)
      expect(wrapper.get('.thumbnail-pending').text()).toBe('Pending thumbnails: 0')
      expect(wrapper.text()).not.toContain('read-error')
      expect(wrapper.text()).not.toContain('sample-5.svg')
      expect(wrapper.text()).toContain('sample-6.svg')
      await click(add)
    } finally {
      wrapper.unmount()
      await flushPromises()
    }
  },
)

test.each([
  [Demo, '加入小图片', '替换为文本', '重置队列'],
  [EnglishDemo, 'Add small image', 'Replace with text', 'Reset queue'],
])('object-url Demo releases owned URLs on delete, reset and unmount', async (Component, add, reject, reset) => {
  const createDescriptor = Object.getOwnPropertyDescriptor(URL, 'createObjectURL')
  const revokeDescriptor = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL')
  let serial = 0
  const create = vi.fn(() => 'blob:demo-' + ++serial)
  const revoke = vi.fn()
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: create })
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revoke })
  const wrapper = mount(Component, {
    props: { editMode: 'direct' },
    global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } },
  })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  try {
    await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
    await click(add)
    await click(add)
    expect(create).toHaveBeenCalledTimes(2)
    expect(wrapper.get('output').text()).toBe('Blob URLs: 2')
    expect(wrapper.findAll('img').map((img) => img.attributes('src'))).toEqual(['blob:demo-1', 'blob:demo-2'])
    await click(reject)
    expect(create).toHaveBeenCalledTimes(2)
    expect(wrapper.text()).toContain('accept')
    await wrapper.findAll('.mp-upload__item')[0].get('button[aria-label]').trigger('click')
    await flushPromises()
    expect(revoke).toHaveBeenCalledTimes(1)
    expect(revoke).toHaveBeenCalledWith('blob:demo-1')
    expect(wrapper.get('output').text()).toBe('Blob URLs: 1')
    await click(reset)
    expect(revoke).toHaveBeenCalledTimes(2)
    expect(revoke).toHaveBeenCalledWith('blob:demo-2')
    expect(wrapper.findAll('img')).toHaveLength(0)
    await click(add)
    expect(create).toHaveBeenCalledTimes(3)
    wrapper.unmount()
    expect(revoke).toHaveBeenCalledTimes(3)
    expect(revoke).toHaveBeenCalledWith('blob:demo-3')
  } finally {
    if (wrapper.exists()) {
      wrapper.unmount()
    }
    if (createDescriptor) {
      Object.defineProperty(URL, 'createObjectURL', createDescriptor)
    } else {
      delete URL.createObjectURL
    }
    if (revokeDescriptor) {
      Object.defineProperty(URL, 'revokeObjectURL', revokeDescriptor)
    } else {
      delete URL.revokeObjectURL
    }
  }
})

test.each([
  [Demo, '加入小图片', '替换为文本', '重置队列'],
  [EnglishDemo, 'Add small image', 'Replace with text', 'Reset queue'],
])('data-url demo reads accepted replacements and clears previews on reset', async (Component, add, reject, reset) => {
  const NativeReader = globalThis.FileReader
  const reads = []
  globalThis.FileReader = class {
    readAsDataURL(file) {
      reads.push(file)
      this.result = 'data:image/svg+xml;base64,PHN2Zy8+'
      Promise.resolve().then(() => this.onload?.())
    }
  }
  const wrapper = mount(Component, {
    props: { editMode: 'direct' },
    global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } },
  })
  const click = async (name) => {
    await wrapper
      .findAll('button')
      .find((button) => button.text() === name)
      .trigger('click')
    await flushPromises()
  }
  try {
    await wrapper.get('input[type=checkbox]').setValue(true)
    await click(add)
    await click(add)
    expect(reads).toHaveLength(2)
    expect(reads.every((file) => file.type === 'image/svg+xml' && file.size === 114)).toBe(true)
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 2 · Decoded images: 0')
    expect(wrapper.findAll('img')).toHaveLength(2)
    await wrapper.findAll('img')[0].trigger('load')
    await wrapper.findAll('img')[1].trigger('load')
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 2 · Decoded images: 2')
    await click(reject)
    expect(reads).toHaveLength(2)
    expect(wrapper.text()).toContain('accept')
    await wrapper.get('.mp-upload__item button[aria-label]').trigger('click')
    await flushPromises()
    expect(wrapper.findAll('img')).toHaveLength(1)
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 1 · Decoded images: 2')
    await click(reset)
    expect(wrapper.findAll('img')).toHaveLength(0)
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 0 · Decoded images: 0')
    await wrapper.get('input[type=checkbox]').setValue(false)
    await click(add)
    await wrapper.get('input[type=checkbox]').setValue(true)
    await click(add)
    await wrapper.get('img').trigger('load')
    await wrapper.get('input[type=checkbox]').setValue(false)
    await click(add)
    expect(reads).toHaveLength(3)
    expect(wrapper.findAll('.mp-upload__item')).toHaveLength(3)
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 1 · Decoded images: 1')
    await wrapper.get('input[type=checkbox]').setValue(true)
    await click(add)
    expect(reads).toHaveLength(3)
    expect(wrapper.text()).toContain('max-files')
    await wrapper.findAll('.mp-upload__item')[1].get('button[aria-label]').trigger('click')
    await flushPromises()
    expect(wrapper.findAll('img')).toHaveLength(0)
    await click(add)
    expect(reads).toHaveLength(4)
    await wrapper.get('img').trigger('load')
    expect(wrapper.findAll('.mp-upload__item')).toHaveLength(3)
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 1 · Decoded images: 2')
    await click(reset)
    expect(wrapper.get('[role=status]').text()).toBe('Data URLs: 0 · Decoded images: 0')
  } finally {
    wrapper.unmount()
    globalThis.FileReader = NativeReader
  }
})
