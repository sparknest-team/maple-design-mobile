import { type ButtonHTMLAttributes, type ExtractPropTypes, type PropType } from 'vue'
import { loadingProps } from '../loading'
import { defineListenerProp, pickProps } from '../utils/components'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

/**
 * 按钮主题色（与 Cedar Design Web 对齐的 Status 集合）
 */
/**
 * 按钮变体
 */
export type ButtonVariant = 'default' | 'text' | 'outline' | 'tonal'

/**
 * 按钮尺寸
 */
export const buttonProps = {
  /**
   * 按钮主题色
   */
  status: String as PropType<SemanticStatus>,
  /**
   * 按钮变体
   */
  variant: String as PropType<ButtonVariant>,
  /**
   * 按钮尺寸
   */
  size: String as PropType<ComponentSize>,
  /**
   * 原生按钮类型：button | submit | reset
   */
  htmlType: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  /**
   * 渲染的根标签
   */
  component: {
    type: String as PropType<'button' | 'a'>,
    default: 'button',
  },
  /**
   * 是否为加载中状态
   */
  loading: Boolean,
  /**
   * 是否为圆角胶囊形按钮
   */
  round: Boolean,
  /**
   * 是否占满父容器宽度
   */
  block: Boolean,
  /**
   * 是否禁用，未显式设置时由父 ButtonGroup 决定
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否堆叠（图标在文字上方）
   */
  stacked: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否自动 loading（onClick 返回 Promise 时自动维持）
   */
  autoLoading: Boolean,
  /**
   * 是否仅作为图标容器（调整内边距）
   */
  iconContainer: Boolean,
  /**
   * 是否启用水波纹（移动端默认开启）
   */
  ripple: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可聚焦（移动端默认开启）
   */
  focusable: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 自定义文字色
   */
  textColor: String,
  /**
   * 海拔阴影：true 默认层级、false 关闭、0..24 数字层级
   */
  elevation: {
    type: [Boolean, Number, String],
    default: true,
  },
  /**
   * loading 指示器圆角半径
   */
  loadingRadius: [Number, String],
  /**
   * loading 指示器类型
   */
  loadingType: pickProps(loadingProps, 'type'),
  /**
   * loading 指示器尺寸
   */
  loadingSize: {
    ...pickProps(loadingProps, 'size'),
    default: undefined,
  },
  /**
   * loading 指示器颜色
   */
  loadingColor: {
    ...pickProps(loadingProps, 'color'),
    default: 'currentColor',
  },

  onClick: defineListenerProp<(e: Event) => void | Promise<any>>(),
  onTouchstart: defineListenerProp<(e: Event) => void | Promise<any>>(),
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
