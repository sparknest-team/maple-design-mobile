import type { PropType, VNode } from 'vue'
import type { DateSelection } from './date-value'

export interface DateShortcut {
  label: string | number | (() => VNode)
  value: DateSelection | (() => DateSelection)
  /** 快捷值自身的解析格式；输出仍使用顶层 valueFormat。 */
  format?: string
  disabled?: boolean
}
export type DateShortcutsPosition = 'left' | 'bottom' | 'right'

export const datePanelToolsProps = {
  shortcuts: { type: Array as PropType<DateShortcut[]>, default: () => [] },
  shortcutsPosition: { type: String as PropType<DateShortcutsPosition>, default: 'bottom' },
  previewShortcut: { type: Boolean, default: true },
  /** 日历视口，不是选中值；受控模式只提出更新请求。 */
  pickerValue: [String, Number, Date, Array] as PropType<DateSelection>,
  /** 仅初始化读取；未提供时优先使用已选值，然后当前日期。 */
  defaultPickerValue: [String, Number, Date, Array] as PropType<DateSelection>,
}
