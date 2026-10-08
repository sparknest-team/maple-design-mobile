import type { DateRules } from './date-rules'
import type { DateSelection } from './date-value'

export interface DatePanelOptions extends DateRules {
  modelValue?: DateSelection
  defaultValue?: DateSelection
  disabled?: boolean | boolean[]
  readonly?: boolean
  multiple?: boolean
  range?: boolean
  disableConfirm?: boolean
}
export interface DatePanelContentProps {
  options: DatePanelOptions
  value: DateSelection
  range: boolean
  canConfirm: boolean
}
