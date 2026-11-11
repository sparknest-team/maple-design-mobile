import type { VNodeChild } from 'vue'
import type { TimeValue } from './time-value'

/** Normal selections are strings. Explicit clear overrides retain their configured shape. */
export type TimeModelValue = TimeValue | null | undefined
export type TimeRangeModelValue = TimeValue[] | null | undefined
export interface TimeEmits {
  'update:modelValue': [value: TimeModelValue]
  'update:open': [open: boolean]
  change: [value: TimeModelValue, date: Date | undefined]
  select: [value: string | undefined, date: Date | undefined]
  clear: []
  click: [event: Event]
  focus: []
  blur: []
  'open-change': [open: boolean]
}
export interface TimeRangeEmits {
  'update:modelValue': [value: TimeRangeModelValue]
  'update:open': [open: boolean]
  change: [value: TimeRangeModelValue, dates: Array<Date | undefined> | undefined]
  select: [value: Array<string | undefined> | undefined, dates: Array<Date | undefined> | undefined]
  clear: []
  click: [event: Event]
  focus: []
  blur: []
  'open-change': [open: boolean]
}
export interface TimeReadScope {
  value: TimeModelValue
  text: string
}
export interface TimeRangeReadScope {
  value: TimeRangeModelValue
  text: string
}
export interface TimeActionsScope {
  confirm: () => boolean
  canConfirm: boolean
  value: TimeModelValue
}
export interface TimeRangeActionsScope {
  confirm: () => boolean
  canConfirm: boolean
  value: TimeRangeModelValue
}
export interface TimeSuffixIconScope {
  focus: boolean
  popupOpen: boolean
}
/** Shared field slots; actions/extra operate on the panel draft, with mode-specific forwarding. */
export interface TimeSlots {
  extra?: () => VNodeChild
  actions?: (scope: TimeActionsScope) => VNodeChild
  prefix?: () => VNodeChild
  selected?: () => VNodeChild
  suffix?: () => VNodeChild
  'suffix-icon'?: (scope: TimeSuffixIconScope) => VNodeChild
  'clear-icon'?: (scope: { clear: (event?: Event) => void }) => VNodeChild
  read?: (scope: TimeReadScope) => VNodeChild
}
export interface TimeRangeSlots extends Omit<TimeSlots, 'read' | 'actions'> {
  actions?: (scope: TimeRangeActionsScope) => VNodeChild
  separator?: () => VNodeChild
  read?: (scope: TimeRangeReadScope) => VNodeChild
}
export interface TimeExpose {
  focus: (index?: number) => void
  blur: () => void
}
export type TimeRangeExpose = TimeExpose
