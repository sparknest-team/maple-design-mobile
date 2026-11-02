import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DatePicker from '../DatePicker.vue'
import { rangeControls } from './range-controls'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const global = { stubs: { MpTrigger: Surface, Dialog: Surface, Popup: Surface, teleport: true } }
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
function freeze() {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 22, 10, 45, 12))
}
const action = (wrapper: ReturnType<typeof mount>, label: string) =>
  wrapper.findAll('button').find((button) => button.text() === label)!

for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const showTime of [false, true]) {
    for (const disableConfirm of [false, true]) {
      it(`${mode} showTime=${showTime} disableConfirm=${disableConfirm} stages reversed Now and repairs the active endpoint`, async () => {
        freeze()
        const initial = showTime ? ['2026-10-20 09:30:00', '2026-10-21 18:00:00'] : ['2026-10-20', '2026-10-21']
        const current = showTime ? '2026-10-22 10:45:12' : '2026-10-22'
        const wrapper = mount(mode === 'standalone' ? DateRangePicker : DateRange, {
          props: {
            modelValue: initial,
            showTime,
            disableConfirm,
            ...(mode === 'standalone' ? {} : { editMode: mode, ...(mode === 'direct' ? { open: true } : {}) }),
          },
          global,
        })
        wrappers.push(wrapper)
        if (mode === 'popup') {
          await wrapper.get('[aria-haspopup=dialog]:not(:disabled)').trigger('click')
        }
        expect(action(wrapper, '此刻').attributes('disabled')).toBeUndefined()
        await action(wrapper, '此刻').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual([current, initial[1]])
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        expect(wrapper.get('[role=alert]').text()).toContain(
          showTime ? '结束时间不能早于开始时间' : '结束日期不能早于开始日期',
        )
        if (mode === 'popup') {
          expect(wrapper.get('[role=alert]').element.closest('.mp-field-presentation__body')).toBeNull()
        }
        expect(action(wrapper, '确认').attributes('disabled')).toBeDefined()
        await action(wrapper, '确认').trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        // Endpoint switching must retain the invalid draft rather than restore the old start.
        await rangeControls(wrapper)[1].trigger('click')
        await action(wrapper, '此刻').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual([current, current])
        expect(wrapper.find('[role=alert]').exists()).toBe(false)
        expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await action(wrapper, '确认').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')).toEqual([[[current, current]]])
        if (mode !== 'standalone') {
          expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
        }
      })
    }
  }
}

describe('endpoint-only range edits', () => {
  it('also validates Now on the legacy calendar range entry without swapping', async () => {
    freeze()
    const wrapper = mount(DatePicker, {
      props: { range: true, modelValue: ['2026-10-20', '2026-10-21'], presentation: 'calendar' },
    })
    wrappers.push(wrapper)
    await action(wrapper, '此刻').trigger('click')
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(['2026-10-22', '2026-10-21'])
    expect(wrapper.find('[role=alert]').exists()).toBe(true)
    expect(action(wrapper, '确认').attributes('disabled')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
  it.each(['standalone', 'direct', 'popup'] as const)(
    '%s Now edits the unlocked end without moving the locked start',
    async (mode) => {
      freeze()
      const wrapper = mount(mode === 'standalone' ? DateRangePicker : DateRange, {
        props: {
          modelValue: ['2026-10-23 09:30:00', '2026-10-25 18:00:00'],
          showTime: true,
          disabled: [true, false],
          disableConfirm: false,
          ...(mode === 'standalone' ? {} : { editMode: mode, ...(mode === 'direct' ? { open: true } : {}) }),
        },
        global,
      })
      wrappers.push(wrapper)
      if (mode === 'popup') {
        await wrapper.get('[aria-haspopup=dialog]:not(:disabled)').trigger('click')
      }
      expect(action(wrapper, '此刻').attributes('disabled')).toBeUndefined()
      await action(wrapper, '此刻').trigger('click')
      await flushPromises()
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(['2026-10-23 09:30:00', '2026-10-22 10:45:12'])
      expect(wrapper.get('[role=alert]').text()).toContain('结束时间不能早于开始时间')
      expect(action(wrapper, '确认').attributes('disabled')).toBeDefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    },
  )
  it.each([
    { max: '2026-10-21 23:59:59' },
    { disabledTime: () => ({ disabledHours: () => [10] }) },
    { disabledDate: (_date: Date, side: string) => side === 'start' },
  ])('does not bypass endpoint rules or exchange a locked endpoint: %j', async (options) => {
    freeze()
    const wrapper = mount(DateRangePicker, {
      props: {
        modelValue: ['2026-10-20 09:30:00', '2026-10-21 18:00:00'],
        showTime: true,
        ...options,
      },
    })
    wrappers.push(wrapper)
    expect(action(wrapper, '此刻').attributes('disabled')).toBeDefined()
    await action(wrapper, '此刻').trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
})

it('cancels a reversed Now draft and restores the committed range on reopen', async () => {
  freeze()
  const initial = ['2026-10-20 09:30:00', '2026-10-21 18:00:00']
  const wrapper = mount(DateRange, {
    props: { editMode: 'popup', modelValue: initial, showTime: true },
    global,
  })
  wrappers.push(wrapper)
  await wrapper.get('[aria-haspopup=dialog]:not(:disabled)').trigger('click')
  await action(wrapper, '此刻').trigger('click')
  expect(wrapper.find('[role=alert]').exists()).toBe(true)
  await wrapper.get('.mp-field-presentation__close').trigger('click')
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.get('[aria-haspopup=dialog]:not(:disabled)').trigger('click')
  expect(wrapper.find('[role=alert]').exists()).toBe(false)
  expect(wrapper.get('.mp-temporal-current__value').text()).toBe('2026-10-20')
  expect(wrapper.find('.mp-date-range-picker__summaries').exists()).toBe(true)
  expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
})
