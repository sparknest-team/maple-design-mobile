import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Button from '../../button'
import DemoEn from '../example/demos/en-US/next-day.vue'
import DemoZh from '../example/demos/next-day.vue'
import TimeRange from '../index'

// Demos are language-fixed: the English copy lives under example/demos/en-US,
// so the reset control label is asserted per language instead of switching Locale.
it.each([
  ['zh-CN', DemoZh, '重置'],
  ['en-US', DemoEn, 'Reset'],
])(
  'overnight demo (%s) preserves endpoint order and exposes clear/reset model state',
  async (_language, Demo, resetLabel) => {
    const wrapper = mount(Demo, { global: { components: { MpTimeRange: TimeRange, MpButton: Button } } })
    const field = wrapper.getComponent(TimeRange)
    expect(field.props()).toMatchObject({
      modelValue: ['22:00', '06:00'],
      showNextDay: true,
      inputEditable: true,
      format: 'HH:mm',
    })
    field.vm.$emit('update:modelValue', undefined)
    await nextTick()
    expect(wrapper.get('output').text()).toBe('undefined')
    const reset = wrapper.findAllComponents(Button).find((button) => button.text() === resetLabel)
    expect(reset).toBeTruthy()
    await reset.trigger('click')
    expect(field.props('modelValue')).toEqual(['22:00', '06:00'])
    expect(wrapper.get('output').text()).toBe('["22:00","06:00"]')
    wrapper.unmount()
  },
)
