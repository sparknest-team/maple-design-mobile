import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import TimeRangePicker from '../TimeRangePicker.vue'

for (const presentation of ['picker', 'clock']) {
  it(`${presentation} exposes native side controls without committing drafts`, async () => {
    const wrapper = mount(TimeRangePicker, {
      props: {
        modelValue: ['10:30:00', '11:00:00'],
        format: 'HH:mm:ss',
        presentation,
      },
    })
    const buttons = wrapper.findAll('button.mp-time-range-picker__value')
    expect(buttons).toHaveLength(2)
    expect(buttons.map((button) => button.attributes('type'))).toEqual(['button', 'button'])
    await buttons[1].trigger('click')
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['false', 'true'])
    await buttons[0].trigger('click')
    expect(buttons.map((button) => button.attributes('aria-pressed'))).toEqual(['true', 'false'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
}
