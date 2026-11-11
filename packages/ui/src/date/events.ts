import type { dateEventPayload, DateSelection } from './date-value'
import type { DateShortcut } from './panel-tools-props'

export type DateEventPayload = ReturnType<typeof dateEventPayload>
export type DateChangeArgs = [value: DateSelection, dates: DateEventPayload['dates'], texts: DateEventPayload['texts']]

/** DatePicker / DateRangePicker share this panel-only event contract. */
export type DatePickerEmits = {
  'update:pickerValue': [value: DateSelection]
  'picker-value-change': DateChangeArgs
  'select-shortcut': [shortcut: DateShortcut]
  'update:modelValue': [value: DateSelection]
  change: DateChangeArgs
  select: DateChangeArgs
  confirm: DateChangeArgs
}

export type DateRangePickerEmits = DatePickerEmits

/** Date / DateRange add field focus, clear and popup state requests. */
export type DateEmits = {
  'update:pickerValue': [value: DateSelection]
  'picker-value-change': DateChangeArgs
  'select-shortcut': [shortcut: DateShortcut]
  'update:modelValue': [value: DateSelection]
  'update:open': [open: boolean]
  change: DateChangeArgs
  select: DateChangeArgs
  clear: []
  click: [event: Event]
  'open-change': [open: boolean]
  focus: []
  blur: []
}

export type DateRangeEmits = DateEmits
