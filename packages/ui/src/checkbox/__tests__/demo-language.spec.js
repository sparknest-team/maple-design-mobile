import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, it } from 'vitest'
import Button from '../../button'
import Divider from '../../divider'
import Locale from '../../locale'
import Radio, { RadioGroup } from '../../radio'
import Space from '../../space'
import Checkbox, { CheckboxGroup } from '../index'

beforeEach(() => {
  Locale.add('en-US', Locale.enUS)
  Locale.use('en-US')
})
afterEach(() => Locale.use('zh-CN'))

for (const kind of ['checkbox', 'radio']) {
  it(`${kind} demo translates labels without changing selected numeric identity`, async () => {
    const Demo =
      kind === 'checkbox'
        ? (await import('../example/demos/group-declaration-comparison.vue')).default
        : (await import('../../radio/example/demos/group-declaration-comparison.vue')).default
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
    expect(panel.text()).toContain('Eat')
    const input = panel.find('input')
    input.element.checked = true
    await input.trigger('change')
    await flushPromises()
    expect(group.props('modelValue')).toEqual(kind === 'checkbox' ? [0] : 0)
    Locale.use('zh-CN')
    await nextTick()
    expect(panel.text()).toContain('吃饭')
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
