import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import DatePicker from '../DatePicker.vue'

for (const presentation of ['calendarPicker', 'picker']) {
  it(`switches ${presentation} views without committing and preserves the other datetime part`, async () => {
    const wrapper = mount(DatePicker, {
      props: { presentation, showTime: true, useSeconds: false, modelValue: '2026-10-20 09:30' },
    })
    try {
      const button = wrapper.get('.mp-date-picker__view-toggle')
      expect(button.attributes('aria-pressed')).toBe('false')
      await button.trigger('click')
      expect(button.attributes('aria-pressed')).toBe('true')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      const picker = wrapper.getComponent(Picker)
      expect(picker.props('columns')).toHaveLength(2)
      picker.vm.$emit('change', ['10', '45'])
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toBe('2026-10-20 10:45')
      await wrapper.setProps({ modelValue: '2026-10-20 10:45' })
      await button.trigger('click')
      if (presentation === 'picker') {
        wrapper.getComponent(Picker).vm.$emit('change', ['2026', '10', '21'])
      } else {
        await wrapper
          .get('.mp-day-picker__body')
          .findAll('button')
          .find((button) => button.text() === '21')
          .trigger('click')
      }
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toBe('2026-10-21 10:45')
    } finally {
      wrapper.unmount()
    }
  })

  it(`keeps ${presentation} endpoint selection while switching views`, async () => {
    const wrapper = mount(DateRangePicker, {
      props: { presentation, showTime: true, useSeconds: false, modelValue: ['2026-10-20 09:30', '2026-10-25 18:00'] },
    })
    try {
      await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
      await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
      expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(2)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.getComponent(Picker).vm.$emit('change', ['19', '45'])
      await wrapper.vm.$nextTick()
      await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
      if (presentation === 'picker') {
        wrapper.get('.mp-date-range-picker__date-main').getComponent(Picker).vm.$emit('change', ['2026', '10', '26'])
      } else {
        await wrapper
          .get('.mp-day-picker__body')
          .findAll('button')
          .find((button) => button.text() === '26')
          .trigger('click')
      }
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-10-20 09:30', '2026-10-26 19:45'])
    } finally {
      wrapper.unmount()
    }
  })
}

it('preserves a pending first date while switching views and choosing the second date', async () => {
  const wrapper = mount(DateRangePicker, {
    props: { showTime: true, useSeconds: false, modelValue: ['2026-10-20 09:30', '2026-10-25 18:00'] },
  })
  try {
    const chooseDay = (day) =>
      wrapper
        .get('.mp-day-picker__body')
        .findAll('button')
        .find((button) => button.text() === day)
        .trigger('click')
    await chooseDay('21')
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    await chooseDay('24')
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-10-21 09:30', '2026-10-24 18:00'])
  } finally {
    wrapper.unmount()
  }
})
