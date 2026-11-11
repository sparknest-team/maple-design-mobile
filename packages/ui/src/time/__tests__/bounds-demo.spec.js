import { proxyRefs } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Time from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Space from '../../space'
import Demo from '../example/demos/bounds.vue'
import Content from '../presentation/TimePanelContent.vue'
import TimePicker from '../TimePicker.vue'

useDemoControls()

test('single-time bounds retain an invalid committed value until an inclusive cross-minute draft is confirmed', async () => {
  const wrapper = mount(Demo, { global: { components: { MpTime: Time, MpTimePicker: TimePicker, MpSpace: Space } } })
  try {
    await flushPromises()
    const picker = wrapper.findComponent(TimePicker)
    const state = () => proxyRefs(picker.findComponent(Content).props('state'))
    await wrapper.get('input[type=checkbox]').setValue(true)
    expect(picker.props('modelValue')).toBe('10:30:38')
    expect(state().canConfirm).toBe(false)
    state().handlePickerChange(['10', '31', '02'])
    await flushPromises()
    expect(picker.props('modelValue')).toBe('10:30:38')
    expect(state().canConfirm).toBe(true)
    state().confirm()
    await flushPromises()
    expect(picker.props('modelValue')).toBe('10:31:02')
    expect(wrapper.findComponent(Time).props('modelValue')).toBe('10:31:02')
  } finally {
    wrapper.unmount()
  }
})
