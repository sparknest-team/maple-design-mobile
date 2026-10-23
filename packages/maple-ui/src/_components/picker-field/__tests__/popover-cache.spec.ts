import { nextTick, type Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRange from '../../../date-range/DateRange.vue'
import Date from '../../../date/Date.vue'
import type { DateFieldState } from '../../../date/field-state'
import DateFieldContent from '../../../date/presentation/DateFieldContent.vue'
import TimeRange from '../../../time-range/TimeRange.vue'
import type { TimeFieldState } from '../../../time/field-state'
import TimeFieldContent from '../../../time/presentation/TimeFieldContent.vue'
import Time from '../../../time/Time.vue'

const settle = async () => {
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 100))
  await nextTick()
}

const cases: [string, Component, Component, string | string[], string | string[]][] = [
  ['Date', Date, DateFieldContent, '2026-10-20', '2026-10-23'],
  ['DateRange', DateRange, DateFieldContent, ['2026-10-20', '2026-10-25'], ['2026-10-23', '2026-10-26']],
  ['Time', Time, TimeFieldContent, '09:00:00', '11:00:00'],
  ['TimeRange', TimeRange, TimeFieldContent, ['09:00:00', '10:00:00'], ['11:00:00', '12:00:00']],
]

for (const [name, Component, Content, initial, updated] of cases) {
  it(`${name} destroys its closed popover and reopens with the current value`, async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        modelValue: initial,
        popupProps: { popupContainer: false, animationName: '', duration: 0, unmountOnClose: false },
      },
      global: { stubs: { transition: false, DatePanel: true, TimePicker: true, TimeRangePicker: true } },
    })
    try {
      const { state } = wrapper.getComponent(Content).props() as { state: DateFieldState | TimeFieldState }
      expect(wrapper.find('[trigger-placement]').exists()).toBe(false)
      state.setOpen(true)
      await settle()
      const firstPanel = wrapper.get('[role="dialog"]').element
      expect(state.draft.value).toEqual(initial)
      state.select(updated, false)
      expect(state.draft.value).toEqual(updated)
      state.cancel()
      await settle()
      expect(wrapper.find('[trigger-placement]').exists()).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.setProps({ modelValue: updated })
      state.setOpen(true)
      await settle()
      expect(wrapper.get('[role="dialog"]').element).not.toBe(firstPanel)
      expect(state.draft.value).toEqual(updated)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}
