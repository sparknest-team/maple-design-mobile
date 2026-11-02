import type { VueWrapper } from '@vue/test-utils'

// Fields switch through their external inputs; standalone legacy panels own summaries.
export function rangeControls(wrapper: VueWrapper<any>) {
  return wrapper.find('.mp-date-range-picker__summaries').exists()
    ? wrapper.findAll('.mp-date-range-picker__summary')
    : wrapper.findAll('input[role="combobox"]')
}
