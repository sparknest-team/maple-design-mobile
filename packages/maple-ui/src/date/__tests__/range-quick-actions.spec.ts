import { defineComponent, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DateRange from '../../date-range'
import DateRangePicker from '../../date-range/DateRangePicker.vue'
import Picker from '../../picker/Picker.vue'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import { currentRangeShortcuts } from '../range-quick-selection'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
const initial = ['2026-10-20 09:30:00', '2026-10-25 18:00:00']
const now = new Date(2026, 9, 22, 10, 45, 12)
function freeze() {
  vi.useFakeTimers()
  vi.setSystemTime(now)
}
function panel(props = {}) {
  const wrapper = mount(DateRangePicker, {
    props: { modelValue: initial, showTime: true, disableConfirm: false, ...props },
  })
  wrappers.push(wrapper)
  return wrapper
}

describe('mobile range quick actions', () => {
  it('builds localized ranges with week start, rolling intervals and public value formats', () => {
    const presets = currentRangeShortcuts({ showTime: true, dayStartOfWeek: 1 }, now)
    expect(presets[0]).toMatchObject({ label: '今天', value: ['2026-10-22 00:00:00', '2026-10-22 10:45:12'] })
    expect(presets[2].value).toEqual(['2026-10-19 00:00:00', '2026-10-22 10:45:12'])
    expect(presets[4].value).toEqual(['2026-10-22 10:30:12', '2026-10-22 10:45:12'])
    expect(currentRangeShortcuts({ showTime: true, valueFormat: 'timestamp' }, now)[1].value).toEqual([
      now.getTime() - 86400000,
      now.getTime(),
    ])
  })
  it('keeps summaries, toggles content, and keeps a fresh preset as a draft until confirmation', async () => {
    freeze()
    const wrapper = panel()
    await wrapper.get('[aria-label="快捷选择"]').trigger('click')
    expect(wrapper.findAll('.mp-date-range-picker__summary')).toHaveLength(2)
    expect(wrapper.find('.mp-date-range-picker__date-content').exists()).toBe(false)
    expect(wrapper.findAll('.mp-date-range-quick-panel__item')).toHaveLength(10)
    vi.setSystemTime(new Date(2026, 9, 22, 11))
    await wrapper.get('.mp-date-range-quick-panel__item').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('confirm')).toBeUndefined()
    await wrapper
      .findAll('button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[['2026-10-22 00:00:00', '2026-10-22 11:00:00']]])
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('select-shortcut')).toHaveLength(1)
  })
  it('returns to the previous editor without modifying the draft', async () => {
    const wrapper = panel()
    await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
    await wrapper.get('[aria-label="快捷选择"]').trigger('click')
    await wrapper.get('[aria-label="返回日期时间选择"]').trigger('click')
    expect(wrapper.find('.mp-date-range-picker__datetime-picker').exists()).toBe(true)
    expect(wrapper.emitted('select')).toBeUndefined()
  })
  it('preserves custom shortcut parsing and blocks out-of-bounds and locked candidates', async () => {
    const wrapper = panel({
      shortcuts: [{ label: '自定义范围', format: 'DD/MM/YYYY HH:mm', value: ['21/10/2026 09:00', '22/10/2026 18:00'] }],
    })
    await wrapper.get('[aria-label="快捷选择"]').trigger('click')
    await wrapper.get('.mp-date-range-quick-panel__item').trigger('click')
    expect(wrapper.emitted('select')?.[0][0]).toEqual(['2026-10-21 09:00:00', '2026-10-22 18:00:00'])
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    const locked = panel({ disabled: [true, false] })
    await locked.get('[aria-label="快捷选择"]').trigger('click')
    expect(
      locked.findAll('.mp-date-range-quick-panel__item').every((item) => item.attributes('disabled') !== undefined),
    ).toBe(true)
    expect(locked.emitted('change')).toBeUndefined()
  })
  it.each([false, true])('now edits only the active date endpoint (showTime=%s)', async (showTime) => {
    freeze()
    const value = showTime ? initial : ['2026-10-20', '2026-10-25']
    const wrapper = panel({ modelValue: value, showTime })
    await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
    await wrapper
      .findAll('button')
      .find((button) => button.text() === '此刻')!
      .trigger('click')
    expect(wrapper.emitted('select')?.[0][0]).toEqual([value[0], showTime ? '2026-10-22 10:45:12' : '2026-10-22'])
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper
      .findAll('button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
  })
  it('now follows the unlocked endpoint when the start is locked', async () => {
    freeze()
    const wrapper = panel({ disabled: [true, false] })
    expect(wrapper.findAll('.mp-date-range-picker__summary')[1].attributes('aria-pressed')).toBe('true')
    const button = wrapper.findAll('button').find((button) => button.text() === '此刻')!
    expect(button.attributes('disabled')).toBeUndefined()
    await button.trigger('click')
    expect(wrapper.emitted('select')?.[0][0]).toEqual([initial[0], '2026-10-22 10:45:12'])
  })
  it('now does not move the opposite endpoint to repair an inverted date range', async () => {
    freeze()
    const wrapper = panel({ modelValue: ['2026-10-23 00:00:00', '2026-10-25 00:00:00'] })
    await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
    const button = wrapper.findAll('button').find((button) => button.text() === '此刻')!
    expect(button.attributes('disabled')).toBeUndefined()
    await button.trigger('click')
    expect(wrapper.emitted('select')?.[0][0]).toEqual(['2026-10-23 00:00:00', '2026-10-22 10:45:12'])
    expect(wrapper.get('[role=alert]').text()).toContain('结束时间不能早于开始时间')
    expect(
      wrapper
        .findAll('button')
        .find((item) => item.text() === '确认')!
        .attributes('disabled'),
    ).toBeDefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  it('time range now follows the last operated wheel and respects formatting', async () => {
    freeze()
    const wrapper = mount(TimeRangePicker, { props: { modelValue: ['09:30 am', '06:00 pm'], format: 'hh:mm a' } })
    wrappers.push(wrapper)
    await wrapper.findAll('[role="listbox"]')[3].trigger('focusin')
    await wrapper.get('[aria-label="结束时间此刻"]').trigger('click')
    expect(wrapper.emitted('select')?.[0][0]).toEqual(['09:30 am', '10:45 am'])
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.getComponent(Picker).props('columns')).toHaveLength(6)
  })
  it('keeps confirmation available after leaving quick view on an immediate standalone panel', async () => {
    const wrapper = panel({ disableConfirm: true })
    await wrapper.get('[aria-label="快捷选择"]').trigger('click')
    await wrapper.get('.mp-date-range-quick-panel__item').trigger('click')
    await wrapper.get('[aria-label="返回日期时间选择"]').trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper
      .findAll('button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
  })
  it('inline disableConfirm commits only the opened endpoint without range presets', async () => {
    const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
    const wrapper = mount(DateRange, {
      props: { editMode: 'direct', open: true, modelValue: initial, showTime: true, disableConfirm: true },
      global: { stubs: { Trigger: Surface, MpTrigger: Surface, teleport: true } },
    })
    wrappers.push(wrapper)
    const initialOpenRequests = wrapper.emitted('update:open')?.length ?? 0
    expect(wrapper.find('[aria-label="快捷选择"]').exists()).toBe(false)
    await wrapper
      .findAll('.mp-day-picker__body button')
      .find((button) => button.text() === '24')!
      .trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['2026-10-24 09:30:00', initial[1]])
    expect(wrapper.emitted('update:open')).toHaveLength(initialOpenRequests + 1)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })
  it('popup endpoint changes use beforeCommit and close only after successful confirmation', async () => {
    // Stub only the floating transport; use the actual editor and session owners.
    const Surface = defineComponent({ template: '<div><slot /><slot name="content" /></div>' })
    const beforeCommit = vi.fn().mockResolvedValue(false)
    const wrapper = mount(DateRange, {
      props: { editMode: 'popup', modelValue: initial, showTime: true, beforeCommit },
      global: { stubs: { Dialog: Surface, Popup: Surface, MpPopup: Surface, teleport: true } },
    })
    wrappers.push(wrapper)
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await nextTick()
    expect(wrapper.find('[aria-label="快捷选择"]').exists()).toBe(false)
    await wrapper
      .findAll('.mp-day-picker__body button')
      .find((button) => button.text() === '24')!
      .trigger('click')
    await flushPromises()
    expect(beforeCommit).not.toHaveBeenCalled()
    await wrapper
      .findAll('.mp-field-presentation__footer > .mp-button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('update:open')).toEqual([[true]])
    beforeCommit.mockResolvedValue(true)
    await wrapper
      .findAll('.mp-field-presentation__footer > .mp-button')
      .find((button) => button.text() === '确认')!
      .trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })
})
