import { type PropType } from 'vue'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'

export type PickerColumnOption = {
  text?: string | number
  value?: string | number
  children?: PickerColumnOption[]
  className?: string
  textClassName?: string

  [key: PropertyKey]: any
}

export const props = {
  modelValue: { type: Array as PropType<(string | number)[]>, default: undefined },
  /** 非受控初始选中值，仅创建时读取。 */
  defaultValue: { type: Array as PropType<(string | number)[]>, default: () => [] },
  columns: {
    type: Array as PropType<PickerColumnOption[] | PickerColumnOption[][]>,
    default: () => [],
  },
  title: String,
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  toolbar: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  selectedValues: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  cascade: Boolean,
  optionHeight: {
    type: [Number, String],
    default: 44,
  },
  optionCount: {
    type: [Number, String],
    default: 6,
  },
  columnsCount: [String, Number],
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonTextColor: String,
  cancelButtonTextColor: String,
  // dynamic internal
  dynamic: Boolean,
  ...pickProps(popupProps, ['open', 'defaultOpen', 'overlayClosable', 'escToClose', 'popupContainer']),
  safeArea: Boolean,
}
