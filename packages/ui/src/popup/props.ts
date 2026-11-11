import { type PropType, type TeleportProps } from 'vue'
import type { BeforeHookDone, BeforeHookResult } from '../_hooks/use-action-guard'
import { readingDirectionProp } from '../_utils/direction'
import { popupContainerProp } from '../utils/popup-container'

export type PopupCloseReason = 'overlay' | 'escape' | 'route' | 'swipe' | 'close' | 'api' | 'model'
export type PopupBeforeClose = (
  payload: { reason: PopupCloseReason },
  done: BeforeHookDone,
  context: { signal: AbortSignal; event?: Event },
) => BeforeHookResult

export type PopupPlacement = 'top' | 'bottom' | 'right' | 'left' | 'center'

export const popupProps = {
  /** 业务加载状态；与 before-close 等待状态合并。 */
  loading: Boolean,
  /** 阅读方向，省略时继承来源作用域。 */
  dir: readingDirectionProp,
  beforeClose: Function as PropType<PopupBeforeClose>,
  open: {
    type: Boolean,
    default: undefined,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  /** 弹层在容器四边或中央的放置区域，默认 center；不是相对触发器的方位，不自动翻转 */
  placement: {
    type: String as PropType<PopupPlacement>,
    default: 'center',
  },
  /** Bottom placement only; drag starts on data-popup-swipe-handle. */
  swipeToClose: Boolean,
  swipeThreshold: { type: Number, default: 40 },
  transition: String,
  overlayAnimationName: {
    type: String,
    default: undefined,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  overlayClass: String,
  overlayStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true,
  },
  overlayClosable: {
    type: Boolean,
    default: true,
  },
  escToClose: {
    type: Boolean,
    default: true,
  },
  unstyled: {
    type: Boolean,
    default: false,
  },
  zIndex: Number,
  safeAreaInsetBottom: Boolean,
  safeAreaInsetTop: Boolean,
  /** 横屏右侧安全区。 */
  safeAreaInsetRight: Boolean,
  /** 横屏左侧安全区。 */
  safeAreaInsetLeft: Boolean,
  unmountOnClose: {
    type: Boolean,
    default: false,
  },
  closeOnRouteChange: {
    type: Boolean,
    default: false,
  },
  popupContainer: popupContainerProp,
}

export const props = popupProps
export type PopupProps = import('vue').ExtractPublicPropTypes<typeof popupProps>
