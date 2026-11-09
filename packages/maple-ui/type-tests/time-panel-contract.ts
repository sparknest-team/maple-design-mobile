import type { TimePickerEmits, TimePickerSlots, TimeRangePickerEmits, TimeRangePickerSlots } from '@maple-design/ui'
import type { TimePickerEmits as SubSingle } from '@maple-design/ui/time'
import type { TimeRangePickerEmits as SubRange } from '@maple-design/ui/time-range'

export const single: TimePickerEmits['confirm'] = ['09:30:00', undefined]
export const range: TimeRangePickerEmits['confirm'] = [['09:30:00', '10:30:00'], undefined]
export const sub: SubSingle['confirm'] = single
export const subRange: SubRange['confirm'] = range
// @ts-expect-error Internal initialization is not a business notification API.
export const internal: TimePickerEmits['draft-initialize'] = '09:30:00'
export const singleSlots: TimePickerSlots = {
  extra: () => 'Extra',
  actions: (scope) => {
    const valid: boolean = scope.confirm()
    return String(valid && scope.canConfirm)
  },
}
export const rangeSlots: TimeRangePickerSlots = {
  actions: (scope) => {
    const values: (string | number | Date | undefined)[] | undefined = scope.value
    return String(values)
  },
}
// @ts-expect-error A panel does not have a field read slot.
export const invalid: TimePickerSlots = { read: () => 'Read' }
// @ts-expect-error Mobile single panel does not expose the desktop range mode.
export const invalidArray: TimePickerEmits['confirm'] = [['09:30:00'], undefined]
export const now: TimePickerSlots = { actions: (scope) => String(scope.selectNow() && !scope.nowDisabled) }
export const rangeNow: TimeRangePickerSlots = { actions: (scope) => String(scope.selectNow() && !scope.nowDisabled) }
