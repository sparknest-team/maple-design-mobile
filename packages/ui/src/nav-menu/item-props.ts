import type { CSSProperties, PropType } from 'vue'
import type { Orientation } from '../utils/constants'
import { popupContainerProp } from '../utils/popup-container'
import type { NavMenuContent, NavMenuFieldNames, NavMenuKey, NavMenuOption, NavMenuPopupLayout } from './types'

export const navMenuItemProps = {
  /** 参与根菜单互斥激活的入口标识；省略时保持独立激活。 */
  name: { type: [String, Number] as PropType<NavMenuKey> },
  /** 未匹配选项时的入口标题；固定标题使用 label 插槽。 */
  label: { type: [String, Number, Object, Array, Function] as PropType<NavMenuContent> },
  /** 面板选项；与 Cedar 使用相同的 key/label/children 数据结构。 */
  options: { type: Array as PropType<NavMenuOption[]>, default: () => [] },
  /** 面板选中值。 */
  modelValue: { type: [String, Number] as PropType<NavMenuKey | null>, default: undefined },
  /** 非受控初始选中值。 */
  defaultValue: { type: [String, Number] as PropType<NavMenuKey | null>, default: null },
  /** 选项字段映射。 */
  fieldNames: Object as PropType<NavMenuFieldNames>,
  /** 入口视觉高亮覆盖，不改变业务激活或选中值。 */
  highlight: { type: Boolean, default: undefined },
  /** 禁用入口，同时遵循父菜单。 */
  disabled: { type: Boolean, default: undefined },
  /** 受控面板展开状态。 */
  open: { type: Boolean, default: undefined },
  /** 非受控初始展开状态。 */
  defaultOpen: Boolean,
  /** 调用 select 后关闭面板。 */
  hideOnSelect: { type: Boolean, default: true },
  /** 关闭后卸载面板内容；默认保留首次展开后的状态。 */
  unmountOnClose: { type: Boolean, default: false },
  /** 浮层挂载位置；覆盖父菜单。 */
  popupContainer: popupContainerProp,
  /** 浮层附加类名；覆盖父菜单。 */
  popupClass: [String, Array, Object],
  /** full-width 为筛选栏下方通栏；full 撑满下方可视区域，均不自动翻转。 */
  popupLayout: { type: String as PropType<NavMenuPopupLayout>, default: 'full-width' },
  /** 面板自定义样式。 */
  popupStyle: Object as PropType<CSSProperties>,
  /** 面板内选项横向平铺或纵向排列。 */
  optionsMode: { type: String as PropType<Orientation>, default: 'vertical' },
}
export const props = navMenuItemProps
export type NavMenuItemProps = import('vue').ExtractPublicPropTypes<typeof navMenuItemProps>
export interface NavMenuItemSlotContext {
  modelValue: NavMenuKey | null
  selectedOption: NavMenuOption | undefined
  active: boolean
  open: boolean
  select: (key: NavMenuKey | null, event?: Event) => void
  close: () => void
}
export interface NavMenuItemExposed {
  close(): void
  select(key: NavMenuKey | null, event?: Event): void
  setOpen(open: boolean): void
}
