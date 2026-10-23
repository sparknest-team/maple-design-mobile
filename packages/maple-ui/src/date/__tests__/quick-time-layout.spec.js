import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import DatePicker from '../DatePicker.vue'

for (const presentation of ['calendar', 'calendarPicker', 'picker']) {
  for (const useSeconds of [false, true]) {
    it(`single ${presentation} uses quick time and a footer toggle (seconds=${useSeconds})`, async () => {
      const initial = `2026-10-20 09:45${useSeconds ? ':17' : ''}`
      const wrapper = mount(DatePicker, { props: { presentation, modelValue: initial, showTime: true, useSeconds } })
      try {
        const quick = wrapper.get('.mp-date-picker__quick-time').getComponent(Picker)
        expect(quick.props('columns')[0]).toHaveLength(48)
        expect(wrapper.get('.mp-date-picker__current-time-value').text()).toBe(initial.split(' ')[1])
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        quick.vm.$emit('change', ['10:30'])
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted('update:modelValue').at(-1)[0]).toBe(`2026-10-20 10:30${useSeconds ? ':00' : ''}`)
        await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
        expect(wrapper.find('.mp-date-picker__quick-time').exists()).toBe(false)
        const detail = wrapper.getComponent(Picker)
        expect(detail.props('columns')).toHaveLength(useSeconds ? 3 : 2)
        detail.vm.$emit('change', useSeconds ? ['11', '15', '12'] : ['11', '15'])
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted('update:modelValue').at(-1)[0]).toBe(`2026-10-20 11:15${useSeconds ? ':12' : ''}`)
        await wrapper.get('.mp-date-picker__view-toggle').trigger('click')
        expect(wrapper.get('.mp-date-picker__view-toggle').attributes('aria-label')).toBe('选择时间')
        expect(wrapper.find('.mp-date-picker__quick-time').exists()).toBe(true)
      } finally {
        wrapper.unmount()
      }
    })
  }
}
it('quick time respects boundaries and readonly without rounding off-grid values', async () => {
  const wrapper = mount(DatePicker, {
    props: {
      modelValue: '2026-10-20 09:45:17',
      showTime: true,
      min: '2026-10-20 09:30:00',
      max: '2026-10-20 10:30:00',
    },
  })
  try {
    const quick = () => wrapper.get('.mp-date-picker__quick-time').getComponent(Picker)
    expect(
      quick()
        .props('columns')[0]
        .map((option) => option.value),
    ).toEqual(['09:30', '10:00', '10:30'])
    quick().vm.$emit('change', ['11:00'])
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ readonly: true })
    expect(quick().props('disabled')).toBe(true)
    quick().vm.$emit('change', ['10:00'])
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
for (const showTime of [false, true]) {
  it(`range calendar selects just the active endpoint (time=${showTime})`, async () => {
    const suffix = showTime ? ' 09:30:00' : ''
    const wrapper = mount(DateRangePicker, {
      props: { showTime, modelValue: [`2026-10-20${suffix}`, `2026-10-25${suffix}`] },
    })
    const selected = () => wrapper.findAll('.mp-day-picker__button.mp-button--status-primary').map((el) => el.text())
    try {
      expect(wrapper.find('.mp-day-picker__range').exists()).toBe(false)
      expect(selected()).toEqual(['20'])
      await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
      expect(selected()).toEqual(['25'])
      await wrapper
        .get('.mp-day-picker__body')
        .findAll('button')
        .find((el) => el.text() === '26')
        .trigger('click')
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual([`2026-10-20${suffix}`, `2026-10-26${suffix}`])
    } finally {
      wrapper.unmount()
    }
  })
}
