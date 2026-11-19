import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import SplitButton from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Button from '../../button'
import Locale from '../../locale'
import { MenuOption } from '../../menu'
import Radio, { RadioGroup } from '../../radio'
import Space from '../../space'
import AsyncAction from '../example/async-action.vue'
import Basic from '../example/basic.vue'
import Controlled from '../example/controlled.vue'
import CustomIcon from '../example/custom-icon.vue'
import Appearance from '../example/demos/appearance-lab.vue'
import Disabled from '../example/disabled.vue'
import Popup from '../example/popup.vue'
import Variants from '../example/variants.vue'

useDemoControls()

beforeEach(() => {
  Locale.add('en-US', Locale.enUS)
  Locale.use('zh-CN')
})
afterEach(() => Locale.use('zh-CN'))

const { info } = vi.hoisted(() => ({ info: vi.fn() }))
vi.mock('@maple-design/ui-vue', async () => ({ Locale: (await import('../../locale')).default, Message: { info } }))

const components = Object.fromEntries(
  [SplitButton, Button, Space, MenuOption, Radio, RadioGroup].map((component) => [component.name, component]),
)
const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  info.mockClear()
})

test.each([Basic, Controlled, AsyncAction, Popup, Disabled, CustomIcon, Variants, Appearance])(
  'actual demo labels follow the site language without an uninitialized local locale: %s',
  async (demo) => {
    const wrapper = mount(demo, {
      global: { components, stubs: { MIconMenuDown: true, MpSelect: true } },
    })
    wrappers.push(wrapper)
    const menu = wrapper.findComponent(SplitButton)
    expect(menu.vm.$slots.content).toBeTruthy()
    // Rendered slot VNodes exist even before teleport content is opened.
    const labels = () =>
      menu.vm.$slots
        .content()
        .filter((node) => node.props?.label)
        .map((node) => node.props.label)
    expect(labels()).toEqual(['保存草稿', '保存并发布', '暂无权限'])
    Locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual(['Save draft', 'Save and publish', 'Unavailable'])
    expect(wrapper.find('button').text()).not.toBe('')
  },
)

test('primary action uses the current translated message', async () => {
  const wrapper = mount(Basic, { global: { components } })
  wrappers.push(wrapper)
  await wrapper.find('button').trigger('click')
  expect(info).toHaveBeenLastCalledWith('发布成功')
  Locale.use('en-US')
  await nextTick()
  await wrapper.find('button').trigger('click')
  expect(info).toHaveBeenLastCalledWith('Published')
})

test('appearance comparison keeps every size localized after the sizes demo was consolidated', async () => {
  const wrapper = mount(Appearance, {
    global: { components, stubs: { MIconMenuDown: true, MpSelect: true } },
  })
  wrappers.push(wrapper)
  wrapper
    .findAllComponents(RadioGroup)
    .find((group) => group.attributes('aria-label') === 'Compare configuration')
    .vm.$emit('update:modelValue', 'size')
  await nextTick()
  const menus = wrapper.findAllComponents(SplitButton)
  expect(menus.map((menu) => menu.props('size'))).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
  Locale.use('en-US')
  await nextTick()
  for (const menu of menus) {
    expect(
      menu.vm.$slots
        .content()
        .filter((node) => node.props?.label)
        .map((node) => node.props.label),
    ).toEqual(['Save draft', 'Save and publish', 'Unavailable'])
  }
})
