import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import TimePicker from '../../time/TimePicker.vue'
import DatePicker from '../DatePicker.vue'

describe('date calendar clock content', () => {
  it.each([DatePicker, DateRangePicker])(
    'explicitly renders a clock, keeping date precision and ownership',
    async (component) => {
      const range = component === DateRangePicker
      const wrapper = mount(component, {
        props: {
          modelValue: range ? ['2025-01-05 09:00', '2025-01-10 18:00'] : '2025-01-05 09:00',
          presentation: 'calendarClock',
          showTime: true,
          useSeconds: false,
          timePickerProps: {
            use12Hours: true,
            step: { minute: 15 },
            format: 'ss',
            presentation: 'picker',
            modelValue: '23:00',
            min: '22:00',
            disableConfirm: false,
            'onUpdate:modelValue': () => undefined,
          } as any,
        },
      })
      await wrapper.find(range ? '.mp-date-range-picker__view-tab' : '.mp-date-picker__view-tab').trigger('click')
      const clock = () => wrapper.findComponent(TimePicker)
      expect(clock().props()).toMatchObject({
        presentation: 'clock',
        use12Hours: true,
        step: { minute: 15 },
        format: 'HH:mm',
        disableConfirm: true,
        elevation: false,
      })
      expect(clock().props('modelValue')).not.toBe('23:00')
      expect(clock().props('min')).toBeUndefined()
      await wrapper.setProps({ timePickerProps: { use12Hours: false, step: { minute: 5 } } })
      expect(clock().props()).toMatchObject({ use12Hours: false, step: { minute: 5 }, presentation: 'clock' })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.unmount()
    },
  )
})
