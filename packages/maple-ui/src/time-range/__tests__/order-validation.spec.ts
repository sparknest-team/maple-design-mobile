import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import Picker from '../../picker/Picker.vue'
import { getTimePickerState } from '../../time/picker-columns'
import { formatTimeValue, fromClockValue } from '../../time/time-value'
import TimeRange from '../index'
import TimeRangePicker from '../TimeRangePicker.vue'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const global = { stubs: { MpTrigger: Surface, Dialog: Surface, Popup: Surface, teleport: true } }
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
const action = (wrapper: ReturnType<typeof mount>, label: string) =>
  wrapper.findAll('button').find((button) => button.text() === label)!
const now = new Date(2026, 9, 23, 19, 45, 12)

for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const format of ['HH:mm:ss', 'hh:mm A']) {
    for (const showNextDay of [false, true]) {
      for (const endpoint of [0, 1]) {
        it(`${mode} ${format} overnight=${showNextDay} Now updates endpoint ${endpoint} without sorting`, async () => {
          vi.useFakeTimers({ toFake: ['Date'] })
          vi.setSystemTime(now)
          const rules = { format }
          const initial = (endpoint === 0 ? ['09:00:00', '18:00:00'] : ['22:00:00', '23:00:00']).map((value) =>
            fromClockValue(value, rules)!,
          )
          const wrapper = mount(mode === 'standalone' ? TimeRangePicker : TimeRange, {
            props: {
              modelValue: initial,
              format,
              showNextDay,
              disableConfirm: false,
              ...(mode === 'standalone' ? {} : { editMode: mode, ...(mode === 'direct' ? { open: true } : {}) }),
            },
            global,
          })
          wrappers.push(wrapper)
          if (mode === 'popup') {
            await wrapper.get('[aria-haspopup=dialog]').trigger('click')
          }
          const boxes = wrapper.findAll('[role=listbox]')
          await boxes[endpoint === 0 ? 0 : boxes.length / 2].trigger('focusin')
          expect(action(wrapper, '此刻').attributes('disabled')).toBeUndefined()
          await action(wrapper, '此刻').trigger('click')
          await flushPromises()
          const expected = [...initial]
          expected[endpoint] = formatTimeValue(now, rules)!
          expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(expected)
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(wrapper.find('.mp-time-range-picker__next-day').exists()).toBe(showNextDay)
          expect(wrapper.find('[role=alert]').exists()).toBe(!showNextDay)
          if (!showNextDay) {
            expect(wrapper.get('[role=alert]').text()).toContain('结束时间不能早于开始时间')
            if (mode === 'popup') {
              expect(wrapper.get('[role=alert]').element.closest('.mp-field-presentation__body')).toBeNull()
            }
            expect(action(wrapper, '确认').attributes('disabled')).toBeDefined()
            await action(wrapper, '确认').trigger('click')
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
            // Repair one endpoint through the actual wheel conversion and owners.
            expected[endpoint ^ 1] = fromClockValue(endpoint === 0 ? '21:00:00' : '18:00:00', rules)!
            wrapper.getComponent(Picker).vm.$emit(
              'change',
              expected.flatMap((value) => getTimePickerState(value, rules).value),
            )
            await flushPromises()
            expect(wrapper.find('[role=alert]').exists()).toBe(false)
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          }
          expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
          await action(wrapper, '确认').trigger('click')
          await flushPromises()
          expect(wrapper.emitted('update:modelValue')).toEqual([[expected]])
          if (mode !== 'standalone') {
            expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
          }
        })
      }
    }
  }
}

it('revalidates overnight permission without changing endpoints and accepts equal times', async () => {
  const wrapper = mount(TimeRangePicker, {
    props: { modelValue: ['22:00', '06:00'], format: 'HH:mm', showNextDay: true },
  })
  wrappers.push(wrapper)
  expect(wrapper.find('.mp-time-range-picker__next-day').exists()).toBe(true)
  expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
  await wrapper.setProps({ showNextDay: false })
  expect(wrapper.find('[role=alert]').exists()).toBe(true)
  expect(action(wrapper, '确认').attributes('disabled')).toBeDefined()
  expect(wrapper.emitted('change')).toBeUndefined()
  await wrapper.setProps({ modelValue: ['06:00', '06:00'] })
  expect(wrapper.find('[role=alert]').exists()).toBe(false)
  expect(wrapper.find('.mp-time-range-picker__next-day').exists()).toBe(false)
  expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
})
