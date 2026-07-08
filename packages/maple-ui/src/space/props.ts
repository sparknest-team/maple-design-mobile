import { type ExtractPropTypes, type PropType } from 'vue'

export type SpaceAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

export type SpaceDirection = 'row' | 'column'

export type SpaceJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type SpaceInternalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SpaceSize = SpaceInternalSize | number | string | [number | string, number | string]

export const spaceProps = {
  /**
   * 间距大小，可选值为 `xs` `sm` `md` `lg` `xl`，也可以传入数字 / 长度单位 / `[rowGap, columnGap]`
   */
  size: {
    type: [String, Number, Array] as PropType<SpaceSize>,
    default: 'md',
  },
  /**
   * 是否超出换行
   */
  wrap: {
    type: Boolean,
    default: true,
  },
  /**
   * 布局方向，可选值为 `row` `column`
   */
  direction: {
    type: String as PropType<SpaceDirection>,
    default: 'row',
  },
  /**
   * 主轴排列方式
   */
  justify: {
    type: String as PropType<SpaceJustify>,
    default: 'flex-start',
  },
  /**
   * 交叉轴排列方式，未传入时根据 `direction` 推断（`row` → `center`，`column` → `flex-start`）
   */
  align: {
    type: String as PropType<SpaceAlign>,
  },
  /**
   * 是否撑满父容器宽度（true 使用 `display: flex`，false 使用 `display: inline-flex`）
   */
  block: {
    type: Boolean,
    default: true,
  },
}

export type SpaceProps = ExtractPropTypes<typeof spaceProps>

// 兼容旧导出名
export const props = spaceProps
