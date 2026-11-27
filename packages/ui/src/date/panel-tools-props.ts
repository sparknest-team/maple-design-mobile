import type { PropType, VNode } from 'vue'

export interface DateShortcut {
  label: string | number | (() => VNode)
  value:
    | Date
    | string
    | number
    | (Date | string | number | null | undefined)[]
    | null
    | undefined
    | (() => Date | string | number | (Date | string | number | null | undefined)[] | null | undefined)
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
  pickerValue: [String, Number, Date, Array] as PropType<
    Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  >,
  /** 仅初始化读取；未提供时优先使用已选值，然后当前日期。 */
  defaultPickerValue: [String, Number, Date, Array] as PropType<
    Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  >,
}
