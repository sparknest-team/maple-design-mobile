import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import DateRange from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import DatePanelContent from '../../date/presentation/DatePanelContent.vue'
import DateRangePicker from '../DateRangePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = { stubs: { MpTrigger: Surface, teleport: true } }
afterEach(() => vi.useRealTimers())

for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const showTime of [false, true]) {
    it(`${mode} time=${showTime} stages the displayed wheels and confirms without scrolling`, async () => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date(2026, 9, 26, 14, 30, 0))
      const point = showTime ? '2026-10-26 14:30:00' : '2026-10-26'
      const wrapper = mount(mode === 'standalone' ? DateRangePicker : DateRange, {
        props: {
          modelValue: [],
          showTime,
          disableConfirm: false,
          ...(mode === 'standalone' ? { presentation: 'picker' } : { editMode: mode, panelType: 'picker', open: true }),
        },
        global,
      })
      try {
        await flushPromises()
        expect(wrapper.getComponent(DatePanelContent).props('value')).toEqual([point, point])
        expect(wrapper.findAll('.mp-date-range-picker__summary-date').map((item) => item.text())).toEqual([
          '2026-10-26',
          '2026-10-26',
        ])
        expect(wrapper.emitted('select')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        expect(wrapper.emitted('change')).toBeUndefined()
        const confirm = wrapper.findAll('button').find((button) => button.text() === '确认')!
        expect(confirm.attributes('disabled')).toBeUndefined()
        await confirm.trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')).toEqual([[[point, point]]])
        expect(wrapper.emitted('change')).toHaveLength(1)
      } finally {
        wrapper.unmount()
      }
    })
  }
}

it('canceling a wheel default does not write the model and reopening stages a fresh candidate', async () => {
  const wrapper = mount(DateRange, { props: { modelValue: [], panelType: 'picker', editMode: 'popup' }, global })
  try {
    await wrapper.get('[data-field-open-trigger]').trigger('click')
    await flushPromises()
    expect((wrapper.getComponent(DatePanelContent).props('value') as string[]).every(Boolean)).toBe(true)
    wrapper.getComponent(EditorPanel).vm.$emit('cancel')
    await flushPromises()
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('[data-field-open-trigger]').trigger('click')
    await flushPromises()
    expect((wrapper.getComponent(DatePanelContent).props('value') as string[]).every(Boolean)).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

it('keeps an empty calendar range unconfirmable in the hosted footer', async () => {
  const wrapper = mount(DateRange, {
    props: { modelValue: [], editMode: 'popup', panelType: 'calendar', open: true },
    global,
  })
  try {
    await flushPromises()
    const confirm = wrapper.findAll('button').find((button) => button.text() === '确认')!
    expect(confirm.attributes('disabled')).toBeDefined()
    const closeRequests = wrapper.emitted('update:open')?.length ?? 0
    wrapper.getComponent(EditorPanel).vm.$emit('confirm')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('update:open')?.length ?? 0).toBe(closeRequests)
  } finally {
    wrapper.unmount()
  }
})

it('keeps the host beforeCommit guard in control of the staged wheel defaults', async () => {
  const beforeCommit = vi.fn().mockResolvedValue(false)
  const wrapper = mount(DateRange, {
    props: { modelValue: [], editMode: 'popup', panelType: 'picker', open: true, beforeCommit },
    global,
  })
  try {
    await flushPromises()
    const candidate = wrapper.getComponent(DatePanelContent).props('value')
    const confirm = () => wrapper.findAll('button').find((button) => button.text() === '确认')!
    expect(beforeCommit).not.toHaveBeenCalled()
    await confirm().trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(beforeCommit.mock.calls[0][0]).toEqual({ value: candidate, previousValue: [] })
    expect(beforeCommit.mock.calls[0][1]).toBeTypeOf('function')
    expect(beforeCommit.mock.calls[0][2].signal).toBeInstanceOf(AbortSignal)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    beforeCommit.mockResolvedValue(true)
    await confirm().trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[candidate]])
  } finally {
    wrapper.unmount()
  }
})
