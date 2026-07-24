import type { ExtractPropTypes, PropType } from 'vue'
import type { StepStatus } from '../steps/props'

export const props = {
  /**
   * 步骤的标题
   */
  title: String,
  /**
   * 步骤的描述信息
   */
  description: String,
  /**
   * 步骤的状态（覆盖自动推导）
   */
  status: {
    type: String as PropType<StepStatus>,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
}

export type StepProps = ExtractPropTypes<typeof props>
