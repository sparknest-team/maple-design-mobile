import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import DateField from '..'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DatePicker from '../DatePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = { stubs: { MpTrigger: Surface, teleport: true } }
afterEach(() => vi.useRealTimers())
for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const range of [false, true]) {
    it(`${mode} range=${range} marks today without selecting it`, async () => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date(2026, 9, 26, 12))
      const owner = mount(
        mode === 'standalone' ? (range ? DateRangePicker : DatePicker) : range ? DateRange : DateField,
        {
          props: {
            modelValue: range ? [] : undefined,
            disableConfirm: false,
            ...(mode === 'standalone'
              ? { presentation: 'calendar' }
              : { editMode: mode, panelType: 'calendar', open: true }),
          },
          global,
        },
      )
      try {
        await flushPromises()
        const today = () => owner.get('.mp-day-picker__button[aria-current="date"]')
        const confirm = () => owner.findAll('button').find((button) => button.text() === '确认')!
        expect(today().attributes('aria-pressed')).toBe('false')
        expect(today().classes()).not.toContain('mp-button--variant-outline')
        expect(confirm().attributes('disabled')).toBeDefined()
        expect(owner.emitted('select')).toBeUndefined()
        await today().trigger('click')
        await flushPromises()
        expect(today().attributes('aria-pressed')).toBe('true')
        expect(owner.emitted('update:modelValue')).toBeUndefined()
        if (range) {
          expect(confirm().attributes('disabled')).toBeDefined()
          await owner.findAll('.mp-date-range-picker__summary')[1].trigger('click')
          await today().trigger('click')
          await flushPromises()
        }
        expect(confirm().attributes('disabled')).toBeUndefined()
        await confirm().trigger('click')
        await flushPromises()
        expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(
          range ? ['2026-10-26', '2026-10-26'] : '2026-10-26',
        )
      } finally {
        owner.unmount()
      }
    })
  }
}
