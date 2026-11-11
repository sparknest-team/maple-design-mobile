import { createApp } from 'vue'
import {
  Picker,
  type PickerColumnOption,
  type PickerEmits,
  type PickerOptions,
  type PickerResolvedData,
  type PickerResolvedState,
  type PickerSlots,
} from '@maple-design/ui-vue'
import type { PickerOptions as SubOptions } from '@maple-design/ui-vue/picker'

export const option: PickerColumnOption = { text: 'A', value: 'a', disabled: true }
export const options: PickerOptions = {
  columns: [[option]],
  disabled: false,
  selectedValues: ['a'],
  defaultValue: ['a'],
  popupContainer: false,
}
export const sub: SubOptions = options
export const state: PickerResolvedState = 'confirm'
export const event: PickerEmits['confirm'] = [['a'], [0], [option]]
export const slots: PickerSlots = { title: () => 'Choose', confirm: () => 'Confirm' }
// @ts-expect-error Service owns its open state.
export const badOpen: PickerOptions = { open: true }
// @ts-expect-error Service owns its rendering mode.
export const badDynamic: PickerOptions = { dynamic: true }
// @ts-expect-error Toolbar slots are unscoped.
export const badSlot: PickerSlots = { title: (scope: { value: string }) => scope.value }
export function result(value: PickerResolvedData) {
  if (value.state === 'confirm') {
    return value.values?.map(String)
  }
  return []
}
export function component(value: InstanceType<typeof Picker.Component>) {
  value.confirm()
  value.cancel()
}

createApp({}).use(Picker.Component)

createApp({}).use(Picker)
Picker.setPropsDefaults({ toolbar: false })
