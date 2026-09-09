import { VNode, VNodeChild, type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps } from '../picker'
import { popupProps } from '../popup'
import { type TriggerPlacement } from '../trigger'
import { pickProps } from '../utils/components'
import { type FieldNames } from '../utils/options'
import { popupContainerProp } from '../utils/popup-container'

export type SelectProps = import('vue').ExtractPublicPropTypes<typeof props>

export type SelectPresentation = 'menu' | 'picker' | 'list'

export type SelectTextAlign = 'left' | 'right' | 'center'

export type SelectOptionLabelRender = (option: SelectOption, checked: boolean) => VNodeChild

export type SelectOptionLabel = string | VNode | SelectOptionLabelRender

export interface SelectOption {
  label?: SelectOptionLabel
  value?: any
  disabled?: boolean

  [key: PropertyKey]: any
}

export const props = {
  /** 下拉菜单是否与触发框等宽；false 时按内容自适应。 */
  autoFitPopupWidth: { type: Boolean, default: true },
  popupContainer: popupContainerProp,
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<any>,
    default: undefined,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  fieldNames: {
    type: Object as PropType<FieldNames>,
    default: undefined,
  },
  presentation: {
    type: String as PropType<SelectPresentation>,
    default: 'menu',
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  pickerProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof pickerProps>>>,
    default: () => ({}),
  },
  popupProps: {
    type: Object as PropType<Partial<ExtractPropTypes<typeof popupProps>> & { cover?: boolean }>,
    default: () => ({}),
  },
  multiple: Boolean,
  offsetY: {
    type: [String, Number],
    default: 0,
  },
  placement: String as PropType<TriggerPlacement>,
  tag: Boolean,
  readonly: Boolean,
  separator: {
    type: String,
    default: ',',
  },
  textAlign: {
    type: String as PropType<SelectTextAlign>,
    default: 'left',
  },
  ...pickProps(fieldDecoratorProps, [
    'size',
    'variant',
    'placeholder',
    'line',
    'hint',
    'textColor',
    'focusColor',
    'blurColor',
    'disabled',
    'clearable',
  ]),
}
