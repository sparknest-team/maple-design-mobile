import { type PropType, type TeleportProps } from 'vue'
import { dragProps } from '../drag'
import { iconProps } from '../icon'
import { ExtractPublicPropTypes, pickProps } from '../utils/components'
import type { SemanticStatus } from '../utils/constants'
import { popupContainerProp } from '../utils/popup-container'

export type FabPosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom'

export type FabTrigger = 'click' | 'hover'

export type FabDirection = 'top' | 'right' | 'bottom' | 'left'

export type FabDrag = Pick<ExtractPublicPropTypes<typeof dragProps>, 'direction' | 'attraction' | 'boundary'> | boolean

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
  position: {
    type: String as PropType<FabPosition>,
    default: 'right-bottom',
  },
  direction: {
    type: String as PropType<FabDirection>,
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
