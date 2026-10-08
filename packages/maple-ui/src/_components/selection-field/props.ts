import type { PropType, VNodeChild } from 'vue'
import { fieldDecoratorProps } from '../../field-decorator/props'
import type { TagProps } from '../../tag/props'

/** key identifies the selected value, never its display label. */
export interface SelectionFieldItem {
  key: string | number | symbol
  value: unknown
  label: VNodeChild
  closable?: boolean
  tagProps?: TagProps & Record<string, unknown>
}

export const selectionFieldProps = {
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
  textAlign: { type: String as PropType<'left' | 'right' | 'center'>, default: 'left' },
}
