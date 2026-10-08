import type { PropType } from 'vue'
import { fieldDecoratorProps } from '../../field-decorator/props'

export const pickerFieldProps = {
  ...fieldDecoratorProps,
  texts: { type: Array as PropType<string[]>, default: () => [] },
  placeholders: { type: Array as PropType<string[]>, default: () => [] },
  disabledParts: { type: Array as PropType<boolean[]>, default: () => [] },
  range: Boolean,
  endHint: String,
  editable: Boolean,
  open: Boolean,
  kind: { type: String as PropType<'date' | 'time'>, default: 'date' },
  popupRole: {
    type: String as PropType<'dialog' | 'grid' | 'listbox'>,
    default: 'dialog',
  },
  separator: { type: String, default: ' ~ ' },
}
