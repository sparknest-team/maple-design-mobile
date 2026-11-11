import { describe, expect, it } from 'vitest'
import { getTimeChoices, isTimeAllowed } from '../time-rules'

describe('time step candidates', () => {
  it('uses midnight-anchored hour steps and separate minute/second steps', () => {
    const rules = { step: { hour: 5, minute: 15, second: 10 }, useSeconds: true }
    const result = getTimeChoices('13:22:17', rules)
    expect(result.columns[0]).toEqual([0, 5, 10, 15, 20])
    expect(result.columns[1]).toEqual([0, 15, 30, 45])
    expect(result.value).toBe('15:15:20')
    expect(isTimeAllowed('15:15:20', rules)).toBe(true)
    expect(isTimeAllowed('15:16:20', rules)).toBe(false)
  })
  it('intersects steps, bounds and disabled values', () => {
    const rules = { min: '10:10', max: '10:40', step: { minute: 15 }, disabledMinutes: () => [15] }
    expect(getTimeChoices('10:10', rules).value).toBe('10:30')
    expect(getTimeChoices('10:10', { ...rules, max: '10:20' }).value).toBeUndefined()
  })
  it('normalizes invalid and fractional steps', () => {
    expect(getTimeChoices('10:20', { step: { hour: 0, minute: -1, second: Infinity } }).value).toBe('10:20')
    expect(getTimeChoices('10:21', { step: { minute: 2.9 } }).value).toBe('10:20')
  })
})
