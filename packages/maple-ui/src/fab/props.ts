import { type PropType, type TeleportProps } from 'vue'
import { dragProps } from '../drag'
import { iconProps } from '../icon'
import { ExtractPublicPropTypes, pickProps } from '../utils/components'
import type { SemanticStatus } from '../utils/constants'

export type FabPosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom'

export type FabTrigger = 'click' | 'hover'

export type FabDirection = 'top' | 'right' | 'bottom' | 'left'

export type FabDrag = Pick<ExtractPublicPropTypes<typeof dragProps>, 'direction' | 'attraction' | 'boundary'> | boolean

export const props = {
  active: Boolean,
  open: {
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
  inactiveIcon: {
    type: String,
    default: 'plus',
  },
  activeIcon: {
    type: String,
    default: 'window-close',
  },
  inactiveIconSize: pickProps(iconProps, 'size'),
  activeIconSize: pickProps(iconProps, 'size'),
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
    type: [Boolean, Number, String],
    default: true,
  },
  safeArea: Boolean,
  popupContainer: {
    type: [String, Object, Boolean] as PropType<TeleportProps['to'] | false>,
    default: 'body',
  },
}
