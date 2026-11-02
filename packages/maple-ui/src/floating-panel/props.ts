import { type PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'

export const props = {
  /** 当前停靠高度（px），通过 v-model 绑定。 */
  modelValue: Number,
  /** 非受控初始高度，仅创建时读取。 */
  defaultValue: { type: Number, default: 100 },
  anchors: Array as PropType<number[]>,
  contentDraggable: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 300,
  },
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  popupContainer: popupContainerProp,
  safeArea: Boolean,
}
