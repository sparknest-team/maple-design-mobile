import type { CSSProperties, HTMLAttributes, VNodeChild } from 'vue'
import type { TriggerProps } from '../trigger'

export type { DropdownMenuFieldNames } from './selection'
export type { TriggerPlacement as DropdownMenuPosition, Reference as DropdownMenuReference } from '../trigger'
export type DropdownMenuSubmenuTrigger = 'click' | 'hover'
export type DropdownMenuStrategy = NonNullable<TriggerProps['strategy']>
export type { DropdownMenuProps } from './props'

export type MenuValue = string | number | boolean | Record<string, any> | undefined

export interface DropdownMenuRenderContext {
  option: DropdownMenuOption
  active: boolean
  level: number
}

export type MenuOptionLabelRender = (context: DropdownMenuRenderContext) => VNodeChild
export type DropdownMenuContent = VNodeChild | MenuOptionLabelRender
export type MenuOptionLabel = DropdownMenuContent

export interface DropdownMenuOption {
  /** 普通命令、分组或分隔线 */
  type?: 'item' | 'group' | 'divider'
  /** 主内容 */
  label?: MenuOptionLabel
  /** 前置图标 */
  icon?: DropdownMenuContent
  /** 右侧辅助内容，如快捷键 */
  extra?: DropdownMenuContent
  /** 激活命令时传给事件的值 */
  value?: any
  /** 禁用当前项及其后代 */
  disabled?: boolean
  /** 是否渲染 */
  show?: boolean
  /** 是否显示点击波纹 */
  ripple?: boolean
  /** 子命令；普通项带 children 时成为子菜单 */
  children?: DropdownMenuOption[]
  /** 透传给命令行元素的 HTML 属性 */
  props?: HTMLAttributes & { style?: CSSProperties }
  [key: string]: any
}
