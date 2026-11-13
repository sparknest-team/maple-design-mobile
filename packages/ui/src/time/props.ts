import { type ExtractPropTypes, type PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { timePickerFieldsProp } from '../_components/picker-field/fields'
import { openTriggerTargetProp } from '../_components/picker-field/open-trigger'
import { fieldDecoratorProps, fieldLoadingProps } from '../field-decorator'
import { props as pickerPropsSource } from '../picker/props'
import { triggerProps } from '../trigger'
import { pickProps } from '../utils/components'
import { emptyValueProp } from '../utils/empty-value'
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

export type TimeEditMode = import('../_components/field-presentation/context').FieldEditMode

export const props = {
  ...fieldLoadingProps,
  openTriggerTarget: openTriggerTargetProp,
  timeFields: timePickerFieldsProp,
  /** 清空动作产生的模型值；省略保留原默认值。 */
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<string | number | Date | undefined>(),
  /** 显示此刻按钮；此刻仅更新草稿，仍需确认。 */
  showNowButton: timePickerPropsSource.showNowButton,
  /** 是否允许手输时间；移动端默认关闭，面板选择不受影响。 */
  inputEditable: { type: Boolean, default: false },
  /** 隐藏禁用的时间选项。 */
  hideDisabledOptions: Boolean,
  /** 有效选择后立即提交并关闭，不显示确认按钮。 */
  disableConfirm: Boolean,
  popupContainer: popupContainerProp,
  /** 非受控初始值，仅在初始化读取。 */
  defaultValue: [String, Number, Date] as PropType<TimeValue>,
  modelValue: {
    type: [String, Number, Date] as PropType<TimeValue | null>,
    default: undefined,
  },
  /** 非受控初始展开状态。 */
  defaultOpen: Boolean,
  open: {
    type: Boolean,
    default: undefined,
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
    type: Object as PropType<TimePopupPresentationProps<Partial<ExtractPropTypes<typeof triggerProps>>>>,
    default: () => ({}),
  },
  /** 错误状态；undefined 继承 Form，显式 false 覆盖。 */
  error: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
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
  disabled: { type: Boolean, default: undefined },
  variant: { ...fieldDecoratorProps.variant, default: 'outline' },
}

export type TimeProps = import('../_utils/public-props').CompatiblePublicProps<typeof props>
