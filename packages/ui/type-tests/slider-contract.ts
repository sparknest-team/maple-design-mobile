import type { SliderExpose, SliderProps, SliderSlots, SliderValue } from '@maple-design/ui-vue'
import type { SliderSlots as SubSlots } from '@maple-design/ui-vue/slider'

export const props: SliderProps = { modelValue: null, orientation: 'vertical', showTooltip: 'always' }
export const slots: SliderSlots = {
  read: ({ value, text }) => text + String(value),
  button: ({ currentValue, index }) => String(currentValue + index),
}
export const sub: SubSlots = slots
export function methods(instance: SliderExpose) {
  instance.focus(1)
  instance.blur()
}
export const value: SliderValue = [0, 1e-13]
// @ts-expect-error Invalid orientations remain rejected.
export const invalid: SliderProps = { orientation: 'diagonal' }
