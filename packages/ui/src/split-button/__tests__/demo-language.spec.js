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
import Appearance from '../example/demos/appearance-lab.vue'
import AppearanceEn from '../example/demos/en-US/appearance-lab.vue'
import MobileDemo from '../example/index.vue'

useDemoControls()

beforeEach(() => {
  Locale.add('en-US', Locale.enUS)
  Locale.use('zh-CN')
})
afterEach(() => Locale.use('zh-CN'))

const { info } = vi.hoisted(() => ({ info: vi.fn() }))
vi.mock('@maple-design/ui-vue', async () => ({ Locale: (await import('../../locale')).default, Message: { info } }))

vi.mock('@maple-design/cli-vue/client', () => ({
  AppType: { template: '<div><slot /></div>' },
  onThemeChange: () => {},
}))

const components = Object.fromEntries(
  [SplitButton, Button, Space, MenuOption, Radio, RadioGroup].map((component) => [component.name, component]),
)
const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  info.mockClear()
})

function mountMobileDemo() {
  const wrapper = mount(MobileDemo, {
    global: { components, stubs: { MIconMenuDown: true, MpSelect: true } },
  })
  wrappers.push(wrapper)
  return wrapper
}

test.each(['basic-usage', 'controlled', 'async-action', 'popup', 'disabled', 'custom-icon', 'variants'])(
  'actual demo labels follow the site language without an uninitialized local locale: %s',
  async (demo) => {
    const wrapper = mountMobileDemo()
    const section = () => wrapper.get(`[data-demo="${demo}"]`)
    const menu = () => wrapper.findAllComponents(SplitButton).find((item) => section().element.contains(item.element))
    expect(menu()?.vm.$slots.content).toBeTruthy()
    const labels = () =>
      menu()
        .vm.$slots.content()
        .filter((node) => node.props?.label)
        .map((node) => node.props.label)
    expect(labels()).toEqual(['保存草稿', '保存并发布', '暂无权限'])
    Locale.use('en-US')
    await nextTick()
    expect(labels()).toEqual(['Save draft', 'Save and publish', 'Unavailable'])
    expect(section().get('button').text()).not.toBe('')
  },
)

test('primary action uses the current translated message', async () => {
  const wrapper = mountMobileDemo()
  const button = () => wrapper.get('[data-demo="basic-usage"]').get('button')
  await button().trigger('click')
  expect(info).toHaveBeenLastCalledWith('发布成功')
  Locale.use('en-US')
  await nextTick()
  await button().trigger('click')
  expect(info).toHaveBeenLastCalledWith('Published')
})

const appearanceCases = [
  ['zh-CN', Appearance, '对比配置', ['保存草稿', '保存并发布', '暂无权限']],
  ['en-US', AppearanceEn, 'Compare configuration', ['Save draft', 'Save and publish', 'Unavailable']],
]

test.each(appearanceCases)(
  'appearance comparison (%s) keeps every size localized after the sizes demo was consolidated',
  async (_language, demo, compareLabel, expectedLabels) => {
    const wrapper = mount(demo, {
      global: { components, stubs: { MIconMenuDown: true, MpSelect: true } },
    })
    wrappers.push(wrapper)
    wrapper
      .findAllComponents(RadioGroup)
      .find((group) => group.attributes('aria-label') === compareLabel)
      .vm.$emit('update:modelValue', 'size')
    await nextTick()
    const menus = wrapper.findAllComponents(SplitButton)
    expect(menus.map((menu) => menu.props('size'))).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    for (const menu of menus) {
      expect(
        menu.vm.$slots
          .content()
          .filter((node) => node.props?.label)
          .map((node) => node.props.label),
      ).toEqual(expectedLabels)
    }
  },
)
