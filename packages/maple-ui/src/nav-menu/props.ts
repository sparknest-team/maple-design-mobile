import type { PropType } from 'vue'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { popupContainerProp } from '../utils/popup-container'
import type { NavMenuKey, NavMenuMode } from './types'

export const navMenuProps = {
  /** 受控的具名 NavMenu.Item 激活项。 */
  activeItem: { type: [String, Number] as PropType<NavMenuKey | null>, default: undefined },
  /** 非受控的具名 NavMenu.Item 初始激活项。 */
  defaultActiveItem: { type: [String, Number] as PropType<NavMenuKey | null>, default: null },
  /** 移动端只支持横向筛选入口。 */
  mode: {
    type: String as PropType<NavMenuMode>,
    default: 'horizontal',
    validator: (value: NavMenuMode) => value === 'horizontal',
  },
  /** 组件尺寸。 */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
    validator: (v: ComponentSize) => componentSizes.includes(v),
  },
  /** 全局禁用。 */
  disabled: Boolean,
  /** 浮层挂载位置；不改变视口通栏布局的参照。 */
  popupContainer: popupContainerProp,
  /** 浮层附加类名。 */
  popupClass: [String, Array, Object],
  /** 是否显示背景遮罩；关闭后仍保留透明的点击关闭区域。 */
  overlay: { type: Boolean, default: true },
  /** 点击遮罩区域关闭。 */
  overlayClosable: { type: Boolean, default: true },
  /** 展开期间锁定背景滚动。 */
  lockScroll: { type: Boolean, default: true },
  /** Escape 关闭当前面板。 */
  escToClose: { type: Boolean, default: true },
  /** 浮层层级。 */
  zIndex: Number,
}
export const props = navMenuProps
export type { NavMenuProps } from './types'
