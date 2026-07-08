import { type PropType } from 'vue'
import { stickyProps } from '../sticky'
import { defineListenerProp, pickProps } from '../utils/components'

export type TabsScrollable = 'auto' | 'always'

export type TabsIndicatorPosition = 'normal' | 'reverse'

export type TabsVariant = 'line' | 'card' | 'capsule'

export type TabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TabsTrigger = 'click' | 'hover'

export const props = {
  active: {
    type: [String, Number],
    default: 0,
  },
  /** @zh 整体朝向是否垂直 */
  vertical: Boolean,
  /** @zh 内部选项的 flex 方向是否垂直 */
  itemVertical: Boolean,
  variant: {
    type: String as PropType<TabsVariant>,
    default: 'line',
  },
  size: {
    type: String as PropType<TabsSize>,
    default: 'md',
  },
  fixedBottom: Boolean,
  activeColor: String,
  inactiveColor: String,
  disabledColor: String,
  color: String,
  indicatorColor: String,
  indicatorSize: [String, Number],
  elevation: {
    type: [Boolean, String, Number],
    default: false,
  },
  scrollable: {
    type: String as PropType<TabsScrollable>,
    default: 'auto',
  },
  indicatorPosition: {
    type: String as PropType<TabsIndicatorPosition>,
    default: 'normal',
  },
  lazyLoad: Boolean,
  destroyOnHide: Boolean,
  trigger: {
    type: String as PropType<TabsTrigger>,
    default: 'click',
  },
  safeArea: Boolean,
  sticky: Boolean,
  stickyCssMode: pickProps(stickyProps, 'cssMode'),
  stickyZIndex: pickProps(stickyProps, 'zIndex'),
  offsetTop: pickProps(stickyProps, 'offsetTop'),
  onClick: defineListenerProp<(active: string | number) => void>(),
  onChange: defineListenerProp<(active: string | number) => void>(),
  'onUpdate:active': defineListenerProp<(active: string | number) => void>(),
}
