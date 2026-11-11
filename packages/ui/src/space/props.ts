import type { ExtractPublicPropTypes, PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'

const spaceAligns = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const
const spaceDirections = ['row', 'column'] as const
const spaceJustifies = ['flex-start', 'flex-end', 'center', 'space-around', 'space-between', 'space-evenly'] as const

export type SpaceAlign = (typeof spaceAligns)[number]
export type SpaceDirection = (typeof spaceDirections)[number]
export type SpaceJustify = (typeof spaceJustifies)[number]

export type SpaceInternalSize = ComponentSize

export type SpaceSize = SpaceInternalSize | number | string | [number | string, number | string]

/** Structural validation only: CSS expressions remain browser-owned. */
export function isValidSpaceSize(value: unknown): value is SpaceSize {
  const length = (item: unknown): boolean => {
    if (typeof item === 'number') {
      return Number.isFinite(item) && item >= 0
    }
    if (typeof item !== 'string' || !item.trim() || componentSizes.includes(item.trim() as ComponentSize)) {
      return false
    }
    const numeric = Number(item)
    return Number.isNaN(numeric)
      ? !/^[+-]?(?:Infinity|NaN)$/.test(item.trim())
      : Number.isFinite(numeric) && numeric >= 0
  }
  if (Array.isArray(value)) {
    return value.length === 2 && value.every(length)
  }
  return componentSizes.includes((typeof value === 'string' ? value.trim() : value) as ComponentSize) || length(value)
}

export const spaceProps = {
  /**
   * 间距大小，可选值为 `xs` `sm` `md` `lg` `xl`，也可以传入数字 / 长度单位 / `[rowGap, columnGap]`
   */
  size: {
    type: [String, Number, Array] as PropType<SpaceSize>,
    default: 'md',
    validator: process.env.NODE_ENV !== 'production' ? isValidSpaceSize : undefined,
  },
  /**
   * 是否超出换行
   */
  wrap: {
    type: Boolean,
    default: false,
  },
  /**
   * 布局方向，可选值为 `row` `column`
   */
  direction: {
    type: String as PropType<SpaceDirection>,
    default: 'row',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown) => spaceDirections.includes(value as SpaceDirection)
        : undefined,
  },
  /**
   * 主轴排列方式
   */
  justify: {
    type: String as PropType<SpaceJustify>,
    default: 'flex-start',
    validator:
      process.env.NODE_ENV !== 'production'
        ? (value: unknown) => spaceJustifies.includes(value as SpaceJustify)
        : undefined,
  },
  /**
   * 交叉轴排列方式，未传入时根据 `direction` 推断（`row` → `center`，`column` → `stretch`）
   */
  align: {
    type: String as PropType<SpaceAlign>,
    validator:
      process.env.NODE_ENV !== 'production' ? (value: unknown) => spaceAligns.includes(value as SpaceAlign) : undefined,
  },
  /**
   * 是否撑满父容器宽度（true 使用 `display: flex`，false 使用 `display: inline-flex`）
   */
  block: {
    type: Boolean,
    default: true,
  },
}

export type SpaceProps = ExtractPublicPropTypes<typeof spaceProps>

export const props = spaceProps
