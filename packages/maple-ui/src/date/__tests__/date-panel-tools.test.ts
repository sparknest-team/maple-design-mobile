import { nextTick, reactive } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import type { DatePanelOptions } from '../panel-state'
import { useDatePanelTools } from '../use-date-panel-tools'

function setup(extra: DatePanelOptions = {}, range = false) {
  const options = reactive<DatePanelOptions>({
    defaultPickerValue: range ? ['2025-01-01', '2025-02-01'] : '2025-01-01',
    ...extra,
  })
  const select = vi.fn(() => true)
  const onShortcut = vi.fn()
  const onNavigate = vi.fn()
  const tools = useDatePanelTools({
    options: () => options,
    range: () => range,
    value: () => '2025-01-15',
    blocked: () => Boolean(options.readonly || options.disabled === true),
    valid: () => true,
    select,
    onShortcut,
    onNavigate,
  })
  return { options, tools, select, onShortcut, onNavigate }
}

describe('date panel tools', () => {
  it('previews lazily without selecting and restores the draft', async () => {
    const { tools, select, onShortcut } = setup()
    const value = vi.fn(() => '2025-02-01')
    expect(value).not.toHaveBeenCalled()
    tools.preview({ label: 'next', value })
    expect(tools.displayValue.value).toBe('2025-02-01')
    expect(select).not.toHaveBeenCalled()
    expect(onShortcut).not.toHaveBeenCalled()
    tools.endPreview()
    await nextTick()
    expect(tools.displayValue.value).toBe('2025-01-15')
  })
  it('normalizes shortcut formats and emits only after accepted selection', () => {
    const { tools, select, onShortcut } = setup()
    const shortcut = { label: 'date', value: '02/03/2025', format: 'DD/MM/YYYY' }
    expect(tools.choose(shortcut)).toBe(true)
    expect(select).toHaveBeenCalledWith('2025-03-02')
    expect(onShortcut).toHaveBeenCalledWith(shortcut)
    select.mockReturnValue(false)
    expect(tools.choose(shortcut)).toBe(false)
    expect(onShortcut).toHaveBeenCalledTimes(1)
  })
  it('rejects invalid, disabled, out of bounds and throwing shortcuts', () => {
    const { options, tools, select } = setup({ max: '2025-01-31' })
    for (const shortcut of [
      { label: 'invalid', value: 'broken' },
      { label: 'disabled', value: '2025-01-02', disabled: true },
      { label: 'late', value: '2025-02-01' },
      {
        label: 'throws',
        value: () => {
          throw new Error('source unavailable')
        },
      },
    ]) {
      expect(tools.choose(shortcut)).toBe(false)
    }
    options.readonly = true
    expect(tools.choose({ label: 'valid', value: '2025-01-02' })).toBe(false)
    expect(select).not.toHaveBeenCalled()
  })
  it('keeps navigation separate from selection and honors rejected controlled updates', () => {
    const { options, tools, select, onNavigate } = setup({ pickerValue: '2025-01-01' })
    expect(tools.navigate('2025-02-01')).toBe(true)
    expect(tools.pickerValue.value).toBe('2025-01-01')
    expect(onNavigate).toHaveBeenCalledWith('2025-02-01')
    expect(select).not.toHaveBeenCalled()
    options.pickerValue = '2025-02-01'
    expect(tools.pickerValue.value).toBe('2025-02-01')
    expect(tools.navigate('2025-02-01')).toBe(false)
  })
  it('reads default viewport only once and isolates instances', () => {
    const first = setup()
    const second = setup()
    first.options.defaultPickerValue = '2026-01-01'
    expect(first.tools.pickerValue.value).toBe('2025-01-01')
    first.tools.navigate('2025-03-01')
    expect(first.tools.pickerValue.value).toBe('2025-03-01')
    expect(second.tools.pickerValue.value).toBe('2025-01-01')
  })
  it('requires two valid viewport endpoints for a range', () => {
    const { tools } = setup({}, true)
    expect(tools.navigate('2025-03-01')).toBe(false)
    expect(tools.navigate(['2025-03-01', 'broken'])).toBe(false)
    expect(tools.navigate(['2025-03-01', '2025-04-01'])).toBe(true)
    expect(tools.pickerValue.value).toEqual(['2025-03-01', '2025-04-01'])
  })
  it('disables preview independently from selection', () => {
    const { tools } = setup({ previewShortcut: false })
    const shortcut = { label: 'next', value: '2025-02-01' }
    tools.preview(shortcut)
    expect(tools.displayValue.value).toBe('2025-01-15')
    expect(tools.choose(shortcut)).toBe(true)
  })
})
