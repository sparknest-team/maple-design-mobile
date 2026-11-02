import type { EmptyValue } from '../utils/empty-value'
import type { DateRules } from './date-rules'
import type { DateSelection } from './date-value'
import type { DateWeekStart } from './panel-props'
import type { DateShortcut, DateShortcutsPosition } from './panel-tools-props'

export interface DatePanelOptions extends DateRules {
  emptyValue?: EmptyValue<DateSelection>
  interactiveMode?: import('./calendar-viewport-props').CalendarInteractiveMode
  useVirtualScroll?: boolean
  dayStartOfWeek?: DateWeekStart
  abbreviation?: boolean
  showCurrent?: boolean
  showNowButton?: boolean
  exchangeTime?: boolean
  shortcuts?: DateShortcut[]
  shortcutsPosition?: DateShortcutsPosition
  previewShortcut?: boolean
  pickerValue?: DateSelection
  defaultPickerValue?: DateSelection
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
  pickerValue?: DateSelection
  range: boolean
  canConfirm: boolean
}
