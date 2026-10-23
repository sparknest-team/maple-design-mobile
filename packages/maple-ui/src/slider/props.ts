import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import type { Orientation } from '../utils/constants'

export type SliderValue = number | [number, number]
export type SliderOrientation = Orientation
export type SliderTooltipFormatter = (value: number) => string | number
export type SliderTooltipVisibility = boolean | 'always'
export const sliderProps = {
  ...fieldPresentationProps,
  /** 受控值；range 时为升序二元组 */
  modelValue: [Number, Array] as PropType<SliderValue>,
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
  orientation: { type: String as PropType<SliderOrientation>, default: 'horizontal' },
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
  showTooltip: { type: [Boolean, String] as PropType<SliderTooltipVisibility>, default: true },
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
  'update:modelValue': [value: SliderValue]
  change: [value: SliderValue]
  start: []
  end: [value: SliderValue]
}
export interface SliderSlots {
  button?: (props: { currentValue: number; index: number }) => VNodeChild
}
export interface SliderExpose {
  focus: (index?: number) => void
  blur: () => void
}
