import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Picker from '../../picker/Picker.vue'
import TimeRangePicker from '../TimeRangePicker.vue'

it('omits endpoint summaries and uses paired wheels', async () => {
  const wrapper = mount(TimeRangePicker, { props: { modelValue: ['10:30:00', '11:00:00'] } })
  try {
    expect(wrapper.find('.mp-time-range-picker__values').exists()).toBe(false)
    expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(6)
    expect(wrapper.find('.mp-time-picker__clock').exists()).toBe(false)
    expect(TimeRangePicker.props.timePickerProps).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
