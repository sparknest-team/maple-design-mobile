import { type ExtractPublicPropTypes, type PropType } from 'vue'
import { componentSizes, orientations, type ComponentSize, type Orientation } from '../utils/constants'

export type DividerOrientation = Orientation
export type DividerTextAlign = 'start' | 'center' | 'end'
export type DividerType = 'dashed' | 'dotted' | 'solid' | 'double'
export type DividerSizePreset = ComponentSize
export type DividerSize = number | string | [number | string] | [number | string, number | string]

export const dividerTextAligns = ['start', 'center', 'end'] as const
export const dividerTypes = ['dashed', 'dotted', 'solid', 'double'] as const

export const isValidDividerThickness = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 1
export const isValidDividerOpacity = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1

/** Validate structure, leaving CSS expression parsing to the browser. */
export function isValidDividerSize(value: unknown): value is DividerSize {
  const length = (item: unknown): boolean => {
    if (typeof item === 'number') {
      return Number.isFinite(item)
    }
    if (typeof item !== 'string' || !item.trim() || componentSizes.includes(item.trim() as ComponentSize)) {
      return false
    }
    return !/^[+-]?(?:Infinity|NaN)$/.test(item.trim()) && (Number.isNaN(Number(item)) || Number.isFinite(Number(item)))
  }
  if (Array.isArray(value)) {
    return (value.length === 1 || value.length === 2) && Array.from(value).every(length)
  }
  return (typeof value === 'string' && componentSizes.includes(value.trim() as ComponentSize)) || length(value)
}

export function resolveDividerSize(value: unknown, fallback?: DividerSize): DividerSize | undefined {
  return isValidDividerSize(value) ? (typeof value === 'string' ? value.trim() : value) : fallback
}

export const dividerProps = {
  /**
   * 沿分割线方向的两端缩进：水平时为左右，竖直时为上下；数值按 px，数组按 [start, end]。
   */
  inset: {
    type: [Number, String, Array] as PropType<DividerSize>,
    validator: process.env.NODE_ENV !== 'production' ? isValidDividerSize : undefined,
  },
  /**
   * 垂直于分割线方向的外间距：水平时为上下，竖直时为左右；数值按 px，数组按 [start, end]。
   */
  spacing: {
    type: [Number, String, Array] as PropType<DividerSize>,
    validator: process.env.NODE_ENV !== 'production' ? isValidDividerSize : undefined,
    default: 'md',
  },
  /**
   * 分割线方向
   */
  orientation: {
    type: String as PropType<DividerOrientation>,
    default: 'horizontal',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown) => orientations.includes(value as Orientation)
        : undefined,
  },
  /**
   * 文字位置（有描述内容时生效）
   */
  textAlign: {
    type: String as PropType<DividerTextAlign>,
    default: 'center',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown) => dividerTextAligns.includes(value as DividerTextAlign)
        : undefined,
  },
  /**
   * 文字描述（无 default slot 时生效）
   */
  description: String,
  /**
   * 线型
   */
  type: {
    type: String as PropType<DividerType>,
    default: 'solid',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown) => dividerTypes.includes(value as DividerType)
        : undefined,
  },
  /**
   * 是否将主题线宽缩放为一半（默认主题下为 0.5px）
   */
  hairline: Boolean,
  /**
   * 线宽（有限数且至少 1，单位 px；同时设置时 hairline 优先）
   */
  thickness: {
    type: Number,
    validator: process.env.NODE_ENV !== 'production' ? isValidDividerThickness : undefined,
  },
  /**
   * 分割线颜色
   */
  color: String,
  /**
   * 整个分割线（含文字）的不透明度，范围 0–1；0 保留布局
   */
  opacity: {
    type: Number,
    validator: process.env.NODE_ENV !== 'production' ? isValidDividerOpacity : undefined,
  },
}

export const props = dividerProps

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>
