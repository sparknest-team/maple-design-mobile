import { type PropType } from 'vue'
import { affixProps } from '../affix'
import { pickProps } from '../utils/components'

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
  orientation: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
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
    type: [Boolean, Number],
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
  stickyCssMode: pickProps(affixProps, 'cssMode'),
  stickyZIndex: pickProps(affixProps, 'zIndex'),
  offsetTop: pickProps(affixProps, 'offsetTop'),
}
