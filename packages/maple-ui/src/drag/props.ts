import { type PropType } from 'vue'
import { popupContainerProp } from '../utils/popup-container'
import { isDragAxis, isDragBoundary } from './normalize'

export type DragAxis = 'x' | 'y' | 'xy'

export type DragAttraction = 'x' | 'y' | 'xy'

export interface DragBoundary {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
}

export const props = {
  axis: {
    type: String as PropType<DragAxis>,
    default: 'xy',
    validator: isDragAxis,
  },
  attraction: { type: String as PropType<DragAttraction>, validator: isDragAxis },
  disabled: Boolean,
  boundary: {
    type: Object as PropType<DragBoundary>,
    validator: isDragBoundary,
    default: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  },
  zIndex: {
    type: [Number, String],
    default: 90,
  },
  popupContainer: popupContainerProp,
}
