import { expect, test } from 'vitest'
import { outputDateValue, parseDateValue } from '../date-value'

test('round trips date/month string models without returning Date objects', () => {
  for (const [value, valueFormat] of [
    ['2026-09-10', 'YYYY-MM-DD'],
    ['2026-09', 'YYYY-MM'],
  ] as const) {
    const parsed = parseDateValue(value, { valueFormat })!
    expect(parsed.isValid()).toBe(true)
    expect(outputDateValue(parsed.toDate(), { valueFormat })).toBe(value)
  }
})
test('month/day ranges return the backend payload array directly', () => {
  const values = ['09-10', '10-10']
  const dates = values.map((value) => parseDateValue(value, { valueFormat: 'MM-DD' })!)
  expect(dates.every((date) => date.isValid())).toBe(true)
  expect(dates[0].year()).toBe(new Date().getFullYear())
  expect(dates.map((date) => outputDateValue(date.toDate(), { valueFormat: 'MM-DD' }))).toEqual(values)
})
