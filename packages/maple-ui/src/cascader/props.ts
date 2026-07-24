import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps } from '../picker'
import { popupProps } from '../popup'
import { defineListenerProp, pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'

export type CascaderPresentation = 'menu' | 'picker' | 'list'

export interface CascaderOption {
  label?: string
  value?: any
  disabled?: boolean
  children?: CascaderOption[]

  [key: PropertyKey]: any
}

export const props = {
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<any>,
    default: undefined,
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  childrenKey: {
    type: String,
    default: 'children',
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  presentation: {
    type: String as PropType<CascaderPresentation>,
    default: 'menu',
  },
  show: {
    type: Boolean,
    default: undefined,
  },
  multiple: Boolean,
  checkStrictly: Boolean,
  pathMode: {
    type: Boolean,
    default: true,
  },
  expandTrigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  filterable: Boolean,
  clearable: Boolean,
  placeholder: String,
  tag: Boolean,
  separator: {
    type: String,
    default: ',',
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  pickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof pickerProps>>>,
    default: () => ({}),
  },
  popupProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>>>,
    default: () => ({}),
  },
  loading: Boolean,
  readonly: Boolean,
  onFocus: defineListenerProp<() => void>(),
  onBlur: defineListenerProp<() => void>(),
  onClose: defineListenerProp<(value: any) => void>(),
  onChange: defineListenerProp<(value: any) => void>(),
  onClear: defineListenerProp<(value: any) => void>(),
  'onUpdate:modelValue': defineListenerProp<(value: any) => void>(),
  'onUpdate:show': defineListenerProp<(show: boolean) => void>(),
  ...pickProps(fieldDecoratorProps, [
    'size',
    'variant',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'disabled',
    'onClick',
  ]),
}

export type CascaderProps = ExtractPropTypes<typeof props>
