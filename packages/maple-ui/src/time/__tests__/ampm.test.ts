import { describe, expect, it } from 'vitest'
import { formatTimeLabel, getTimePickerChange, getTimePickerState } from '../picker-columns'

describe('AM/PM wheel adapter', () => {
  it('distinguishes midnight and noon', () => {
    expect(formatTimeLabel('12:30 AM', { format: 'hh:mm A' })).toBe('12:30 AM')
    expect(formatTimeLabel('12:30 PM', { format: 'hh:mm A' })).toBe('12:30 PM')
    expect(formatTimeLabel('01:30:20 PM', { format: 'hh:mm:ss A' })).toBe('01:30:20 PM')
    expect(getTimePickerState('12:30 AM', { format: 'hh:mm A' }).value).toEqual(['12', '30', 'am'])
    expect(getTimePickerState('12:30 PM', { format: 'hh:mm A' }).value).toEqual(['12', '30', 'pm'])
    expect(getTimePickerChange(['12', '30', 'am'], { format: 'hh:mm A' })).toBe('12:30 AM')
    expect(getTimePickerChange(['12', '30', 'pm'], { format: 'hh:mm A' })).toBe('12:30 PM')
  })
  it('uses actual hours for disabled callbacks and period changes', () => {
    const rules = {
      hideDisabledOptions: true,
      format: 'hh:mm A',
      min: '13:00',
      max: '17:00',
      disabledMinutes: (hour?: number) => (hour === 13 ? [30] : []),
    }
    expect(getTimePickerState('01:30 PM', rules).columns[2]).toEqual([{ text: 'PM', value: 'pm', disabled: false }])
    expect(getTimePickerChange(['01', '30', 'pm'], rules)).toBe('01:29 PM')
    expect(getTimePickerChange(['01', '30', 'am'], rules)).toBeUndefined()
  })
  it('combines seconds and steps with formatted model values', () => {
    expect(
      getTimePickerChange(['03', '16', '22', 'pm'], {
        format: 'hh:mm:ss A',
        step: { minute: 15, second: 10 },
      }),
    ).toBe('03:15:20 PM')
    expect(getTimePickerState('03:15:20 PM', { format: 'hh:mm:ss A' }).value).toEqual(['03', '15', '20', 'pm'])
    expect(getTimePickerChange(['12', '00', 'invalid'], { format: 'hh:mm A' })).toBeUndefined()
  })
})
