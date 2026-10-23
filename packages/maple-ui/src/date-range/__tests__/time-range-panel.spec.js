import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import DateRangePicker from '../DateRangePicker.vue'

for (const useSeconds of [false, true]) {
  it(`edits the selected time in one ${useSeconds ? 3 : 2}-column wheel and preserves dates`, async () => {
    const suffix = useSeconds ? ':00' : ''
    const wrapper = mount(DateRangePicker, {
      attachTo: document.body,
      props: {
        showTime: true,
        useSeconds,
        modelValue: [`2026-10-20 09:30${suffix}`, `2026-10-25 18:00${suffix}`],
      },
    })
    expect(wrapper.findAll('.mp-date-range-picker__summary-label').map((label) => label.text())).toEqual([
      '开始时间',
      '结束时间',
    ])
    const summary = wrapper.get('.mp-date-range-picker__summaries').element
    expect(summary.parentElement.firstElementChild).toBe(summary)
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    expect(wrapper.get('.mp-date-range-picker__datetime-picker').text()).not.toMatch(/开始|结束/)
    const picker = wrapper.getComponent(Picker)
    expect(wrapper.findAllComponents(Picker)).toHaveLength(1)
    expect(picker.props('columns')).toHaveLength(useSeconds ? 3 : 2)
    const values = useSeconds ? ['10', '15', '12'] : ['10', '15']
    picker.vm.$emit('change', values)
    await wrapper.vm.$nextTick()
    const updated = [`2026-10-20 10:15${useSeconds ? ':12' : ''}`, `2026-10-25 18:00${suffix}`]
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(updated)
    await wrapper.setProps({ modelValue: updated })
    const summaries = wrapper.findAll('.mp-date-range-picker__summary')
    expect(summaries).toHaveLength(2)
    for (const [index, summary] of summaries.entries()) {
      expect(summary.get('.mp-date-range-picker__summary-date').text()).toBe(updated[index].split(' ')[0])
      expect(summary.get('.mp-date-range-picker__summary-time').text()).toBe(updated[index].split(' ')[1])
    }
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    expect(wrapper.get('.mp-date-picker').isVisible()).toBe(true)
    expect(wrapper.find('.mp-date-range-picker__quick-time').exists()).toBe(true)
    wrapper.unmount()
  })
}

it('uses endpoint-specific time rules and preserves a locked endpoint', async () => {
  const wrapper = mount(DateRangePicker, {
    props: {
      showTime: true,
      useSeconds: false,
      disabled: [true, false],
      modelValue: ['2026-10-20 09:30', '2026-10-25 18:00'],
      disabledTime: (_date, side) => ({ disabledHours: () => (side === 'end' ? [19] : [10]) }),
    },
  })
  await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
  const picker = wrapper.getComponent(Picker)
  expect(picker.props('columns')[0].map((option) => option.value)).not.toContain('19')
  picker.vm.$emit('change', ['20', '45'])
  await wrapper.vm.$nextTick()
  expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-10-20 09:30', '2026-10-25 20:45'])
  wrapper.unmount()
})

it('keeps endpoint selection when switching from detailed time back to the calendar', async () => {
  const wrapper = mount(DateRangePicker, {
    props: { showTime: true, modelValue: ['2026-09-10 09:00:00', '2026-11-18 18:00:00'] },
  })
  try {
    await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    await wrapper.findAll('.mp-date-range-picker__summary')[0].trigger('click')
    expect(wrapper.get('.mp-date-range-picker__view-toggle').attributes('aria-pressed')).toBe('true')
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    expect(wrapper.emitted('update:pickerValue').at(-1)[0][0]).toContain('2026-09-01')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
