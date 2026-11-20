import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Button from '../../button'
import Divider from '../../divider'
import Radio, { RadioGroup } from '../../radio'
import Space from '../../space'
import Checkbox, { CheckboxGroup } from '../index'

const demos = import.meta.glob([
  '../example/demos/**/group-declaration-comparison.vue',
  '../../radio/example/demos/**/group-declaration-comparison.vue',
])

for (const kind of ['checkbox', 'radio']) {
  it.each([
    ['zh-CN', '吃饭'],
    ['en-US', 'Eat'],
  ])(`${kind} %s example preserves numeric option values`, async (language, label) => {
    const base = kind === 'checkbox' ? '../example' : '../../radio/example'
    const directory = language === 'en-US' ? 'en-US/' : ''
    const Demo = (await demos[`${base}/demos/${directory}group-declaration-comparison.vue`]()).default
    const wrapper = mount(Demo, {
      global: {
        components: {
          MpButton: Button,
          MpDivider: Divider,
          MpSpace: Space,
          MpCheckbox: Checkbox,
          MpCheckboxGroup: CheckboxGroup,
          MpRadio: Radio,
          MpRadioGroup: RadioGroup,
        },
      },
    })
    const panel = wrapper.get(`[data-comparison-scene="${kind}-group-options"]`)
    const group = wrapper
      .findAllComponents(kind === 'checkbox' ? CheckboxGroup : RadioGroup)
      .find((group) => panel.element.contains(group.element))
    expect(panel.text()).toContain(label)
    const input = panel.find('input')
    input.element.checked = true
    await input.trigger('change')
    await flushPromises()
    expect(group.props('modelValue')).toEqual(kind === 'checkbox' ? [0] : 0)
    expect(panel.find('input').element.checked).toBe(true)
    expect(group.props('modelValue')).toEqual(kind === 'checkbox' ? [0] : 0)
    if (kind === 'checkbox') {
      const basic = wrapper.get('[data-comparison-scene="checkbox-group"]')
      const basicGroup = basic.getComponent(CheckboxGroup)
      const buttons = basic.findAll('button')
      await buttons[0].trigger('click')
      await flushPromises()
      expect(basicGroup.props('modelValue')).toEqual([0, 1])
      await buttons[1].trigger('click')
      await flushPromises()
      expect(basicGroup.props('modelValue')).toEqual([])
    }
    wrapper.unmount()
  })
}
