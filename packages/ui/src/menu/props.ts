import type { PropType } from 'vue'
import { triggerProps as triggerPropDefaults } from '../trigger'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { menuDefaults } from './appearance'
import type { MenuFieldNames } from './selection'
import type { MenuOptionData, MenuPlacement, MenuReference, MenuSubmenuTrigger, MenuValue } from './types'

export type { MenuOptionData, MenuOptionLabel, MenuOptionLabelRender } from './types'
export type MenuSize = ComponentSize

export const menuProps = {
  /** 命令树 */
  options: { type: Array as PropType<MenuOptionData[]>, default: () => [] },
  /** label/value/children/disabled 字段映射 */
  fieldNames: Object as PropType<MenuFieldNames>,
  /** 当前激活值 */
  modelValue: { type: [String, Number, Boolean, Object] as PropType<MenuValue>, default: undefined },
  /** 尺寸 */
  /** 非受控初始选中值，仅创建时读取。 */
  defaultValue: { type: [String, Number, Boolean, Object] as PropType<MenuValue>, default: undefined },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
    validator: (value: unknown) => componentSizes.includes(value as ComponentSize),
  },
  /** 浮层是否可见 */
  open: { type: Boolean, default: undefined },
  /** 非受控默认可见状态 */
  defaultOpen: Boolean,
  /** 关闭时是否卸载浮层内容 */
  unmountOnClose: { type: Boolean, default: menuDefaults.unmountOnClose },
  /** 根菜单触发方式 */
  trigger: {
    type: [String, Array] as PropType<
      'click' | 'hover' | 'focus' | 'contextMenu' | ('click' | 'hover' | 'focus' | 'contextMenu')[]
    >,
    default: 'click',
  },
  /** 各级子菜单的展开方式，对所有层级统一生效 */
  submenuTrigger: {
    type: String as PropType<MenuSubmenuTrigger>,
    default: menuDefaults.submenuTrigger,
    validator: (value: unknown) => value === 'click' || value === 'hover',
  },
  /** 弹出位置 */
  /** 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 */
  placement: { type: String as PropType<MenuPlacement>, default: 'bottom' },
  /** 外部触发元素 */
  reference: { type: [String, Object] as PropType<MenuReference>, default: undefined },
  /** 定位策略，所有层级子菜单响应式继承。 */
  strategy: triggerPropDefaults.strategy,
  /** 浮层挂载容器 */
  popupContainer: triggerPropDefaults.popupContainer,
  /** 浮层类名 */
  popupClass: [String, Array, Object],
  /** 水平偏移 */
  offsetX: { type: [String, Number], default: 0 },
  /** 垂直偏移 */
  offsetY: { type: [String, Number], default: 0 },
  /** 悬停打开延迟 */
  mouseEnterDelay: { type: Number, default: menuDefaults.mouseEnterDelay },
  /** 悬停关闭延迟 */
  mouseLeaveDelay: { type: Number, default: menuDefaults.mouseLeaveDelay },
  /** 再次点击触发元素时是否关闭 */
  closeOnClickReference: { type: Boolean, default: menuDefaults.closeOnClickReference },
  /** 浮层覆盖触发元素 */
  cover: Boolean,
  /** 默认限制、自定义像素高度或不限高 */
  popupMaxHeight: { type: [Boolean, Number], default: true },
  /** 激活命令后关闭浮层 */
  hideOnSelect: { type: Boolean, default: true },
  /** 浮层宽度跟随触发元素 */
  autoFitPopupWidth: Boolean,
  /** 禁用菜单 */
  disabled: Boolean,
  /** 浮层跟随鼠标位置 */
  alignPoint: Boolean,
  /** 浮层阴影层级 */
  elevation: { type: [Boolean, Number], default: true },
}

export const props = menuProps
export type MenuProps = import('../_utils/public-props').CompatiblePublicProps<typeof menuProps>
