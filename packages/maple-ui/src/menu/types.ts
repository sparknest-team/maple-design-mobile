import type { CSSProperties, HTMLAttributes, VNodeChild } from 'vue'
import type { TriggerProps } from '../trigger'

export type { MenuFieldNames } from './selection'
export type { TriggerPlacement as MenuPosition, Reference as MenuReference } from '../trigger'
export type MenuSubmenuTrigger = 'click' | 'hover'
export type MenuStrategy = NonNullable<TriggerProps['strategy']>
export type { MenuProps } from './props'

export type MenuValue = string | number | boolean | Record<string, any> | undefined

export interface MenuRenderContext {
  option: MenuOptionData
  /** Whether this exact option is active; never descendant selection, hover, focus or open. */
  active: boolean
  level: number
}

export type MenuOptionLabelRender = (context: MenuRenderContext) => VNodeChild
export type MenuContent = VNodeChild | MenuOptionLabelRender
export type MenuOptionLabel = MenuContent

export interface MenuOptionData {
  /** 普通命令、分组或分隔线 */
  type?: 'item' | 'group' | 'divider'
  /** 主内容 */
  label?: MenuOptionLabel
  /** 前置图标 */
  icon?: MenuContent
  /** 右侧辅助内容，如快捷键 */
  extra?: MenuContent
  /** 激活命令时传给事件的值 */
  value?: any
  /** 禁用当前项及其后代 */
  disabled?: boolean
  /** 是否渲染 */
  show?: boolean
  /** 是否显示点击波纹 */
  ripple?: boolean
  /** 子命令；普通项带 children 时成为子菜单 */
  children?: MenuOptionData[]
  /** 透传给命令行元素的 HTML 属性 */
  props?: HTMLAttributes & { style?: CSSProperties }
  [key: string]: any
}

export interface MenuSlots {
  default?: () => VNodeChild
  content?: () => VNodeChild
  footer?: () => VNodeChild
  'option-label'?: (context: MenuRenderContext) => VNodeChild
  'option-icon'?: (context: MenuRenderContext) => VNodeChild
  'option-extra'?: (context: MenuRenderContext) => VNodeChild
}
export interface MenuOptionSlots {
  default?: (context: MenuRenderContext) => VNodeChild
  icon?: (context: MenuRenderContext) => VNodeChild
  suffix?: (context: MenuRenderContext) => VNodeChild
}
