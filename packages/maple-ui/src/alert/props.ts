import type { ExtractPropTypes, PropType } from 'vue'

/** Alert 类型，对齐 Status 状态色 + default 中性色 */
export type AlertType = 'info' | 'success' | 'warning' | 'danger' | 'default'

/** Alert 视觉变体 */
export type AlertVariant = 'tonal' | 'outlined' | 'standard'

export const alertProps = {
  /** 类型，决定状态色与默认图标 */
  type: {
    type: String as PropType<AlertType>,
    default: 'info',
  },
  /** 视觉变体 */
  variant: {
    type: String as PropType<AlertVariant>,
    default: 'standard',
  },
  /** 自定义背景色（覆盖 type 派生背景） */
  color: String,
  /** 标题（也可用 #title 插槽） */
  title: String,
  /** 内容（也可用默认插槽） */
  message: String,
  /** 是否显示关闭按钮 */
  closable: Boolean,
  /** 是否显示左侧图标，默认 true */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /** banner 模式：去除圆角与外边距，常用于页面顶部通栏 */
  banner: Boolean,
  /** 内容是否居中 */
  center: Boolean,
  /** 阴影层级 */
  elevation: {
    type: [Boolean, String, Number],
    default: false,
  },
  /** 关闭点击回调 */
  /** 关闭动画结束后回调 */
}

export type AlertProps = ExtractPropTypes<typeof alertProps>
