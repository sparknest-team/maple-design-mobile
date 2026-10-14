import type { PropType } from 'vue'
import { triggerProps as triggerPropDefaults } from '../trigger'
import { componentSizes, type ComponentSize } from '../utils/constants'
import { menuDefaults } from './appearance'
import type { DropdownMenuFieldNames } from './selection'
import type {
  DropdownMenuOption,
  DropdownMenuPosition,
  DropdownMenuReference,
  DropdownMenuSubmenuTrigger,
  MenuValue,
} from './types'

export type { DropdownMenuOption, MenuOptionLabel, MenuOptionLabelRender } from './types'
export type DropdownMenuSize = ComponentSize

export const dropdownMenuProps = {
  /** 命令树 */
  options: { type: Array as PropType<DropdownMenuOption[]>, default: () => [] },
  /** label/value/children/disabled 字段映射 */
  fieldNames: Object as PropType<DropdownMenuFieldNames>,
  /** 当前激活值 */
  modelValue: { type: [String, Number, Boolean, Object] as PropType<MenuValue>, default: undefined },
  /** 尺寸 */
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
    type: String as PropType<DropdownMenuSubmenuTrigger>,
    default: menuDefaults.submenuTrigger,
    validator: (value: unknown) => value === 'click' || value === 'hover',
  },
  /** 弹出位置 */
  placement: { type: String as PropType<DropdownMenuPosition>, default: 'bottom' },
  /** 外部触发元素 */
  reference: { type: [String, Object] as PropType<DropdownMenuReference>, default: undefined },
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

export const props = dropdownMenuProps
export type DropdownMenuProps = import('vue').ExtractPublicPropTypes<typeof dropdownMenuProps>
