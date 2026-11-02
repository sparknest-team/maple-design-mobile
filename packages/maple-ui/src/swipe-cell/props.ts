import type { PropType } from 'vue'

export type SwipeCellSide = 'left' | 'right'
export type SwipeCellPosition = SwipeCellSide | 'cell' | 'outside'

export interface SwipeCellBeforeCloseArgs {
  name: string | number
  position: SwipeCellPosition
  event?: Event
}

export const props = {
  /** 外部加载状态；等待期间暂停滑动与关闭。 */
  loading: Boolean,
  name: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  leftWidth: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  rightWidth: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  disabled: Boolean,
  stopPropagation: Boolean,
  beforeClose: Function as PropType<(args: SwipeCellBeforeCloseArgs) => boolean | Promise<boolean>>,
}
