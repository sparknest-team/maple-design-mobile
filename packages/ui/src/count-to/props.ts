import type { ExtractPropTypes, PropType } from 'vue'

const isFiniteInput = (value: string | number) => Number.isFinite(typeof value === 'string' ? parseFloat(value) : value)

export const countToProps = {
  /**
   * 起始值
   */
  from: {
    type: [String, Number],
    default: 0,
    validator: isFiniteInput,
  },
  /**
   * 目标值
   */
  to: {
    type: [String, Number],
    default: 0,
    validator: isFiniteInput,
  },
  /**
   * 动画持续时间（毫秒）；有限非负值，0 或非法值在下一帧完成
   */
  duration: {
    type: [String, Number],
    default: 2000,
    validator: (value: string | number) => {
      const duration = typeof value === 'string' ? parseFloat(value) : value
      return Number.isFinite(duration) && duration >= 0
    },
  },
  /**
   * 十进制精度：[-292, 292] 整数；小数/非有限值回退为 0，越界整数钳制到边界
   */
  precision: {
    type: [String, Number],
    default: 0,
    validator: (value: string | number) => {
      const precision = typeof value === 'string' ? parseFloat(value) : value
      return Number.isInteger(precision) && precision >= -292 && precision <= 292
    },
  },
  /**
   * 是否自动开始播放动画
   */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /**
   * 动画缓动函数；每次 reset 读取，当前播放与暂停续播保持已有函数
   */
  timingFunction: {
    type: Function as PropType<(v: number) => number>,
  },
}

export type CountToProps = import('../_utils/public-props').CompatiblePublicProps<typeof countToProps>

export interface CountToSlots {
  default?: (scope: { value: number }) => import('vue').VNodeChild
}
export type CountToEmits = { end: [] }
export interface CountToExpose {
  start: () => void
  pause: () => void
  reset: () => void
}
