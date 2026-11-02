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
   * 动态名称切换动画时长（毫秒，仅支持数值或数字字符串）
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

export type IconProps = InstanceType<(typeof import('./Icon.vue'))['default']>['$props']

export const props = iconProps
