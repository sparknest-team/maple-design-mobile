import type { ExtractPropTypes, PropType } from 'vue'

export type SkeletonSize = number | string

export const props = {
  /** 是否展示骨架屏 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 是否开启流光动画 */
  animation: { type: Boolean, default: true },
  /** 是否展示标题占位 */
  title: { type: Boolean, default: false },
  /** 是否展示卡片占位 */
  card: { type: Boolean, default: false },
  /** 是否展示头像占位 */
  avatar: { type: Boolean, default: false },
  /** 是否展示全屏占位 */
  fullscreen: { type: Boolean, default: false },
  fullscreenZIndex: {
    type: [Number, String] as PropType<SkeletonSize>,
    default: 100,
  },
  /** 标题占位宽度 */
  titleWidth: [Number, String] as PropType<SkeletonSize>,
  /** 卡片占位高度 */
  cardHeight: [Number, String] as PropType<SkeletonSize>,
  /** 头像占位尺寸 */
  avatarSize: [Number, String] as PropType<SkeletonSize>,
  rows: {
    type: [Number, String] as PropType<SkeletonSize>,
    default: 3,
  },
  rowsWidth: {
    type: Array as PropType<SkeletonSize[]>,
    default: () => [],
  },
}

export const skeletonProps = props

export const skeletonLineProps = {
  /** 展示的行数 */
  rows: { type: Number, default: 1 },
  /** 各行宽度 */
  widths: { type: Array as PropType<SkeletonSize[]>, default: () => [] },
  /** 行高 */
  lineHeight: { type: Number, default: 20 },
  /** 行间距 */
  lineSpacing: { type: Number, default: 15 },
}

export const skeletonShapeTypes = ['square', 'circle'] as const
export const skeletonShapeSizes = ['sm', 'md', 'lg'] as const
export type SkeletonShapeType = (typeof skeletonShapeTypes)[number]
export type SkeletonShapeSize = (typeof skeletonShapeSizes)[number]

export const skeletonShapeProps = {
  /** 图形形状 */
  shape: { type: String as PropType<SkeletonShapeType>, default: 'square' },
  /** 图形尺寸 */
  size: { type: String as PropType<SkeletonShapeSize>, default: 'md' },
}

export type SkeletonProps = import('../_utils/public-props').CompatiblePublicProps<typeof skeletonProps>
export type SkeletonLineProps = import('../_utils/public-props').CompatiblePublicProps<typeof skeletonLineProps>
export type SkeletonShapeProps = import('../_utils/public-props').CompatiblePublicProps<typeof skeletonShapeProps>
