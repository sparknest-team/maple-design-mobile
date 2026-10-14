import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRangePicker from '../DateRangePicker.vue'

it('exposes wheel endpoints as native buttons without submitting values', async () => {
  const wrapper = mount(DateRangePicker, {
    props: {
      modelValue: ['2026-09-10', '2026-09-18'],
      presentation: 'picker',
    },
  })
  const buttons = wrapper.findAll('button.mp-date-range-picker__value')
  expect(buttons).toHaveLength(2)
  expect(buttons.map((button) => button.attributes('type'))).toEqual(['button', 'button'])
  await buttons[1].trigger('click')
  expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['false', 'true'])
  await buttons[0].trigger('click')
  expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['true', 'false'])
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  wrapper.unmount()
})

for (const presentation of ['calendarPicker', 'calendarClock']) {
  it(`${presentation} exposes date and time view controls without submitting`, async () => {
    const wrapper = mount(DateRangePicker, {
      props: {
        modelValue: ['2026-09-10 09:00:00', '2026-09-18 18:00:00'],
        showTime: true,
        presentation,
      },
    })
    const date = wrapper.get('button.mp-date-range-picker__values')
    const times = wrapper.findAll('button.mp-date-range-picker__view-tab')
    expect(times).toHaveLength(2)
    await times[1].trigger('click')
    expect(times[1].attributes('aria-pressed')).toBe('true')
    expect(date.attributes('aria-pressed')).toBe('false')
    await date.trigger('click')
    expect(date.attributes('aria-pressed')).toBe('true')
    expect(times[1].attributes('aria-pressed')).toBe('false')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
}
