import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import DateRangePicker from '../DateRangePicker.vue'

for (const [type, initial, next, expected, count] of [
  ['year', ['2026', '2028'], ['2027', '2029'], ['2027', '2029'], 1],
  ['month', ['2026-10', '2026-12'], ['2026', '11', '2027', '01'], ['2026-11', '2027-01'], 2],
  ['date', ['2026-10-20', '2026-10-25'], ['2026', '10', '21', '2026', '10', '26'], ['2026-10-21', '2026-10-26'], 3],
]) {
  it(`edits the selected ${type} endpoint from the summary`, async () => {
    const wrapper = mount(DateRangePicker, { props: { type, modelValue: initial, presentation: 'picker' } })
    try {
      await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
      const picker = wrapper.getComponent(Picker)
      expect(picker.props('columns')).toHaveLength(count)
      const labels = wrapper.findAll('.mp-date-range-picker__column-label').map((label) => label.text())
      expect(labels).toHaveLength(count)
      expect(wrapper.findAll('.mp-date-range-picker__summary')[1].attributes('aria-pressed')).toBe('true')
      picker.vm.$emit('change', next.slice(count))
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual([initial[0], expected[1]])
    } finally {
      wrapper.unmount()
    }
  })
}

it('preserves a locked date and applies each endpoint date rule independently', async () => {
  const wrapper = mount(DateRangePicker, {
    props: {
      presentation: 'picker',
      modelValue: ['2026-10-20', '2026-10-25'],
      disabled: [true, false],
      disabledDate: (date, side) => side === 'end' && date.getDate() === 26,
    },
  })
  try {
    const picker = wrapper.getComponent(Picker)
    expect(picker.props('disabled')).toBe(false)
    expect(picker.props('columns')[2].map((option) => option.value)).not.toContain('26')
    picker.vm.$emit('change', ['2026', '10', '27'])
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(['2026-10-20', '2026-10-27'])
  } finally {
    wrapper.unmount()
  }
})
