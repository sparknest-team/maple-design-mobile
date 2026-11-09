import type { Component, PropType, VNodeChild } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { emptyValueProp } from '../utils/empty-value'
import { validRateCount } from './count'

export type RateColor = string | Record<string, string>
export type RateIcon = string | Component

export const rateProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<number>(),
  /** 评分控件的无障碍名称。 */
  ariaLabel: String,
  /** 受控评分，零值有效。 */
  modelValue: { type: Number as PropType<number | null>, default: undefined },
  /** 非受控初始评分。 */
  defaultValue: { type: Number, default: 0 },
  /** 评分总数，0 < count <= 1000，向下取整且至少一颗；非法值回退 5。 */
  count: {
    type: [String, Number],
    default: 5,
    validator: validRateCount,
  },
  /** 选中颜色或按分值阈值分段的颜色。 */
  color: [String, Object] as PropType<RateColor>,
  /** 选中图标，支持注册名或组件。 */
  icon: [String, Object, Function] as PropType<RateIcon>,
  /** 未选中图标。 */
  emptyIcon: [String, Object, Function] as PropType<RateIcon>,
  /** 半选图标。 */
  halfIcon: [String, Object, Function] as PropType<RateIcon>,
  /** 未选中颜色。 */
  emptyColor: String,
  /** 图标尺寸，数字为 px，字符串为 CSS 长度；不支持尺寸档位。 */
  size: [String, Number],
  /** 图标间距，允许零；数字为 px，字符串为 CSS 长度。 */
  gap: [String, Number],
  /** 允许半分。 */
  allowHalf: Boolean,
  /** 禁用；未指定时继承表单。 */
  disabled: { type: Boolean, default: undefined },
  /** 禁用时图标颜色。 */
  disabledColor: String,
  /** 只读且可聚焦；未指定时继承表单。 */
  readonly: { type: Boolean, default: undefined },
  /** 启用点击水波纹。 */
  ripple: { type: Boolean, default: true },
  /** 重复点击当前评分时清空；不影响键盘边界行为。 */
  clearable: Boolean,
  /** 使用固定五级表情评分。 */
  grading: Boolean,
}

export const props = rateProps
export type RateProps = import('vue').ExtractPublicPropTypes<typeof rateProps>

export interface RateExpose {
  focus: () => void
  blur: () => void
}

export interface RateCharacterSlotProps {
  index: number
  value: number
  /** True only for a fully selected symbol; partial selection uses the half wrapper class. */
  active: boolean
}

export interface RateEmits {
  'update:modelValue': (value: number | null) => void
  change: (value: number | null) => void
  'hover-change': (value: number | null) => void
}

export interface RateReadScope {
  value: number | null | undefined
  text: string
}
export interface RateSlots {
  character?: (scope: RateCharacterSlotProps) => VNodeChild
  read?: (scope: RateReadScope) => VNodeChild
}
