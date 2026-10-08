import { mount } from '@vue/test-utils'
import TimeFieldContent from '../presentation/TimeFieldContent.vue'

// Mount the real field owner and presentation; stub only the heavyweight popup/panel leaves.
export function mountField(Component, options = {}) {
  return mount(Component, {
    ...options,
    global: {
      ...options.global,
      stubs: {
        MpPopup: { template: '<div><slot /></div>' },
        MpPicker: true,
        MpTimePicker: true,
        MpTimeRangePicker: true,
        ...options.global?.stubs,
      },
    },
  })
}
export function fieldView(wrapper) {
  return wrapper.findComponent(TimeFieldContent)
}
export function fieldState(wrapper) {
  return fieldView(wrapper).props('state')
}
export function changeWheel(wrapper, values) {
  wrapper.findComponent({ name: 'MpPicker' }).vm.$emit('change', values)
}
export function selectField(wrapper, value) {
  fieldState(wrapper).select(value, wrapper.props('disableConfirm'))
}
