import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps } from '../picker'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'
import { popupContainerProp } from '../utils/popup-container'

export type CascaderPresentation = 'menu' | 'picker' | 'list'

export interface CascaderOption {
  label?: string
  value?: any
  disabled?: boolean
  children?: CascaderOption[]

  [key: PropertyKey]: any
}

export const props = {
  popupContainer: popupContainerProp,
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<any>,
    default: undefined,
  },
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  presentation: {
    type: String as PropType<CascaderPresentation>,
    default: 'menu',
  },
  open: {
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
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>> & { cover?: boolean }>,
    default: () => ({}),
  },
  loading: Boolean,
  readonly: Boolean,
  ...pickProps(fieldDecoratorProps, [
    'size',
    'variant',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'disabled',
  ]),
}

export type CascaderProps = import('vue').ExtractPublicPropTypes<typeof props>
