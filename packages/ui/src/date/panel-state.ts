import type { EmptyValue } from '../utils/empty-value'
import type { DateRules } from './date-rules'
import type { DateWeekStart } from './panel-props'
import type { DateShortcut, DateShortcutsPosition } from './panel-tools-props'

export interface DatePanelOptions extends DateRules {
  emptyValue?: EmptyValue<Date | string | number | (Date | string | number | null | undefined)[] | null | undefined>
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
  pickerValue?: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  defaultPickerValue?: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  modelValue?: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  defaultValue?: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  disabled?: boolean | boolean[]
  readonly?: boolean
  multiple?: boolean
  range?: boolean
  disableConfirm?: boolean
}
export interface DatePanelContentProps {
  options: DatePanelOptions
  value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  pickerValue?: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  range: boolean
  canConfirm: boolean
}
