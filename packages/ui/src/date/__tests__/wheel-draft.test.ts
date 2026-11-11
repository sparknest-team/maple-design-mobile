import { expect, it } from 'vitest'
import { dateWheelDraft } from '../wheel-draft'

const now = new Date(2026, 9, 26, 14, 30, 0)
it('stages only missing values and preserves the existing model representation', () => {
  expect(dateWheelDraft([], {}, true, now)).toEqual(['2026-10-26', '2026-10-26'])
  expect(dateWheelDraft([], { valueFormat: 'timestamp' }, true, now)).toEqual([now.getTime(), now.getTime()])
  const existing = ['2026-09-10', '2026-09-20']
  expect(dateWheelDraft(existing, {}, true, now)).toBe(existing)
  expect(dateWheelDraft(['2026-09-10'], {}, true, now)).toEqual(['2026-09-10', '2026-09-10'])
})
it('clamps initial candidates to date-time bounds and honors the selected time zone', () => {
  expect(dateWheelDraft([], { min: '2027-01-01' }, true, now)).toEqual(['2027-01-01', '2027-01-01'])
  expect(dateWheelDraft([], { max: '2026-01-01' }, true, now)).toEqual(['2026-01-01', '2026-01-01'])
  const instant = new Date('2026-10-26T02:00:00Z')
  expect(dateWheelDraft([], { timeZone: 'America/Los_Angeles' }, true, instant)).toEqual(['2026-10-25', '2026-10-25'])
})
it('does not manufacture locked endpoints or accept prohibited defaults', () => {
  const options = { disabled: [true, false] }
  expect(dateWheelDraft(['2026-09-10'], options, true, now)).toEqual(['2026-09-10', '2026-09-10'])
  expect((dateWheelDraft([], options, true, now) as unknown[])[0]).toBeUndefined()
  expect(dateWheelDraft([], { disabledDate: () => true }, true, now)).toEqual([])
  expect(dateWheelDraft([], { min: 'invalid' }, true, now)).toEqual([])
})
