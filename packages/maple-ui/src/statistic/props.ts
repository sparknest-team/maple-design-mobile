import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const statisticProps = {
  /**
   * 数值显示的标题
   */
  title: String,
  /**
   * 数值显示的值
   */
  value: {
    type: [Number, String, Object] as PropType<number | string | Date>,
  },
  /**
   * 数值显示的格式，日期模式使用（dayjs）
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * 额外的显示内容
   */
  extra: String,
  /**
   * 数值前缀
   */
  prefix: String,
  /**
   * 数值后缀
   */
  suffix: String,
  /**
   * 是否开始动画
   */
  start: {
    type: Boolean,
    default: true,
  },
  /**
   * 小数保留位数（数字模式使用）
   */
  precision: {
    type: Number,
    default: 0,
  },
  /**
   * 进位分隔符（数字模式使用）
   */
  separator: String,
  /**
   * 是否展示进位分隔符（数字模式使用）
   */
  showGroupSeparator: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否使用等宽数字，避免数值变化时宽度跳动
   */
  tabularNums: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否开启动画
   */
  animation: {
    type: Boolean,
    default: false,
  },
  /**
   * 动画的过渡时间（毫秒）
   */
  animationDuration: {
    type: Number,
    default: 2000,
  },
  /**
   * 动画的起始值
   */
  valueFrom: {
    type: Number,
    default: undefined,
  },
  /**
   * 提示文字（当 value 为 undefined 且未使用默认插槽时显示）
   */
  placeholder: String,
  /**
   * 自定义显示值的样式
   */
  valueStyle: {
    type: Object as PropType<CSSProperties>,
  },
}

export type StatisticProps = ExtractPropTypes<typeof statisticProps>
