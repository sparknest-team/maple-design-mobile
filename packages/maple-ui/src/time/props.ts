import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { pickProps } from '../utils/components'
import { popupContainerProp } from '../utils/popup-container'
import { timeDisabledProps } from './disabled-props'
import { props as timePickerPropsSource } from './picker-props'
import type {
  TimePanelPresentationProps,
  TimePopupPresentationProps,
  TimeWheelPresentationProps,
} from './presentation-props'
import { timeStepProp } from './step-prop'
import type { TimeValue } from './time-value'

export type TimePresentation = 'clock' | 'picker'

export const props = {
  /** 是否允许手输时间；移动端默认关闭，面板选择不受影响。 */
  inputEditable: { type: Boolean, default: false },
  /** 隐藏禁用的时间选项；时钟保留刻度角度。 */
  hideDisabledOptions: Boolean,
  /** 有效选择后立即提交并关闭，不显示确认按钮。 */
  disableConfirm: Boolean,
  popupContainer: popupContainerProp,
  /** 非受控初始值，仅在初始化读取。 */
  defaultValue: [String, Number, Date] as PropType<TimeValue>,
  modelValue: {
    type: [String, Number, Date] as PropType<TimeValue>,
    default: undefined,
  },
  /** 非受控初始展开状态。 */
  defaultOpen: Boolean,
  open: {
    type: Boolean,
    default: undefined,
  },
  presentation: {
    type: String as PropType<TimePresentation>,
    default: 'picker',
  },
  /** 字符串解析、显示及输出格式；默认 HH:mm:ss。 */
  format: String,
  /** 使用十二小时面板；未传 format 时默认 hh:mm:ss a。 */
  use12Hours: Boolean,
  step: timeStepProp,
  min: String,
  max: String,
  ...timeDisabledProps,
  timePickerProps: {
    type: Object as PropType<TimePanelPresentationProps<Partial<ExtractPropTypes<typeof timePickerPropsSource>>>>,
    default: () => ({}),
  },
  pickerProps: {
    type: Object as PropType<TimeWheelPresentationProps<Partial<ExtractPropTypes<typeof pickerPropsSource>>>>,
    default: () => ({}),
  },
  popupProps: {
    type: Object as PropType<TimePopupPresentationProps<Partial<ExtractPropTypes<typeof popupProps>>>>,
    default: () => ({}),
  },
  /** 错误状态；undefined 继承 Form，显式 false 覆盖。 */
  error: { type: Boolean, default: undefined },
  readonly: Boolean,
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
  variant: { ...fieldDecoratorProps.variant, default: 'standard' },
}

export type TimeProps = import('vue').ExtractPublicPropTypes<typeof props>
