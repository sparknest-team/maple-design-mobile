import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DatePicker from '../DatePicker.vue'
import DateField from '../index'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const global = { stubs: { MpTrigger: Surface, MpPopup: Surface, teleport: true } }
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
const action = (wrapper: ReturnType<typeof mount>, label: string) =>
  wrapper.findAll('button').find((button) => button.text() === label)!

for (const mode of ['standalone', 'inline', 'popup'] as const) {
  for (const showTime of [false, true]) {
    for (const range of [false, true]) {
      for (const endpoint of range ? [0, 1] : [0]) {
        it(`${mode} time=${showTime} range=${range} end=${endpoint} Now reveals the current month and preserves paging`, async () => {
          vi.useFakeTimers({ toFake: ['Date'] })
          vi.setSystemTime(new Date(2026, 9, 23, 12, 45, 12))
          const suffix = showTime ? ' 09:30:00' : ''
          const initial = range ? [`2026-09-19${suffix}`, `2026-11-25${suffix}`] : `2026-09-19${suffix}`
          const wrapper = mount(
            mode === 'standalone' ? (range ? DateRangePicker : DatePicker) : range ? DateRange : DateField,
            {
              props: {
                modelValue: initial,
                showTime,
                disableConfirm: false,
                ...(mode === 'standalone'
                  ? {}
                  : { presentation: mode, popupContainer: false, ...(mode === 'inline' ? { open: true } : {}) }),
              },
              global,
            },
          )
          wrappers.push(wrapper)
          if (mode === 'popup') {
            await wrapper.get('[aria-haspopup=dialog]').trigger('click')
          }
          await flushPromises()
          if (range) {
            await wrapper.findAll('.mp-date-range-picker__summary')[endpoint].trigger('click')
          }
          await action(wrapper, '此刻').trigger('click')
          await flushPromises()
          const title = () => wrapper.get('.mp-date-picker-header__value').text()
          expect(title()).toBe('2026 十月')
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          const selected = wrapper.emitted('select')?.at(-1)?.[0]
          const now = showTime ? '2026-10-23 12:45:12' : '2026-10-23'
          expect(range ? (selected as string[])[endpoint] : selected).toBe(now)
          if (range) {
            expect((selected as string[])[endpoint ^ 1]).toBe((initial as string[])[endpoint ^ 1])
          }
          await wrapper.findAll('.mp-date-picker-header__arrow')[1].trigger('click')
          expect(title()).toBe('2026 十一月')
          await wrapper.findAll('.mp-date-picker-header__arrow')[0].trigger('click')
          expect(title()).toBe('2026 十月')
          await wrapper.get('.mp-date-picker-header__value').trigger('click')
          expect(wrapper.find('.mp-month-picker').exists()).toBe(true)
          await wrapper.findAll('.mp-month-picker li button')[9].trigger('click')
          expect(title()).toBe('2026 十月')
          expect(wrapper.emitted('select')).toHaveLength(1)
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        })
      }
    }
  }
}

it('does not restore September after clicking Now from an October shortcut preview', async () => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 23, 12, 45, 12))
  const wrapper = mount(DatePicker, {
    props: {
      modelValue: '2026-09-19',
      disableConfirm: false,
      shortcuts: [{ label: '本月', value: '2026-10-01' }],
    },
  })
  wrappers.push(wrapper)
  await action(wrapper, '本月').trigger('mouseenter')
  expect(wrapper.get('.mp-date-picker-header__value').text()).toBe('2026 十月')
  await action(wrapper, '此刻').trigger('click')
  await flushPromises()
  expect(wrapper.get('.mp-date-picker-header__value').text()).toBe('2026 十月')
  expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe('2026-10-23')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})
