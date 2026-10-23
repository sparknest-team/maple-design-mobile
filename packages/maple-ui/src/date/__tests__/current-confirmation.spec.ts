import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import DatePicker from '../DatePicker.vue'
import DateField from '../index'
import DatePanelContent from '../presentation/DatePanelContent.vue'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const global = { stubs: { MpTrigger: Surface, Dialog: Surface, Popup: Surface, teleport: true } }
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
function freeze() {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 23, 12, 45, 12))
}
const action = (wrapper: ReturnType<typeof mount>, label: string) =>
  wrapper.findAll('button').find((button) => button.text() === label)!

for (const mode of ['standalone', 'inline', 'popup'] as const) {
  for (const showTime of [false, true]) {
    for (const range of [false, true]) {
      for (const endpoint of range ? [0, 1] : [0]) {
        for (const disableConfirm of [false, true]) {
          it(`${mode} time=${showTime} range=${range} end=${endpoint} immediate=${disableConfirm} keeps valid Now and subsequent edits pending`, async () => {
            freeze()
            const suffix = showTime ? ' 09:30:00' : ''
            const initial = range ? [`2026-10-20${suffix}`, `2026-10-27${suffix}`] : `2026-10-20${suffix}`
            const current = showTime ? '2026-10-23 12:45:12' : '2026-10-23'
            const edited = `2026-10-24${suffix}`
            const wrapper = mount(
              mode === 'standalone' ? (range ? DateRangePicker : DatePicker) : range ? DateRange : DateField,
              {
                props: {
                  modelValue: initial,
                  showTime,
                  disableConfirm,
                  ...(mode === 'standalone'
                    ? {}
                    : { presentation: mode, ...(mode === 'inline' ? { open: true } : {}) }),
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
            const requests = wrapper.emitted('update:open')?.length ?? 0
            expect(wrapper.findAll('button').filter((button) => button.text() === '此刻')).toHaveLength(1)
            await action(wrapper, '此刻').trigger('click')
            await flushPromises()
            const expected = range ? [...(initial as string[])] : current
            if (Array.isArray(expected)) {
              expected[endpoint] = current
            }
            expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(expected)
            expect(wrapper.emitted('change')).toBeUndefined()
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
            expect(wrapper.emitted('update:open')?.length ?? 0).toBe(requests)
            expect(wrapper.findAll('button').filter((button) => button.text() === '确认')).toHaveLength(1)
            expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
            const finalValue = Array.isArray(expected) ? [...expected] : edited
            if (Array.isArray(finalValue)) {
              finalValue[endpoint] = edited
            }
            wrapper.getComponent(DatePanelContent).vm.$emit('select', finalValue)
            await flushPromises()
            expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(finalValue)
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
            await action(wrapper, '确认').trigger('click')
            await flushPromises()
            expect(wrapper.emitted('update:modelValue')).toEqual([[finalValue]])
            expect(wrapper.emitted('change')).toHaveLength(1)
            if (mode !== 'standalone') {
              expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
            }
          })
        }
      }
    }
  }
}

for (const range of [false, true]) {
  it(`popup range=${range} cancels valid Now and keeps beforeCommit ownership`, async () => {
    freeze()
    const initial = range ? ['2026-10-20 09:30:00', '2026-10-27 18:00:00'] : '2026-10-20 09:30:00'
    const beforeCommit = vi.fn().mockResolvedValue(false)
    const wrapper = mount(range ? DateRange : DateField, {
      props: { modelValue: initial, showTime: true, presentation: 'popup', disableConfirm: true, beforeCommit },
      global,
    })
    wrappers.push(wrapper)
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await action(wrapper, '此刻').trigger('click')
    expect(beforeCommit).not.toHaveBeenCalled()
    await wrapper.get('.mp-field-presentation__close').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    expect(wrapper.getComponent(DatePanelContent).props('value')).toEqual(initial)
    await action(wrapper, '此刻').trigger('click')
    await action(wrapper, '确认').trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    beforeCommit.mockResolvedValue(true)
    await action(wrapper, '确认').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })
}
