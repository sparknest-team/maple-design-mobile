import type { ComputedRef, ExtractPropTypes, Ref } from 'vue'
import type { pickerFieldProps } from '../_components/picker-field/props'
import type { TimeRangeProps } from '../time-range/props'
import type { TimeProps } from './props'
import type { TimeCommitInput } from './time-commit'

export type TimeFieldProps = TimeProps | TimeRangeProps
export type TimeFieldControlProps = Partial<ExtractPropTypes<typeof pickerFieldProps>>

/** Presentation receives the owner's refs; it must never create another model or transaction. */
export interface TimeFieldState {
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  draft: Ref<TimeCommitInput>
  canConfirm: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  controlProps: ComputedRef<TimeFieldControlProps>
  feedback: Ref<string | undefined>
  focus: () => void
  blur: () => void
  click: (event: Event) => void
  clear: () => boolean
  select: (value: TimeCommitInput, commit?: boolean) => boolean
  confirm: (value?: TimeCommitInput) => boolean
  cancel: () => void
  commitText: (value: string[]) => void
}
export interface TimeFieldContentProps {
  fieldProps: TimeFieldProps
  range: boolean
  rootClass?: string
  state: TimeFieldState
}
