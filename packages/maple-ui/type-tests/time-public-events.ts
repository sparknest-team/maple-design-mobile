import type {
  TimeEmits,
  TimeInstance,
  TimeRangeEmits,
  TimeRangeInstance,
  TimeRangeSlots,
  TimeSlots,
} from '@maple-design/ui'
import type { TimeEmits as SubEmits, TimeSlots as SubSlots } from '@maple-design/ui/time'
import type { TimeRangeEmits as SubRangeEmits } from '@maple-design/ui/time-range'

type TimeChange = Parameters<NonNullable<TimeInstance['$props']['onChange']>>[0]
type RangeChange = Parameters<NonNullable<TimeRangeInstance['$props']['onChange']>>[0]
export const empty: TimeChange = null
export const epoch: TimeChange = 0
export const date: TimeChange = new Date()
export const emptyRange: RangeChange = null
export const dates: RangeChange = [new Date(), 0]
export const change: TimeEmits['change'] = [null, undefined]
export const rangeChange: TimeRangeEmits['change'] = [null, undefined]
export const normal: TimeEmits['select'] = ['09:30', new Date()]
export const partial: TimeRangeEmits['select'] = [
  ['09:30', undefined],
  [new Date(), undefined],
]
export const subChange: SubEmits['change'] = change
export const subRange: SubRangeEmits['change'] = rangeChange
export const slots: TimeSlots = {
  read: ({ value, text }) => text + String(value),
  'suffix-icon': ({ focus, popupOpen }) => String(focus || popupOpen),
  'clear-icon': ({ clear }) => {
    clear()
    return ''
  },
}
export const subSlots: SubSlots = slots
export const rangeSlots: TimeRangeSlots = { read: ({ value, text }) => text + String(value), separator: () => 'to' }
// @ts-expect-error Explicit clear is not a normal select notification.
export const invalidSelect: TimeEmits['select'] = [null, undefined]

// @ts-expect-error Mobile Time does not implement a default trigger slot.
export const invalidTrigger: TimeSlots = { default: () => 'unsupported' }
// @ts-expect-error Time has no forwarded loading-icon field slot.
export const invalidLoading: TimeSlots = { 'loading-icon': () => 'unsupported' }
