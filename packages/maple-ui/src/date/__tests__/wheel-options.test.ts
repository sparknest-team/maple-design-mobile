import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import DatePicker from '../DatePicker.vue'
import { dateWheelOptions } from '../wheel-options'

describe('date wheel appearance', () => {
  it('keeps sizing only, never columns, model, popup or notifications', () => {
    expect(
      dateWheelOptions({
        optionHeight: 36,
        optionCount: 4,
        class: 'wheel-view',
        columns: [],
        toolbar: true,
        modelValue: ['2020'],
        open: true,
        fieldNames: { text: 'label' },
        'onUpdate:modelValue': () => undefined,
      }),
    ).toEqual({ optionHeight: 36, optionCount: 4, class: 'wheel-view' })
    expect(dateWheelOptions()).toEqual({})
  })
  it.each([DatePicker, DateRangePicker])('applies sizing reactively while keeping columns owned', async (component) => {
    const wrapper = mount(component, {
      props: {
        presentation: 'picker',
        pickerProps: { optionHeight: 36, optionCount: 4, columns: [], toolbar: true, modelValue: ['2020'] } as any,
      },
    })
    const wheel = () => wrapper.findComponent(Picker)
    expect(wheel().props()).toMatchObject({ optionHeight: 36, optionCount: 4, toolbar: false })
    expect((wheel().props('columns') ?? []).length).toBeGreaterThan(0)
    await wrapper.setProps({ pickerProps: { optionHeight: 40, optionCount: 5 } })
    expect(wheel().props()).toMatchObject({ optionHeight: 40, optionCount: 5 })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
})
