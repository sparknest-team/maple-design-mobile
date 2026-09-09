import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../utils/constants'
import type { Orientation } from './platform'

export const STEPS_TYPES = ['default', 'arrow', 'dot', 'navigation'] as const
export type StepsType = (typeof STEPS_TYPES)[number]
export const STEP_STATUSES = ['wait', 'process', 'finish', 'error'] as const
export type StepStatus = (typeof STEP_STATUSES)[number]
export const STEPS_SIZES = ['sm', 'md'] as const
export type StepsSize = Extract<ComponentSize, (typeof STEPS_SIZES)[number]>
export const STEPS_CONTENT_PLACEMENTS = ['right', 'bottom'] as const
export type StepsContentPlacement = (typeof STEPS_CONTENT_PLACEMENTS)[number]

export const stepsProps = {
  /** 步骤条类型 */
  type: {
    type: String as PropType<StepsType>,
    default: 'default' as StepsType,
    validator: (value: unknown): value is StepsType => STEPS_TYPES.includes(value as StepsType),
  },
  /** 排列方向 */
  orientation: {
    type: String as PropType<Orientation>,
    default: 'horizontal' as Orientation,
  },
  /** 内容相对节点的位置 */
  contentPlacement: {
    type: String as PropType<StepsContentPlacement>,
    default: 'right' as StepsContentPlacement,
    validator: (value: unknown): value is StepsContentPlacement =>
      STEPS_CONTENT_PLACEMENTS.includes(value as StepsContentPlacement),
  },
  /** 当前步骤，从 1 开始 */
  current: Number,
  /** 非受控模式的初始步骤 */
  defaultCurrent: { type: Number, default: 1 },
  /** 当前步骤状态 */
  status: {
    type: String as PropType<StepStatus>,
    default: 'process' as StepStatus,
    validator: (value: unknown): value is StepStatus => STEP_STATUSES.includes(value as StepStatus),
  },
  /** 尺寸 */
  size: {
    type: String as PropType<StepsSize>,
    default: 'md' as StepsSize,
    validator: (value: unknown): value is StepsSize => STEPS_SIZES.includes(value as StepsSize),
  },
  /** 是否显示连接线 */
  showLine: { type: Boolean, default: true },
  /** 是否允许点击切换步骤 */
  changeable: { type: Boolean, default: false },
}

const publicStepProps = {
  /** 步骤标题 */
  title: String,
  /** 步骤描述 */
  description: String,
  /** 覆盖自动推导的步骤状态 */
  status: {
    type: String as PropType<StepStatus>,
    validator: (value: unknown): value is StepStatus => STEP_STATUSES.includes(value as StepStatus),
  },
  /** 是否禁用步骤 */
  disabled: { type: Boolean, default: false },
}

export const stepProps = {
  ...publicStepProps,
  /** @internal 由 Steps 注入 */
  internalIndex: { type: Number, default: 0 },
  /** @internal 由 Steps 注入 */
  internalNextStatus: String as PropType<StepStatus>,
}

export type StepsProps = import('vue').ExtractPublicPropTypes<typeof stepsProps>
export type StepProps = import('vue').ExtractPublicPropTypes<typeof publicStepProps>
