import type { RateCharacterSlotProps, RateInstance, RateReadScope, RateSlots } from '@maple-design/ui-vue'
import type { RateReadScope as SubRead, RateSlots as SubSlots } from '@maple-design/ui-vue/rate'

export const read: RateReadScope = { value: null, text: '' }
export const subRead: SubRead = read
export const character: RateCharacterSlotProps = { index: 1, value: 2, active: false }
export const slots: RateSlots = {
  read: ({ value, text }) => text + String(value),
  character: ({ active }) => String(active),
}
export const sub: SubSlots = slots
export function methods(instance: RateInstance) {
  instance.focus()
  instance.blur()
}
// @ts-expect-error Rate read values are numeric, not arrays.
export const wrong: RateReadScope = { value: [], text: '' }
