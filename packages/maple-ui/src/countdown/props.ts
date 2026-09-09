import type { ExtractPropTypes } from 'vue'

export type TimeData = {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export const countdownProps = {
  /**
   * 倒计时时长（毫秒）
   */
  time: {
    type: [String, Number],
    default: 0,
  },
  /**
   * 展示格式，占位符为 DD / HH / mm / ss / S(SS|SSS)
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * 是否自动开始倒计时
   */
  autoStart: {
    type: Boolean,
    default: true,
  },
}

export type CountdownProps = import('vue').ExtractPublicPropTypes<typeof countdownProps>
