import type { ExtractPropTypes, PropType } from 'vue'

export type StepsDirection = 'horizontal' | 'vertical'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

export const props = {
  /**
   * 当前步骤数（受控，从 1 起计）
   */
  current: Number,
  /**
   * 默认的步骤数（非受控，从 1 起计）
   */
  defaultCurrent: {
    type: Number,
    default: 1,
  },
  /**
   * 步骤条的显示方向
   */
  direction: {
    type: String as PropType<StepsDirection>,
    default: 'horizontal',
  },
  /**
   * 当前步骤的状态
   */
  status: {
    type: String as PropType<StepStatus>,
    default: 'process' as StepStatus,
  },
  /**
   * 是否可以点击切换步骤
   */
  changeable: {
    type: Boolean,
    default: false,
  },
  /**
   * 步骤数发生改变时触发
   */
  /**
   * v-model:current
   */
}

export type StepsProps = ExtractPropTypes<typeof props>
