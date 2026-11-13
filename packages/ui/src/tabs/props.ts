import type { HTMLAttributes, PropType } from 'vue'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import type { CompatibleStyleValue as StyleValue } from '../_utils/style-value'
import { componentSizes, type ComponentSize, type Orientation } from '../utils/constants'

export type TabsName = string | number
export type TabsVariant = 'line' | 'card' | 'outline' | 'plain' | 'capsule' | 'enclosed'
export type TabsTrigger = 'click' | 'hover'
export type TabsIndicatorPosition = 'normal' | 'reverse'
export type TabsScrollPosition = 'start' | 'end' | 'center' | 'auto' | number
export type TabsActivationMode = 'automatic' | 'manual'

export const tabsProps = {
  /** 当前选中 name，受控状态。 */
  modelValue: { type: [String, Number] as PropType<TabsName>, default: undefined },
  /** 非受控初始 name，仅创建时读取；省略时选择首个可用标签。 */
  defaultValue: { type: [String, Number] as PropType<TabsName>, default: undefined },
  /** 视觉变体。 */
  variant: {
    type: String as PropType<TabsVariant>,
    default: 'line',
    validator: (value: TabsVariant) => ['line', 'card', 'outline', 'plain', 'capsule', 'enclosed'].includes(value),
  },
  /** 组件尺寸，省略时继承全局设置。 */
  size: {
    type: String as PropType<ComponentSize>,
    default: undefined,
    validator: (value: ComponentSize) => componentSizes.includes(value),
  },
  /** 无障碍标签列表名称。 */
  tabListAriaLabel: String,
  /** 导航方向。 */
  orientation: {
    type: String as PropType<Orientation>,
    default: 'horizontal',
    validator: (value: Orientation) => ['horizontal', 'vertical'].includes(value),
  },
  /** 指示器位于内容侧或相反侧。 */
  /** 指示器位于导航靠内容的一侧 normal 或相反侧 reverse，默认 normal；不使用四边值 */
  indicatorPosition: {
    type: String as PropType<TabsIndicatorPosition>,
    default: 'normal',
    validator: (value: TabsIndicatorPosition) => ['normal', 'reverse'].includes(value),
  },
  /** 显示可关闭标签。 */
  editable: Boolean,
  /** 编辑模式下显示新增按钮。 */
  showAddButton: Boolean,
  /** 新增后切换至最后一个可用标签。 */
  autoSwitch: Boolean,
  /** 首次激活才挂载内容。 */
  lazyLoad: Boolean,
  /** 隐藏时卸载内容。 */
  destroyOnHide: Boolean,
  /** 水平方向撑满容器高度。 */
  justify: Boolean,
  /** 内容切换动画。 */
  animation: Boolean,
  /** 每页内容内层的自定义类名。 */
  itemClass: [String, Array, Object] as PropType<HTMLAttributes['class']>,
  /** 每页内容内层的自定义样式。 */
  itemStyle: [String, Array, Object] as PropType<StyleValue>,
  /** 每页内容外层容器的自定义类名。 */
  itemWrapperClass: [String, Array, Object] as PropType<HTMLAttributes['class']>,
  /** 每页内容外层容器的自定义样式。 */
  itemWrapperStyle: [String, Array, Object] as PropType<StyleValue>,
  /** 导航标签外层（包含标题与关闭按钮）的自定义类名。 */
  tabClass: [String, Array, Object] as PropType<HTMLAttributes['class']>,
  /** 导航标签外层（包含标题与关闭按钮）的自定义样式。 */
  tabStyle: [String, Array, Object] as PropType<StyleValue>,
  /** 隐藏整个内容区域。 */
  hideContent: Boolean,
  /** 鼠标触发方式；触摸始终支持点击。 */
  trigger: {
    type: String as PropType<TabsTrigger>,
    default: 'click',
    validator: (value: TabsTrigger) => ['click', 'hover'].includes(value),
  },
  /** 选中标签在导航滚动区域中的位置；数字为起点偏移。 */
  /** 选中标签在导航滚动视口中的目标位置或数值偏移，默认 auto；不是弹层方位 */
  scrollPosition: {
    type: [String, Number] as PropType<TabsScrollPosition>,
    default: 'auto',
    validator: (value: TabsScrollPosition) =>
      typeof value === 'number' ? Number.isFinite(value) : ['start', 'end', 'center', 'auto'].includes(value),
  },
  /** 溢出时显示滚动按钮；auto 在精细指针上显示，触摸端隐藏。 */
  scrollButtons: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: 'auto',
    validator: (value: boolean | 'auto') => typeof value === 'boolean' || value === 'auto',
  },
  /** 方向键聚焦时自动激活，或等待 Enter/Space。 */
  activationMode: {
    type: String as PropType<TabsActivationMode>,
    default: 'automatic',
    validator: (value: TabsActivationMode) => ['automatic', 'manual'].includes(value),
  },
  /** 内容支持横向触摸滑动切换，默认关闭。 */
  swipeable: Boolean,
}
export const tabNavProps = {
  /** 业务唯一标识，与 modelValue 对应；不使用 Vue key 作为选中值。 */
  name: { type: [String, Number] as PropType<TabsName>, required: true as const },
  /** 标签标题，title 插槽优先。 */
  title: String,
  /** 禁止选择与关闭。 */
  disabled: Boolean,
  /** editable 模式下允许关闭。 */
  closable: { type: Boolean, default: true },
  /** 图标与文字垂直排列。 */
  itemVertical: Boolean,
}
export const tabItemProps = {
  /** 业务唯一标识，与 modelValue 对应；不使用 Vue key 作为选中值。 */
  name: { type: [String, Number] as PropType<TabsName>, required: true as const },
  /** 覆盖父级首次挂载策略。 */
  lazyLoad: { type: Boolean, default: undefined },
  /** 覆盖父级隐藏销毁策略。 */
  destroyOnHide: { type: Boolean, default: undefined },
}
export const tabPaneProps = {
  /** 业务唯一标识，与 modelValue 对应；不使用 Vue key 作为选中值。 */
  name: { type: [String, Number] as PropType<TabsName>, required: true as const },
  /** 导航标签标题。 */
  title: String,
  /** 禁止选择与关闭。 */
  disabled: Boolean,
  /** editable 模式下允许关闭。 */
  closable: { type: Boolean, default: true },
  /** 图标与文字垂直排列。 */
  itemVertical: Boolean,
  /** 覆盖父级首次挂载策略。 */
  lazyLoad: { type: Boolean, default: undefined },
  /** 覆盖父级隐藏销毁策略。 */
  destroyOnHide: { type: Boolean, default: undefined },
}
export const tabsNavsProps = {}
export const tabsItemsProps = {}
export type TabsProps = ExtractPublicPropTypes<typeof tabsProps>
export type TabNavProps = ExtractPublicPropTypes<typeof tabNavProps>
export type TabItemProps = ExtractPublicPropTypes<typeof tabItemProps>
export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>
export type TabsNavsProps = ExtractPublicPropTypes<typeof tabsNavsProps>
export type TabsItemsProps = ExtractPublicPropTypes<typeof tabsItemsProps>
