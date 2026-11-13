import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'
import Button from '../../button'
import { RadioGroup } from '../../radio'
import Space from '../../space'
import EnglishDemo from '../example/regressions/en-US/prepare-request.vue'
import Demo from '../example/regressions/prepare-request.vue'

vi.mock('@maple-design/ui-vue', () => import('..'))

test.each([
  [Demo, '加入示例图片', '准备并提交', '取消准备', '完成准备', '重置队列', '待返回准备任务', '请求次数'],
  [
    EnglishDemo,
    'Add sample image',
    'Prepare and submit',
    'Cancel preparation',
    'Resolve preparation',
    'Reset queue',
    'Pending preparations',
    'Requests started',
  ],
])(
  'canceled replacement attempts do not reserve total capacity or start duplicate requests',
  async (Component, add, submit, cancel, finish, reset, pendingLabel, requestLabel) => {
    const wrapper = create(Component)
    await wrapper.findAll('input[type="radio"]')[3].setValue(true)
    await click(wrapper, add)
    await click(wrapper, add)
    await click(wrapper, submit)
    await click(wrapper, cancel)
    expect(wrapper.findAll('.mp-upload__item--canceled')).toHaveLength(2)
    await click(wrapper, submit)
    expect(wrapper.text()).toContain(`${pendingLabel}：4`)
    await click(wrapper, finish)
    expect(wrapper.text()).toContain(`${requestLabel}：1`)
    expect(wrapper.text()).toContain('max-total-size')
    expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(1)
    expect(wrapper.findAll('.mp-upload__item--canceled')).toHaveLength(1)
    expect(wrapper.text()).toContain('600, 62')
    await wrapper.find('.mp-upload__item--success button[aria-label]').trigger('click')
    await flushPromises()
    await click(wrapper, submit)
    await click(wrapper, finish)
    expect(wrapper.text()).toContain(`${requestLabel}：2`)
    expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(1)
    expect(wrapper.findAll('.mp-upload__item--canceled')).toHaveLength(0)
    expect(wrapper.text()).not.toContain('max-total-size')
    await click(wrapper, reset)
    expect(wrapper.findAll('.mp-upload__item')).toHaveLength(0)
    expect(wrapper.text()).toContain(`${pendingLabel}：0`)
    expect(wrapper.text()).toContain(`${requestLabel}：0`)
  },
)

test.each([
  [Demo, '加入示例图片', '准备并提交', '完成准备', '重置队列', '待返回准备任务', '请求次数'],
  [
    EnglishDemo,
    'Add sample image',
    'Prepare and submit',
    'Resolve preparation',
    'Reset queue',
    'Pending preparations',
    'Requests started',
  ],
])(
  'replacement total-size limit reserves capacity across pending preparations',
  async (Component, add, submit, finish, reset, pendingLabel, requestLabel) => {
    const wrapper = create(Component)
    await wrapper.findAll('input[type="radio"]')[3].setValue(true)
    await click(wrapper, add)
    await click(wrapper, add)
    expect(
      wrapper
        .findAll('button')
        .find((button) => button.text() === add)
        .attributes('disabled'),
    ).toBeDefined()
    await click(wrapper, submit)
    expect(wrapper.text()).toContain(`${pendingLabel}：2`)
    await click(wrapper, finish)
    expect(wrapper.text()).toContain(`${requestLabel}：1`)
    expect(wrapper.text()).toContain('max-total-size')
    expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(1)
    expect(wrapper.findAll('.mp-upload__item--ready')).toHaveLength(1)
    expect(wrapper.text()).toContain('600, 62')
    await wrapper.find('.mp-upload__item--success button[aria-label]').trigger('click')
    await flushPromises()
    await click(wrapper, submit)
    await click(wrapper, finish)
    expect(wrapper.text()).toContain(`${requestLabel}：2`)
    expect(wrapper.findAll('.mp-upload__item--success')).toHaveLength(1)
    expect(wrapper.findAll('.mp-upload__item--ready')).toHaveLength(0)
    expect(wrapper.text()).not.toContain('max-total-size')
    await click(wrapper, reset)
    expect(wrapper.findAll('.mp-upload__item')).toHaveLength(0)
    expect(wrapper.text()).toContain(`${pendingLabel}：0`)
    expect(wrapper.text()).toContain(`${requestLabel}：0`)
  },
)

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

function create(Component) {
  const wrapper = mount(Component, {
    props: { editMode: 'direct' },
    global: { components: { MpUpload: Upload, MpButton: Button, MpRadioGroup: RadioGroup, MpSpace: Space } },
  })
  wrappers.push(wrapper)
  return wrapper
}
async function click(wrapper, label) {
  const button = wrapper.findAll('button').find((item) => item.text() === label)
  expect(button).toBeTruthy()
  await button.trigger('click')
  await flushPromises()
}

test.each([
  [Demo, '加入示例图片', '准备并提交', '取消准备', '完成准备', '重置队列', '待返回准备任务', '请求次数'],
  [
    EnglishDemo,
    'Add sample image',
    'Prepare and submit',
    'Cancel preparation',
    'Resolve preparation',
    'Reset queue',
    'Pending preparations',
    'Requests started',
  ],
])(
  'preparation demo ignores obsolete results and revalidates replacements',
  async (Component, add, submit, cancel, finish, reset, pendingLabel, requestLabel) => {
    const wrapper = create(Component)
    await click(wrapper, add)
    await click(wrapper, submit)
    await click(wrapper, submit)
    expect(wrapper.text()).toContain(`${pendingLabel}：1`)
    await click(wrapper, cancel)
    expect(wrapper.find('.mp-upload__item--canceled').exists()).toBe(true)
    await click(wrapper, submit)
    expect(wrapper.text()).toContain(`${pendingLabel}：2`)
    await click(wrapper, finish)
    expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
    expect(wrapper.text()).toContain(`${requestLabel}：1`)
    await click(wrapper, reset)

    await wrapper.findAll('input[type="radio"]')[1].setValue(true)
    await click(wrapper, add)
    await click(wrapper, submit)
    await click(wrapper, finish)
    expect(wrapper.find('.mp-upload__item--ready').exists()).toBe(true)
    expect(wrapper.findAll('p').at(-1).text()).toContain('accept')
    expect(wrapper.text()).toContain(`${requestLabel}：0`)
    await wrapper.findAll('input[type="radio"]')[2].setValue(true)
    await click(wrapper, submit)
    await click(wrapper, finish)
    expect(wrapper.findAll('p').at(-1).text()).toContain('max-file-size')
    expect(wrapper.text()).toContain(`${requestLabel}：0`)
    await wrapper.findAll('input[type="radio"]')[0].setValue(true)
    await click(wrapper, submit)
    await click(wrapper, finish)
    expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
    expect(wrapper.text()).toContain(`${requestLabel}：1`)
    await click(wrapper, reset)
    expect(wrapper.findAll('.mp-upload__item')).toHaveLength(0)
  },
)

test('deactivating preparation releases the wait and permits a fresh attempt', async () => {
  const enabled = ref(true)
  const Host = {
    setup: () => () => h(KeepAlive, null, { default: () => (enabled.value ? h(Demo, { editMode: 'direct' }) : null) }),
  }
  const wrapper = create(Host)
  await click(wrapper, '加入示例图片')
  await click(wrapper, '准备并提交')
  enabled.value = false
  await flushPromises()
  enabled.value = true
  await flushPromises()
  expect(wrapper.text()).toContain('待返回准备任务：0')
  expect(wrapper.text()).toContain('请求次数：0')
  expect(wrapper.find('.mp-upload__item--canceled').exists()).toBe(true)
  await click(wrapper, '准备并提交')
  await click(wrapper, '完成准备')
  expect(wrapper.find('.mp-upload__item--success').exists()).toBe(true)
  expect(wrapper.text()).toContain('请求次数：1')
})
