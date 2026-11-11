import type { VNodeChild } from 'vue'
import type { TimePanelPublicEmits } from './panel-emits'
import type { TimeValue } from './time-value'

export type TimePickerEmits = TimePanelPublicEmits<TimeValue>
export type TimeRangePickerEmits = TimePanelPublicEmits<TimeValue[]>
interface PanelActionsScope<Value> {
  confirm: () => boolean
  canConfirm: boolean
  value: Value | undefined
}
interface NowActions {
  selectNow: () => boolean
  nowDisabled: boolean
}
export interface TimePickerSlots {
  extra?: () => VNodeChild
  actions?: (scope: PanelActionsScope<TimeValue> & NowActions) => VNodeChild
}
export interface TimeRangePickerSlots {
  extra?: () => VNodeChild
  actions?: (scope: PanelActionsScope<Array<TimeValue | undefined>> & NowActions) => VNodeChild
}
