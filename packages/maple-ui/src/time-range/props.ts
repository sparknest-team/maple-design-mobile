import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldDecoratorProps } from '../field-decorator'
import { pickerProps as pickerPropsSource } from '../picker'
import { popupProps } from '../popup'
import { timeDisabledProps } from '../time/disabled-props'
import { props as timePickerPropsSource } from '../time/picker-props'
import type {
  TimePanelPresentationProps,
  TimePopupPresentationProps,
  TimeWheelPresentationProps,
} from '../time/presentation-props'
import { timeStepProp } from '../time/step-prop'
import type { TimeValue } from '../time/time-value'
import { pickProps } from '../utils/components'
import { popupContainerProp } from '../utils/popup-container'
import { props as timeRangePickerPropsSource } from './picker-props'

export type TimeRangePresentation = 'clock' | 'picker'

export const props = {
  /** 是否允许手输时间；移动端默认关闭，面板选择不受影响。 */
  inputEditable: { type: Boolean, default: false },
  /** 隐藏禁用的时间选项；时钟保留刻度角度。 */
  hideDisabledOptions: Boolean,
  /** 有效选择后立即提交并关闭，不显示确认按钮。 */
  disableConfirm: Boolean,
  popupContainer: popupContainerProp,
  /** 非受控初始值，仅在初始化读取。 */
  defaultValue: Array as PropType<TimeValue[]>,
  modelValue: {
    type: Array as PropType<TimeValue[]>,
    default: undefined,
  },
  /** 非受控初始展开状态。 */
  defaultOpen: Boolean,
  open: {
    type: Boolean,
    default: undefined,
  },
  presentation: {
    type: String as PropType<TimeRangePresentation>,
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
  separator: {
    type: String,
    default: ' ~ ',
  },
  showNextDay: Boolean,
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
  timeRangePickerProps: {
    type: Object as PropType<TimePanelPresentationProps<Partial<ExtractPropTypes<typeof timeRangePickerPropsSource>>>>,
    default: () => ({}),
  },
  /** 错误状态；undefined 继承 Form，显式 false 覆盖。 */
  error: { type: Boolean, default: undefined },
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
    'clearable',
  ]),
  variant: { ...fieldDecoratorProps.variant, default: 'standard' },
  /** 字符串用于两端；数组分别指定起止占位符，缺项为空。 */
  placeholder: [String, Array] as PropType<string | string[]>,
}

export type TimeRangeProps = import('vue').ExtractPublicPropTypes<typeof props>
