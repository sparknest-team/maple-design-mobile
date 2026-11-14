import type { PropType } from 'vue'
import type { Orientation } from '../utils/constants'
import type { LabelPositionType, ModeType } from './types'

export const timelineProps = {
  /**
   * @zh 是否倒序
   * @en Whether reverse order
   */
  reverse: {
    type: Boolean,
  },
  /**
   * @zh 时间轴方向
   * @en Timeline orientation
   * @values 'horizontal', 'vertical'
   */
  orientation: {
    type: String as PropType<Orientation>,
    default: 'vertical',
    validator: (value: Orientation) => ['vertical', 'horizontal'].includes(value),
  },
  /**
   * @zh 时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。
   * @en The display mode of Timeline
   * @values 'left','right','top','bottom','alternate'
   */
  mode: {
    type: String as PropType<ModeType>,
    default: 'left',
    validator: (value: ModeType) => ['left', 'right', 'top', 'bottom', 'alternate'].includes(value),
  },
  /**
   * @zh 追加待完成节点；true 无文案，字符串显示为节点内容。
   * @en Append a pending item; true has no text, and a string is displayed as its content.
   */
  pending: {
    type: [Boolean, String],
  },
  /**
   * @zh 设置标签文本的位置
   * @en Position of label text
   * @values 'relative', 'same'
   */
  labelPosition: {
    type: String as PropType<LabelPositionType>,
    default: 'same',
    validator: (value: LabelPositionType) => ['relative', 'same'].includes(value),
  },
}
