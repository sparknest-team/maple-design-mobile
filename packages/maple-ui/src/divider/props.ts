import { type ExtractPropTypes, type PropType } from 'vue'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerTextAlign = 'start' | 'center' | 'end'
export type DividerType = 'dashed' | 'dotted' | 'solid' | 'double'
export type DividerSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type DividerSize = number | string | Array<number | string>

export const dividerProps = {
  /**
   * 水平方向缩进 / 垂直方向时的上下间距
   */
  sizeX: {
    type: [Number, String, Array] as PropType<DividerSize>,
  },
  /**
   * 水平方向上下间距 / 垂直方向时的左右间距
   */
  sizeY: {
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
   * 是否为 0.5px 线
   */
  hairline: Boolean,
  /**
   * 线宽（与 hairline 互斥，hairline 优先）
   */
  thickness: Number,
  /**
   * 分割线颜色
   */
  color: String,
  /**
   * 分割线不透明度
   */
  opacity: Number,
}

export const props = dividerProps

export type DividerProps = ExtractPropTypes<typeof dividerProps>
