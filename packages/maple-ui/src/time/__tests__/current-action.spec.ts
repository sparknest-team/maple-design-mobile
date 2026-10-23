import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import Picker from '../../picker/Picker.vue'
import Time from '../index'
import { getTimePickerState } from '../picker-columns'
import TimePanelContent from '../presentation/TimePanelContent.vue'
import TimePicker from '../TimePicker.vue'

const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
const global = { stubs: { MpTrigger: Surface, Dialog: Surface, Popup: Surface, teleport: true } }
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
function freeze() {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 23, 19, 45, 12))
}
const action = (wrapper: ReturnType<typeof mount>, text: string) =>
  wrapper.findAll('button').find((button) => button.text() === text)!
const formats = [
  { format: 'HH:mm:ss', initial: '09:30:00', current: '19:45:12', edited: '19:46:12' },
  { format: 'HH:mm', initial: '09:30', current: '19:45', edited: '19:46' },
  { format: 'hh:mm A', initial: '09:30 AM', current: '07:45 PM', edited: '07:46 PM' },
]
for (const mode of ['standalone', 'inline', 'popup'] as const) {
  for (const { format, initial, current, edited } of formats) {
    for (const disableConfirm of [false, true]) {
      it(`${mode} ${format} disableConfirm=${disableConfirm} Now stages a value until explicit confirmation`, async () => {
        freeze()
        const wrapper = mount(mode === 'standalone' ? TimePicker : Time, {
          props: {
            modelValue: initial,
            format,
            disableConfirm,
            ...(mode === 'standalone' ? {} : { presentation: mode, ...(mode === 'inline' ? { open: true } : {}) }),
          },
          global,
        })
        wrappers.push(wrapper)
        if (mode === 'popup') {
          await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        }
        await flushPromises()
        const initialRequests = wrapper.emitted('update:open')?.length ?? 0
        expect(wrapper.findAll('button').filter((button) => button.text() === '此刻')).toHaveLength(1)
        await action(wrapper, '此刻').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe(current)
        expect(wrapper.emitted('change')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        expect(wrapper.emitted('update:open')?.length ?? 0).toBe(initialRequests)
        expect(wrapper.findAll('button').filter((button) => button.text() === '确认')).toHaveLength(1)
        expect(action(wrapper, '确认').attributes('disabled')).toBeUndefined()
        wrapper.getComponent(Picker).vm.$emit('change', getTimePickerState(edited, { format }).value)
        await flushPromises()
        expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe(edited)
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await action(wrapper, '确认').trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')).toEqual([[edited]])
        expect(wrapper.emitted('change')).toHaveLength(1)
        if (mode !== 'standalone') {
          expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
        }
      })
    }
  }
  it(`${mode} can hide the Now action through the root prop`, async () => {
    const wrapper = mount(mode === 'standalone' ? TimePicker : Time, {
      props: {
        format: 'HH:mm',
        showNowButton: false,
        ...(mode === 'standalone' ? {} : { presentation: mode, open: true }),
      },
      global,
    })
    wrappers.push(wrapper)
    expect(wrapper.findAll('button').some((button) => button.text() === '此刻')).toBe(false)
    const content = wrapper.getComponent(TimePanelContent)
    expect(content.props('state').selectNow()).toBe(false)
    expect(wrapper.emitted('select')).toBeUndefined()
  })
}

it.each([
  { disabled: true },
  { readonly: true },
  { min: '20:00:00' },
  { max: '18:00:00' },
  { step: { minute: 30 } },
  { disabledHours: () => [19] },
  { disabledMinutes: () => [45] },
  { disabledSeconds: () => [12] },
])('Now respects the current constraints %j', async (options) => {
  freeze()
  const wrapper = mount(TimePicker, { props: { format: 'HH:mm:ss', ...options } })
  wrappers.push(wrapper)
  expect(action(wrapper, '此刻').attributes('disabled')).toBeDefined()
  expect(wrapper.getComponent(TimePanelContent).props('state').selectNow()).toBe(false)
  expect(wrapper.emitted('select')).toBeUndefined()
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

it('popup Now preserves cancellation and beforeCommit ownership', async () => {
  freeze()
  const beforeCommit = vi.fn().mockResolvedValue(false)
  const wrapper = mount(Time, {
    props: { modelValue: '09:30:00', presentation: 'popup', beforeCommit },
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
  expect(wrapper.getComponent(TimePanelContent).props('state').draft.value).toBe('09:30:00')
  await action(wrapper, '此刻').trigger('click')
  await action(wrapper, '确认').trigger('click')
  await flushPromises()
  expect(beforeCommit).toHaveBeenCalledTimes(1)
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  beforeCommit.mockResolvedValue(true)
  await action(wrapper, '确认').trigger('click')
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')).toEqual([['19:45:12']])
  expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
})
