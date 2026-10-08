import { computed } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PickerField from '../../_components/picker-field/PickerField.vue'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../../form/item-provide'
import { _PickerComponent as Picker } from '../../picker'
import TimeRange from '../../time-range/TimeRange.vue'
import TimePopup from '../presentation/TimePopup.vue'
import Time from '../Time.vue'
import TimePicker from '../TimePicker.vue'

describe('Maple temporal field presentation', () => {
  it('inherits Form error and allows an explicit false override', async () => {
    const wrapper = mount(Time, {
      global: {
        provide: {
          [FORM_ITEM_BIND_CONTROL_KEY as symbol]: {
            error: computed(() => true),
            errorMessage: computed(() => ''),
            hasOuterLabel: computed(() => true),
            eventHandlers: computed(() => ({})),
          },
        },
      },
    })
    expect(wrapper.findComponent(PickerField).props('error')).toBe(true)
    expect(wrapper.findComponent(PickerField).props('hint')).toBe(false)
    await wrapper.setProps({ error: false })
    expect(wrapper.findComponent(PickerField).props('error')).toBe(false)
    wrapper.unmount()
    const range = mount(TimeRange, { props: { error: true, separator: '' } })
    expect(range.findComponent(PickerField).props('error')).toBe(true)
    expect(range.findComponent(PickerField).props('separator')).toBe('')
    range.unmount()
  })
  it('filters all nested state and preserves popupContainer precedence', async () => {
    const wrapper = mount(Time, {
      props: {
        presentation: 'clock',
        popupContainer: false,
        timePickerProps: { modelValue: '23:00', min: '22:00', color: 'red', presentation: 'picker' } as never,
        pickerProps: { open: true, columns: [], toolbar: true, optionHeight: 48 } as never,
        popupProps: { open: true, defaultOpen: true, popupContainer: 'body', placement: 'top' } as never,
      },
      global: { stubs: { MpPopup: { template: '<div><slot /></div>' }, MpTimePicker: true, MpPicker: true } },
    })
    expect(wrapper.findComponent(TimePicker).props()).toMatchObject({
      color: 'red',
      min: undefined,
      presentation: 'clock',
    })
    await wrapper.setProps({ presentation: 'picker' })
    expect(wrapper.findComponent(Picker).props()).toMatchObject({ optionHeight: 48, toolbar: false })
    expect(wrapper.findComponent(TimePopup).props('popupProps')).toEqual({ popupContainer: false, placement: 'top' })
    expect(wrapper.findComponent(TimePopup).props('open')).toBe(false)
    wrapper.unmount()
  })
})
