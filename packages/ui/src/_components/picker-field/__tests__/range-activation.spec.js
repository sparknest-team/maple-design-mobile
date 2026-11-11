import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DateRange from '../../../date-range'
import { _PickerComponent as Picker } from '../../../picker'
import TimeRange from '../../../time-range'

describe('Maple range field activation', () => {
  test.each([
    ['date-range', DateRange, ['2026-09-22', '2026-09-24'], ['2026', '09', '25'], '2026-09-25'],
    ['time-range', TimeRange, ['09:00', '10:00'], ['09', '00', '11', '30'], '11:30'],
  ])('%s end controls edit the end draft, not the start', async (name, Component, value, picked, expected) => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: value,
        popupContainer: false,
        editMode: 'popup',
        ...(name === 'time-range' ? { format: 'HH:mm' } : { panelType: 'picker' }),
      },
    })
    try {
      if (name === 'date-range') {
        await wrapper.findAll('input[role="combobox"]')[1].trigger('click')
      } else {
        await wrapper.get('button[aria-haspopup="dialog"]').trigger('click')
      }
      await flushPromises()
      expect(wrapper.get('[role="dialog"]').isVisible()).toBe(true)
      if (name === 'date-range') {
        expect(wrapper.find('.mp-date-range-picker__summaries').exists()).toBe(true)
        expect(wrapper.get('.mp-temporal-current__value').text()).toContain(value[0])
        await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
        expect(wrapper.get('.mp-temporal-current__value').text()).toContain(value[1])
      } else {
        expect(wrapper.findAll('[role="listbox"]')).toHaveLength(4)
        await wrapper.findAll('[role="listbox"]')[2].get('[aria-selected="true"]').trigger('pointerdown')
        expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
      }
      wrapper.getComponent(Picker).vm.$emit('change', picked)
      await flushPromises()
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual([value[0], expected])
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper
        .findAll('button')
        .find((button) => button.text() === '确认')
        .trigger('click')
      await flushPromises()
      expect(wrapper.emitted('update:modelValue')).toEqual([[[value[0], expected]]])
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('false')
    } finally {
      wrapper.unmount()
    }
  })
})
