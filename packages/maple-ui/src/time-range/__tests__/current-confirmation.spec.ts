import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import Picker from '../../picker/Picker.vue'
import { getTimePickerState } from '../../time/picker-columns'
import TimeRange from '../index'
import TimePanelContent from '../presentation/TimePanelContent.vue'
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

for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const endpoint of [0, 1]) {
    for (const showNextDay of [false, true]) {
      for (const disableConfirm of [false, true]) {
        it(`${mode} end=${endpoint} nextDay=${showNextDay} immediate=${disableConfirm} stages Now and wheel edits`, async () => {
          vi.useFakeTimers({ toFake: ['Date'] })
          vi.setSystemTime(new Date(2026, 9, 23, 12, 45, 12))
          const initial = showNextDay ? ['22:00:00', '06:00:00'] : ['09:00:00', '18:00:00']
          const wrapper = mount(mode === 'standalone' ? TimeRangePicker : TimeRange, {
            props: {
              modelValue: initial,
              showNextDay,
              disableConfirm,
              ...(mode === 'standalone' ? {} : { editMode: mode, ...(mode === 'direct' ? { open: true } : {}) }),
            },
            global,
          })
          wrappers.push(wrapper)
          if (mode === 'popup') {
            await wrapper.get('[aria-haspopup=dialog]').trigger('click')
          }
          await flushPromises()
          const boxes = wrapper.findAll('[role=listbox]')
          await boxes[endpoint === 0 ? 0 : boxes.length / 2].trigger('focusin')
          const requests = wrapper.emitted('update:open')?.length ?? 0
          await action(wrapper, '此刻').trigger('click')
          await flushPromises()
          const expected = [...initial]
          expected[endpoint] = '12:45:12'
          expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(expected)
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(wrapper.emitted('change')).toBeUndefined()
          expect(wrapper.emitted('update:open')?.length ?? 0).toBe(requests)
          expect(wrapper.findAll('button').filter((button) => button.text() === '此刻')).toHaveLength(1)
          expect(wrapper.findAll('button').filter((button) => button.text() === '确认')).toHaveLength(1)
          expect(wrapper.find('.mp-time-range-picker__next-day').exists()).toBe(showNextDay)
          expected[endpoint] = '12:46:12'
          wrapper.getComponent(Picker).vm.$emit(
            'change',
            expected.flatMap((value) => getTimePickerState(value, {}).value),
          )
          await flushPromises()
          expect(wrapper.emitted('select')?.at(-1)?.[0]).toEqual(expected)
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
          await action(wrapper, '确认').trigger('click')
          await flushPromises()
          expect(wrapper.emitted('update:modelValue')).toEqual([[expected]])
          expect(wrapper.emitted('change')).toHaveLength(1)
          if (mode !== 'standalone') {
            expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
          }
        })
      }
    }
  }
}

it('cancels Now without committing and honours an asynchronous beforeCommit rejection', async () => {
  const initial = ['00:00:00', '23:59:59']
  const beforeCommit = vi.fn().mockResolvedValue(false)
  const wrapper = mount(TimeRange, {
    props: { modelValue: initial, editMode: 'popup', disableConfirm: true, beforeCommit },
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
  expect(wrapper.getComponent(TimePanelContent).props('state').draft.value).toEqual(initial)
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
