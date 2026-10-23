import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Time from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Space from '../../space'
import Demo from '../example/demos/step.vue'
import { isTimeAllowed } from '../time-rules'

useDemoControls()

test('five-hour Demo preserves the model when display and step rules change', async () => {
  const wrapper = mount(Demo, { global: { components: { MpTime: Time, MpSpace: Space } } })
  try {
    await wrapper.findAll('input[type=checkbox]')[0].setValue(true)
    const time = wrapper.findComponent(Time)
    expect(time.props('use12Hours')).toBe(true)
    expect(time.props('step')).toEqual({ hour: 5, minute: 15, second: 10 })
    expect(time.props('modelValue')).toBe('09:30:00')
    time.vm.$emit('update:modelValue', '15:30:00')
    await flushPromises()
    expect(time.props('modelValue')).toBe('15:30:00')
    await wrapper.findAll('input[type=checkbox]')[0].setValue(false)
    expect(time.props('use12Hours')).toBe(false)
    expect(time.props('step').hour).toBe(1)
    expect(time.props('modelValue')).toBe('15:30:00')
  } finally {
    wrapper.unmount()
  }
})

test('non-dividing hour steps remain anchored to midnight rather than restarting at noon', () => {
  const rules = { useSeconds: true, step: { hour: 5, minute: 15, second: 10 } }
  for (const hour of [0, 5, 10, 15, 20]) {
    expect(isTimeAllowed(String(hour).padStart(2, '0') + ':30:00', rules)).toBe(true)
  }
  for (const hour of [12, 17, 22]) {
    expect(isTimeAllowed(String(hour).padStart(2, '0') + ':30:00', rules)).toBe(false)
  }
})

test('disabled-hour callback and controlled rejection compose without rewriting the model', async () => {
  const wrapper = mount(Demo, { global: { components: { MpTime: Time, MpSpace: Space } } })
  try {
    await wrapper.findAll('input[type=checkbox]')[0].setValue(true)
    await wrapper.findAll('input[type=checkbox]')[2].setValue(true)
    await wrapper.findAll('input[type=checkbox]')[3].setValue(false)
    const time = wrapper.findComponent(Time)
    const rules = { useSeconds: true, step: time.props('step'), disabledHours: time.props('disabledHours') }
    expect(isTimeAllowed('15:30:00', rules)).toBe(false)
    expect(isTimeAllowed('20:30:00', rules)).toBe(true)
    time.vm.$emit('update:modelValue', '20:30:00')
    await flushPromises()
    expect(time.props('modelValue')).toBe('09:30:00')
    expect(wrapper.get('[role=status]').text()).toContain('1')
    await wrapper.findAll('input[type=checkbox]')[3].setValue(true)
    time.vm.$emit('update:modelValue', '20:30:00')
    await flushPromises()
    expect(time.props('modelValue')).toBe('20:30:00')
    expect(wrapper.get('[role=status]').text()).toContain('2')
  } finally {
    wrapper.unmount()
  }
})
