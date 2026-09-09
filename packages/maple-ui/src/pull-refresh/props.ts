import { type ExtractPropTypes, type PropType } from 'vue'

export type PullRefreshStatus = 'default' | 'pulling' | 'loosing' | 'loading' | 'success'

export const pullRefreshProps = {
  /**
   * 是否处于刷新加载中，配合 `v-model` 使用
   */
  modelValue: Boolean,
  /**
   * 是否禁用下拉刷新
   */
  disabled: Boolean,
  /**
   * 回弹到初始位置的动画时长（ms）
   */
  animationDuration: {
    type: [Number, String] as PropType<number | string>,
    default: 300,
  },
  /**
   * 成功状态展示时长（ms）
   */
  successDuration: {
    type: [Number, String] as PropType<number | string>,
    default: 2000,
  },
  /**
   * 指示器背景色
   */
  bgColor: String,
  /**
   * 成功状态指示器背景色
   */
  successBgColor: String,
  /**
   * 指示器颜色
   */
  color: String,
  /**
   * 成功状态指示器颜色
   */
  successColor: String,
  /**
   * 滚动容器，未传入时监听最近的可滚动祖先
   */
  target: [String, Object] as PropType<string | HTMLElement>,
}

export type PullRefreshProps = import('vue').ExtractPublicPropTypes<typeof pullRefreshProps>
