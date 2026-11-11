import { defineComponent, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useTimePanel, type TimePanelOptions, type TimePanelValue } from '../use-time-panel'

function setup(initial: TimePanelOptions<TimePanelValue> = {}, range = false) {
  const options = reactive(initial)
  const events = { select: vi.fn(), change: vi.fn(), confirm: vi.fn() }
  let panel!: ReturnType<typeof useTimePanel<TimePanelValue>>
  const wrapper = mount(
    defineComponent({
      setup() {
        panel = useTimePanel<TimePanelValue>(options, events, () => range)
        return () => h('div')
      },
    }),
  )
  return { options, events, panel, wrapper }
}

describe('copied time panel controller', () => {
  it('stages an initial candidate without notifying selection and commits only on confirmation', () => {
    const { panel, events, wrapper } = setup({ format: 'HH:mm', min: '09:00', max: '10:00' })
    try {
      expect(panel.initialize('08:30')).toBe(false)
      expect(panel.initialize('09:30')).toBe(true)
      expect(panel.draft.value).toBe('09:30')
      expect(panel.canConfirm.value).toBe(true)
      expect(events.select).not.toHaveBeenCalled()
      expect(events.change).not.toHaveBeenCalled()
      expect(panel.confirm()).toBe(true)
      expect(events.change).toHaveBeenCalledWith('09:30', expect.anything())
    } finally {
      wrapper.unmount()
    }
  })

  it.each(['readonly', 'disabled'] as const)(
    'does not commit a pending single draft when toggling %s and immediate mode',
    async (flag) => {
      const { panel, options, events, wrapper } = setup({ defaultValue: '09:30', format: 'HH:mm' })
      try {
        panel.select('10:30')
        options[flag] = true
        options.disableConfirm = true
        await nextTick()
        expect(panel.draft.value).toBe('10:30')
        expect(panel.confirm()).toBe(false)
        expect(panel.select('12:30')).toBe(false)
        expect(events.change).not.toHaveBeenCalled()
        expect(events.confirm).not.toHaveBeenCalled()
        options[flag] = false
        await nextTick()
        expect(panel.draft.value).toBe('10:30')
        expect(events.change).not.toHaveBeenCalled()
        panel.select('11:30')
        expect(events.change).toHaveBeenCalledTimes(1)
        expect(events.confirm).toHaveBeenCalledTimes(1)
        expect(events.change.mock.calls[0][0]).toBe('11:30')
      } finally {
        wrapper.unmount()
      }
    },
  )

  it.each(['readonly', 'disabled'] as const)(
    'does not commit a pending range draft when toggling %s and immediate mode',
    async (flag) => {
      const { panel, options, events, wrapper } = setup({ defaultValue: ['09:30', '18:00'], format: 'HH:mm' }, true)
      try {
        panel.select(['10:30', '18:00'])
        options[flag] = true
        options.disableConfirm = true
        await nextTick()
        expect(panel.draft.value).toEqual(['10:30', '18:00'])
        expect(panel.confirm()).toBe(false)
        expect(panel.select(['12:30', '18:00'])).toBe(false)
        expect(events.change).not.toHaveBeenCalled()
        expect(events.confirm).not.toHaveBeenCalled()
        options[flag] = false
        await nextTick()
        expect(panel.draft.value).toEqual(['10:30', '18:00'])
        expect(events.change).not.toHaveBeenCalled()
        panel.select(['11:30', '18:00'])
        expect(events.change).toHaveBeenCalledTimes(1)
        expect(events.confirm).toHaveBeenCalledTimes(1)
        expect(events.change.mock.calls[0][0]).toEqual(['11:30', '18:00'])
      } finally {
        wrapper.unmount()
      }
    },
  )

  it('keeps drafts separate and reports successful unchanged confirmations', () => {
    const { panel, events, wrapper } = setup({ defaultValue: '09:00', format: 'HH:mm' })
    panel.select('10:30')
    expect(events.select).toHaveBeenCalledTimes(1)
    expect(events.change).not.toHaveBeenCalled()
    expect(panel.confirm()).toBe(true)
    expect(events.change.mock.calls[0][0]).toBe('10:30')
    expect(events.change.mock.calls[0][1]).toBeInstanceOf(Date)
    expect(panel.confirm()).toBe(true)
    expect(events.change).toHaveBeenCalledTimes(1)
    expect(events.confirm).toHaveBeenCalledTimes(2)
    expect(events.confirm.mock.calls[1][0]).toBe('10:30')
    expect(events.confirm.mock.calls[1][1]).toBeInstanceOf(Date)
    wrapper.unmount()
  })

  it('checks current rules including step before committing', () => {
    const { panel, options, events, wrapper } = setup({ format: 'HH:mm', defaultValue: '09:00' })
    panel.select('10:15')
    options.step = { minute: 30 }
    expect(panel.canConfirm.value).toBe(false)
    expect(panel.confirm()).toBe(false)
    expect(events.change).not.toHaveBeenCalled()
    expect(events.confirm).not.toHaveBeenCalled()
    expect(panel.select('10:30')).toBe(true)
    options.disabledHours = () => [10]
    expect(panel.confirm()).toBe(false)
    wrapper.unmount()
  })

  it('does not mutate defaults, emit on external updates or resurrect invalid controlled values', async () => {
    const original = new Date(2026, 8, 23, 9, 0)
    const { panel, options, events, wrapper } = setup({ defaultValue: original, format: 'HH:mm' })
    expect(panel.draft.value).not.toBe(original)
    options.defaultValue = '11:00'
    expect(panel.draft.value).toEqual(original)
    options.modelValue = 'invalid'
    await nextTick()
    expect(panel.canConfirm.value).toBe(false)
    expect(panel.draft.value).toBe('invalid')
    options.modelValue = '12:30'
    await nextTick()
    expect(panel.draft.value).toBe('12:30')
    expect(events.select).not.toHaveBeenCalled()
    expect(events.change).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it.each([false, true])('allows editing drafts and validates overnight ranges, next day=%s', (showNextDay) => {
    const { panel, events, wrapper } = setup({ format: 'HH:mm', showNextDay }, true)
    panel.select(['18:00', undefined])
    expect(panel.canConfirm.value).toBe(false)
    expect(panel.confirm()).toBe(false)
    panel.select(['18:00', '09:00'])
    expect(events.select.mock.calls[1][0]).toEqual(['18:00', '09:00'])
    expect(panel.canConfirm.value).toBe(showNextDay)
    expect(panel.confirm()).toBe(showNextDay)
    if (showNextDay) {
      expect(events.change.mock.calls[0][0]).toEqual(['18:00', '09:00'])
    } else {
      expect(events.change).not.toHaveBeenCalled()
    }
    wrapper.unmount()
  })

  it('commits immediate selections only and blocks readonly/disabled interactions', () => {
    const { panel, options, events, wrapper } = setup({ format: 'HH:mm', disableConfirm: true })
    panel.select('10:00')
    expect(events.change).toHaveBeenCalledTimes(1)
    options.readonly = true
    expect(panel.select('11:00')).toBe(false)
    expect(panel.confirm()).toBe(false)
    options.readonly = false
    options.disabled = true
    expect(panel.select('12:00')).toBe(false)
    expect(events.select).toHaveBeenCalledTimes(1)
    expect(events.confirm).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('keeps instances independent even with the same default array', () => {
    const defaultValue = ['09:00', '18:00']
    const first = setup({ defaultValue, format: 'HH:mm' }, true)
    const second = setup({ defaultValue, format: 'HH:mm' }, true)
    first.panel.select(['10:00', '19:00'])
    first.panel.confirm()
    expect(second.panel.draft.value).toEqual(defaultValue)
    expect(defaultValue).toEqual(['09:00', '18:00'])
    expect(second.events.change).not.toHaveBeenCalled()
    first.wrapper.unmount()
    second.wrapper.unmount()
  })
})
