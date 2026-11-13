import type { PropType, VNodeChild } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import type { Orientation } from '../utils/constants'
import { emptyValueProp } from '../utils/empty-value'

export type SliderValue = number | [number, number]
export type SliderOrientation = Orientation
export type SliderTooltipFormatter = (value: number) => string | number
export type SliderTooltipVisibility = boolean | 'always'
export const sliderProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<SliderValue>(),
  /** 受控值；range 时为升序二元组 */
  modelValue: [Number, Array] as PropType<SliderValue | null>,
  /** 非受控初始值 */
  defaultValue: { type: [Number, Array] as PropType<SliderValue>, default: 0 },
  /** 正有限步长，非法值回退 1；按 min 对齐 */
  step: { type: [Number, String], default: 1 },
  /** 最小值 */
  min: { type: [Number, String], default: 0 },
  /** 最大值，max <= min 时不可交互 */
  max: { type: [Number, String], default: 100 },
  /** 位置到文字的映射 */
  marks: Object as PropType<Record<number, string>>,
  /** 整体朝向 */
  orientation: {
    type: String as PropType<SliderOrientation>,
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value),
  },
  /** 未传时继承表单禁用状态 */
  disabled: { type: Boolean, default: undefined },
  /** 未传时继承表单只读状态 */
  readonly: { type: Boolean, default: undefined },
  /** 未传时继承表单错误状态 */
  error: { type: Boolean, default: undefined },
  /** 显示步长刻度，最多 1000 个 */
  showTicks: Boolean,
  /** 显示 InputNumber 数字输入 */
  showInput: Boolean,
  /** 双端范围，低端与高端不可交叉 */
  range: Boolean,
  /** 提示和 aria-valuetext 的格式化 */
  formatTooltip: Function as PropType<SliderTooltipFormatter>,
  /** true 在悬浮/聚焦/拖动时显示；false 隐藏；always 常驻 */
  showTooltip: {
    type: [Boolean, String] as PropType<SliderTooltipVisibility>,
    default: true,
    validator: (value: unknown) => typeof value === 'boolean' || value === 'always',
  },
  /** 单滑块名称；范围可传两个名称 */
  ariaLabel: [String, Array] as PropType<string | [string, string]>,
  /** 已选轨道颜色 */
  activeColor: String,
  /** 背景轨道颜色 */
  trackColor: String,
  /** 拇指颜色 */
  thumbColor: String,
  /** 提示背景颜色 */
  labelColor: String,
  /** 提示文字颜色 */
  labelTextColor: String,
  /** 轨道厚度，数字为 px */
  trackHeight: [Number, String],
  /** 拇指直径，数字为 px */
  thumbSize: [Number, String],
}
export type SliderProps = ExtractPublicPropTypes<typeof sliderProps>

export interface SliderEmits {
  'update:modelValue': [value: SliderValue | null]
  change: [value: SliderValue | null]
  start: []
  end: [value: SliderValue]
}
export interface SliderSlots {
  read?: (scope: { value: SliderValue | null | undefined; text: string }) => VNodeChild
  button?: (props: { currentValue: number; index: number }) => VNodeChild
}
export interface SliderExpose {
  /** Focus the displayed thumb at index; defaults to the first thumb. */
  focus: (index?: number) => void
  /** Blur the currently focused owned element, including numeric inputs. */
  blur: () => void
}
