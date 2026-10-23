import { computed } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PickerField from '../../_components/picker-field/PickerField.vue'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../../form/item-provide'
import { _PickerComponent as Picker } from '../../picker'
import TimeRange from '../../time-range/TimeRange.vue'
import Trigger from '../../trigger'
import Time from '../Time.vue'

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
        defaultOpen: true,
        popupContainer: false,
        timePickerProps: { modelValue: '23:00', min: '22:00', color: 'red' } as never,
        pickerProps: { open: true, columns: [], toolbar: true, optionHeight: 48 } as never,
        popupProps: { open: true, defaultOpen: true, popupContainer: 'body', placement: 'top' } as never,
      },
      global: {
        stubs: {
          MpTrigger: {
            props: ['open', 'placement', 'trigger', 'popupContainer'],
            template: '<div><slot /><slot name="content" /></div>',
          },
          MpTimePicker: true,
          MpPicker: true,
        },
      },
    })
    expect(wrapper.findComponent(Picker).props()).toMatchObject({ optionHeight: 48, toolbar: false })
    expect(wrapper.findComponent(Trigger).props()).toMatchObject({
      popupContainer: false,
      placement: 'top',
      trigger: [],
    })
    expect(wrapper.findComponent(Trigger).props('open')).toBe(true)
    wrapper.unmount()
  })
})
