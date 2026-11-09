import { type PropType, type TeleportProps } from 'vue'
import { dragProps } from '../drag'
import { iconProps } from '../icon'
import { ExtractPublicPropTypes, pickProps } from '../utils/components'
import type { SemanticStatus } from '../utils/constants'
import { popupContainerProp } from '../utils/popup-container'

export type FabPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type FabTrigger = 'click' | 'hover'

export interface FabTriggerProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-expanded'?: boolean
  'aria-controls'?: string
}

export type FabPlacement = 'top' | 'right' | 'bottom' | 'left'

export type FabDrag = Pick<ExtractPublicPropTypes<typeof dragProps>, 'axis' | 'attraction' | 'boundary'> | boolean

export const props = {
  /** 动作菜单展开状态，通过 v-model:open 绑定。 */
  open: { type: Boolean, default: undefined },
  /** 非受控初始展开状态，仅创建时读取。 */
  defaultOpen: Boolean,
  /** 整体显示状态。 */
  visible: {
    type: Boolean,
    default: true,
  },
  drag: {
    type: [Object, Boolean] as PropType<FabDrag>,
    default: false,
  },
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'primary',
  },
  /** 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 */
  position: {
    type: String as PropType<FabPosition>,
    default: 'bottom-right',
  },
  /** 动作菜单相对按钮的放置侧，默认 top；不会自动翻转，不改变按钮自身 position */
  placement: {
    type: String as PropType<FabPlacement>,
    default: 'top',
  },
  trigger: {
    type: String as PropType<FabTrigger>,
    default: 'click',
  },
  disabled: Boolean,
  color: String,
  closedIcon: {
    type: String,
    default: 'plus',
  },
  openIcon: {
    type: String,
    default: 'close',
  },
  closedIconSize: pickProps(iconProps, 'size'),
  openIconSize: pickProps(iconProps, 'size'),
  fixed: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: [Number, String],
    default: 90,
  },
  top: [Number, String],
  bottom: [Number, String],
  left: [Number, String],
  right: [Number, String],
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  safeArea: Boolean,
  popupContainer: popupContainerProp,
}
