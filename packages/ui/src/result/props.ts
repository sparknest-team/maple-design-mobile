import { type PropType } from 'vue'

export const resultStatuses = [
  'info',
  'success',
  'warning',
  'danger',
  'question',
  'empty',
  '403',
  '404',
  '500',
] as const

export type ResultStatus = (typeof resultStatuses)[number]

export const resultProps = {
  /** 状态图形尺寸；数字表示 px。 */
  imageSize: [String, Number],
  /** 结果状态。 */
  status: {
    type: String as PropType<ResultStatus>,
    default: 'info',
    validator: (value: unknown): value is ResultStatus => resultStatuses.includes(value as ResultStatus),
  },
  /** 标题内容。 */
  title: String,
  /** 副标题内容。 */
  subtitle: String,
  /** 是否启用状态图形动画。 */
  animation: {
    type: Boolean,
    default: true,
  },
}

export const props = resultProps

export type ResultProps = import('vue').ExtractPublicPropTypes<typeof resultProps>
