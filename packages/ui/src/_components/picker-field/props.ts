import type { InputHTMLAttributes, PropType } from 'vue'
import { fieldDecoratorProps } from '../../field-decorator/props'
import { openTriggerTargetProp } from './open-trigger'

export type RangeInputAttributes = InputHTMLAttributes & {
  [Key in keyof InputHTMLAttributes as Key extends `on${string}` ? `${Key}Once` : never]?: InputHTMLAttributes[Key]
}

export const rangeInputAttrsProp = { type: Array as PropType<RangeInputAttributes[]>, default: undefined }

export const pickerFieldProps = {
  popupId: String,
  inputAttrs: rangeInputAttrsProp,
  openTriggerTarget: openTriggerTargetProp,
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
