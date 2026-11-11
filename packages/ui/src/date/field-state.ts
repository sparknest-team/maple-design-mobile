import type { ComputedRef, ExtractPropTypes, Ref } from 'vue'
import type { pickerFieldProps } from '../_components/picker-field/props'
import type { DateRangeProps } from '../date-range/props'
import type { DateSelection } from './date-value'
import type { DateProps } from './props'

export type DateFieldProps = DateProps | DateRangeProps
export type DateFieldControlProps = Partial<ExtractPropTypes<typeof pickerFieldProps>>
export interface DateFieldState {
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  draft: Ref<DateSelection>
  canConfirm: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  disabledParts: ComputedRef<boolean[]>
  controlProps: ComputedRef<DateFieldControlProps>
  feedback: Ref<string | undefined>
  focus: () => void
  blur: () => void
  click: (event: Event) => void
  clear: () => boolean
  initialize: (value: DateSelection) => boolean
  select: (value: DateSelection, commit?: boolean) => boolean
  confirm: (value?: DateSelection) => boolean
  cancel: () => void
  commitText: (value: string[]) => void
}
export interface DateFieldContentProps {
  fieldProps: DateFieldProps
  range: boolean
  rootClass?: string
  state: DateFieldState
}
