import { type PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'
import { isPanelDuration, isPanelHeight } from './normalize'

export const props = {
  /** 当前停靠高度（px），通过 v-model 绑定。 */
  modelValue: { type: Number, validator: isPanelHeight },
  /** 非受控初始高度，仅创建时读取。 */
  defaultValue: { type: Number, default: 100, validator: isPanelHeight },
  anchors: { type: Array as PropType<number[]>, validator: (value: number[]) => value.every(isPanelHeight) },
  contentDraggable: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 300,
    validator: isPanelDuration,
  },
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  popupContainer: popupContainerProp,
  safeArea: Boolean,
}
