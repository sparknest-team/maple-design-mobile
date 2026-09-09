import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  /**
   * 已显式注册到当前 Vue 应用的图标名称
   */
  name: String,
  /**
   * 图标尺寸
   */
  size: [Number, String],
  /**
   * 图标颜色
   */
  color: String,
  /**
   * 旋转角度
   */
  rotate: Number,
  /**
   * 是否持续旋转
   */
  spin: Boolean,
  /**
   * 动态名称切换动画时长
   */
  transition: {
    type: [Number, String],
    default: 0,
  },
  /**
   * 自定义动态切换动画类名
   */
  animationClass: String,
}

export type ComponentProps = import('vue').ExtractPublicPropTypes<typeof iconProps>

export const props = iconProps
