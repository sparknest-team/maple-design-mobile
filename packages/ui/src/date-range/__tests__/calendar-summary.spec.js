import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DayPickerPanel from '../../date/picker-panels/DayPickerPanel.vue'
import DateRangePicker from '../DateRangePicker.vue'

for (const [type, values, viewport] of [
  ['date', ['2026-09-10', '2026-11-18'], ['2026-11-01', '2026-12-01']],
  ['month', ['2026-09', '2027-02'], ['2027-01', '2028-01']],
  ['year', ['2026', '2028'], ['2028', '2029']],
]) {
  it(`shows clickable top summaries navigating without committing a ${type} range`, async () => {
    const wrapper = mount(DateRangePicker, { props: { type, modelValue: values } })
    const summaries = wrapper.get('.mp-date-range-picker__summaries').element
    expect(summaries.parentElement.firstElementChild).toBe(summaries)
    expect(wrapper.get('.mp-date-range-picker').classes()).toContain('mp-date-range-picker--calendar')
    expect(wrapper.findAll('.mp-date-range-picker__summary-label').map((label) => label.text())).toEqual([
      '开始日期',
      '结束日期',
    ])
    const dates = wrapper.findAll('.mp-date-range-picker__summary-date')
    expect(dates.map((date) => date.text())).toEqual(values)
    expect(wrapper.find('.mp-date-range-picker__summary-time').exists()).toBe(false)
    await dates[1].trigger('click')
    expect(wrapper.emitted('update:pickerValue').at(-1)[0]).toEqual(viewport)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
}

it('shows the pending first date and updates both summaries before confirmation', async () => {
  const wrapper = mount(DateRangePicker, {
    props: {
      modelValue: ['2026-09-22', '2026-09-24'],
      pickerValue: ['2026-09-01', '2026-10-01'],
      disableConfirm: false,
    },
  })
  const dates = () => wrapper.findAll('.mp-date-range-picker__summary-date').map((date) => date.text())
  wrapper.getComponent(DayPickerPanel).vm.$emit('choose-day', 10)
  await wrapper.vm.$nextTick()
  expect(dates()).toEqual(['2026-09-10', '2026-09-24'])
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
  wrapper.getComponent(DayPickerPanel).vm.$emit('choose-day', 12)
  await wrapper.vm.$nextTick()
  expect(dates()).toEqual(['2026-09-10', '2026-09-12'])
  await wrapper.get('.mp-date-panel-actions .mp-button:last-child').trigger('click')
  expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-09-10', '2026-09-12'])
  await wrapper.setProps({ modelValue: [] })
  expect(dates()).toEqual(['选择开始', '选择结束'])
  wrapper.unmount()
})
