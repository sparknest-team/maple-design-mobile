import { type ExtractPropTypes, type PropType } from 'vue'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerTextAlign = 'start' | 'center' | 'end'
export type DividerType = 'dashed' | 'dotted' | 'solid' | 'double'
export type DividerSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DividerSize = number | string | Array<number | string>

export const dividerProps = {
  /**
   * 沿分割线方向的两端缩进：水平时为左右，竖直时为上下；数值按 px，数组按 [start, end]。
   */
  inset: {
    type: [Number, String, Array] as PropType<DividerSize>,
  },
  /**
   * 垂直于分割线方向的外间距：水平时为上下，竖直时为左右；数值按 px，数组按 [start, end]。
   */
  spacing: {
    type: [Number, String, Array] as PropType<DividerSize>,
    default: 'md',
  },
  /**
   * 分割线方向
   */
  orientation: {
    type: String as PropType<DividerOrientation>,
    default: 'horizontal',
  },
  /**
   * 文字位置（有描述内容时生效）
   */
  textAlign: {
    type: String as PropType<DividerTextAlign>,
    default: 'center',
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
  },
  /**
   * 是否将主题线宽缩放为一半（默认主题下为 0.5px）
   */
  hairline: Boolean,
  /**
   * 线宽（单位 px；同时设置时 hairline 优先）
   */
  thickness: Number,
  /**
   * 分割线颜色
   */
  color: String,
  /**
   * 整个分割线（含文字）的不透明度，范围 0–1；0 保留布局
   */
  opacity: Number,
}

export const props = dividerProps

export type DividerProps = import('vue').ExtractPublicPropTypes<typeof dividerProps>
