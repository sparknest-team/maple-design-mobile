import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Space from '../../space'
import EnglishDemo from '../example/demos/en-US/replacement-validation.vue'
import Demo from '../example/demos/replacement-validation.vue'

useDemoControls()

vi.mock('@maple-design/ui', () => import('..'))

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

async function click(wrapper, label) {
  const button = wrapper.findAll('button').find((item) => item.text() === label)
  expect(button).toBeTruthy()
  await button.trigger('click')
  await flushPromises()
}

test.each([
  [Demo, '加入小图片', '替换为文本', '替换为超大图片', '加入 768 KiB 图片', '重置队列'],
  [
    EnglishDemo,
    'Add small image',
    'Replace with text',
    'Replace with oversized image',
    'Add 768 KiB image',
    'Reset queue',
  ],
])(
  'validation demo checks replacements, total size and released slots',
  async (Component, small, type, size, total, reset) => {
    const wrapper = mount(Component, {
      global: { components: { MpUpload: Upload, MpButton: Button, MpSpace: Space } },
    })
    wrappers.push(wrapper)
    const items = () => wrapper.findAll('.mp-upload__item')
    const rejected = () => wrapper.findAll('p').at(-1).text()

    await click(wrapper, small)
    expect(items()).toHaveLength(1)
    await click(wrapper, type)
    expect(items()).toHaveLength(1)
    expect(rejected()).toContain('accept')
    await click(wrapper, size)
    expect(items()).toHaveLength(1)
    expect(rejected()).toContain('max-file-size')

    await click(wrapper, reset)
    await click(wrapper, total)
    await click(wrapper, total)
    await click(wrapper, total)
    expect(items()).toHaveLength(2)
    expect(rejected()).toContain('max-total-size')

    await click(wrapper, reset)
    for (let count = 0; count < 4; count++) {
      await click(wrapper, small)
    }
    expect(items()).toHaveLength(3)
    expect(rejected()).toContain('max-files')
    await wrapper.find('.mp-upload__item button').trigger('click')
    await flushPromises()
    await click(wrapper, small)
    expect(items()).toHaveLength(3)
    expect(rejected()).not.toContain('max-files')
    await click(wrapper, reset)
    expect(items()).toHaveLength(0)
  },
)
