import type { PropType, VNodeChild } from 'vue'
import { fieldDecoratorProps } from '../../field-decorator/props'
import type { TagProps } from '../../tag/props'
import { openTriggerTargetProp } from '../picker-field/open-trigger'

/** key identifies the selected value, never its display label. */
export interface SelectionFieldItem {
  key: string | number | symbol
  value: unknown
  label: VNodeChild
  closable?: boolean
  tagProps?: TagProps & Record<string, unknown>
}

export const selectionFieldProps = {
  openTriggerTarget: openTriggerTargetProp,
  openTriggerTabIndex: Number,
  ...fieldDecoratorProps,
  items: { type: Array as PropType<SelectionFieldItem[]>, default: () => [] },
  multiple: Boolean,
  showTags: { type: Boolean, default: true },
  separator: { type: String, default: ',' },
  inputValue: { type: String, default: '' },
  searchable: Boolean,
  open: Boolean,
  loading: Boolean,
  maxTagCount: { type: Number, default: 0 },
  tagNowrap: Boolean,
  /** 文字对齐；未设置时继承 FormItem.contentAlign，独立使用默认 left。 */
  textAlign: { type: String as PropType<'left' | 'right' | 'center'> },
}
