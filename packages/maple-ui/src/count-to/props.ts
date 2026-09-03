import type { ExtractPropTypes, PropType } from 'vue'

export const countToProps = {
  /**
   * 起始值
   */
  from: {
    type: [String, Number],
    default: 0,
  },
  /**
   * 目标值
   */
  to: {
    type: [String, Number],
    default: 0,
  },
  /**
   * 动画持续时间（毫秒）
   */
  duration: {
    type: [String, Number],
    default: 2000,
  },
  /**
   * 小数精度
   */
  precision: {
    type: [String, Number],
    default: 0,
  },
  /**
   * 是否自动开始播放动画
   */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /**
   * 动画缓动函数
   */
  timingFunction: {
    type: Function as PropType<(v: number) => number>,
  },
}

export type CountToProps = ExtractPropTypes<typeof countToProps>
