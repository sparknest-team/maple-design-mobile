import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Button from '../../button'
import Demo from '../example/demos/next-day.vue'
import TimeRange from '../index'

vi.mock('@maple-design/cli-vue/client', () => ({ watchLang: (callback) => callback('en-US') }))

it('overnight demo preserves endpoint order and exposes clear/reset model state', async () => {
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
  const reset = wrapper.findAllComponents(Button).find((button) => button.text() === 'Reset')
  expect(reset).toBeTruthy()
  await reset.trigger('click')
  expect(field.props('modelValue')).toEqual(['22:00', '06:00'])
  expect(wrapper.get('output').text()).toBe('["22:00","06:00"]')
  wrapper.unmount()
})
