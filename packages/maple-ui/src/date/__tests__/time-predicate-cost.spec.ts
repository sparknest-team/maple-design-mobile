import { computed, ref } from 'vue'
import { expect, it, vi } from 'vitest'
import { dateTimeDisabledPredicates, dateTimeDisabledRules } from '../date-time-rules'
import { useQuickTime } from '../quick-time'

it('checks only quick time candidates and reuses them without losing reactive constraints', () => {
  const locked = ref(false)
  const disabledTime = vi.fn(() => ({ disabledHours: () => (locked.value ? [10] : []) }))
  const rules = dateTimeDisabledPredicates(new Date(2026, 9, 1), { disabledTime })
  const quick = useQuickTime(
    computed(() => '09:00:00'),
    computed(() => rules),
  )
  expect(quick.options.value).toHaveLength(48)
  expect(disabledTime.mock.calls.length).toBeLessThanOrEqual(120)
  const calls = disabledTime.mock.calls.length
  expect(rules.minutes?.(0, 10)).toBe(false)
  expect(disabledTime).toHaveBeenCalledTimes(calls)
  locked.value = true
  expect(quick.options.value).toHaveLength(46)
  expect(rules.hours?.(10)).toBe(true)
})

for (const [zone, date] of [
  ['America/New_York', '2026-03-08T06:30:00Z'],
  ['America/New_York', '2026-11-01T06:30:00Z'],
  ['Australia/Lord_Howe', '2026-10-03T15:45:00Z'],
]) {
  it(`preserves hierarchical DST constraints for ${zone} ${date}`, () => {
    const options = { timeZone: zone }
    const current = new Date(date)
    const predicates = dateTimeDisabledPredicates(current, options)
    const lists = dateTimeDisabledRules(current, options)
    for (const hour of [1, 2, 3]) {
      expect(predicates.hours?.(hour)).toBe(lists.disabledHours?.().includes(hour))
      for (const minute of [0, 15, 30, 59]) {
        expect(predicates.minutes?.(minute, hour)).toBe(lists.disabledMinutes?.(hour).includes(minute))
        expect(predicates.seconds?.(0, hour, minute)).toBe(lists.disabledSeconds?.(hour, minute).includes(0))
      }
    }
  })
}

it('uses the selected hour and minute when wheel callbacks omit them', () => {
  const rules = dateTimeDisabledPredicates(new Date(2026, 9, 1, 9, 15), {
    disabledTime: () => ({
      disabledMinutes: (hour) => (hour === 9 ? [20] : []),
      disabledSeconds: (hour, minute) => (hour === 9 && minute === 15 ? [30] : []),
    }),
  })
  expect(rules.minutes?.(20)).toBe(true)
  expect(rules.minutes?.(20, 10)).toBe(false)
  expect(rules.seconds?.(30)).toBe(true)
  expect(rules.seconds?.(30, 9, 16)).toBe(false)
})
