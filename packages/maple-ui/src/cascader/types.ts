import { RenderFunction } from 'vue'
import { BaseType, FieldString } from '../_utils/types'
import { TagProps } from '../tag'

export type CascaderBaseValue =
  null | BaseType | Record<string, any> | (BaseType | Record<string, any> | (BaseType | Record<string, any>)[])[]

export interface CascaderOption {
  /**
   * @zh 选项值，2.29.0 版本支持对象
   * @en Option value, version 2.29.0 supports objects
   */
  value?: string | number | Record<string, any>
  /**
   * @zh 选项文本
   * @en Option text
   */
  label?: string
  /**
   * @zh 自定义渲染
   * @en Custom render
   */
  render?: RenderFunction
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean
  /**
   * @zh 展示的标签属性
   * @en Displayed tag attributes
   */
  tagProps?: TagProps
  /**
   * @zh 下一级选项
   * @en Next level options
   */
  children?: CascaderOption[]
  /**
   * @zh 是否是叶子节点
   * @en Whether it is a leaf node
   */
  isLeaf?: boolean

  [other: string]: any
}

export type CascaderFieldNames = FieldString<CascaderOption>

export interface CascaderOptionWithTotal extends CascaderOption {
  children?: CascaderOptionWithTotal[]
  totalLeafOptions?: number
}

export interface CascaderNode extends CascaderOption {
  parent?: CascaderNode
  checked?: boolean
  indeterminate?: boolean
  level: number
  index: number
  path: CascaderNode[]
  children?: CascaderNode[]
  checkedValues?: Set<string>
  nodes: CascaderNode[]
  enabledNodes: CascaderNode[]
  raw: CascaderOption
}

export interface CascaderOptionInfo extends CascaderOptionWithTotal {
  raw: Record<string, unknown>
  key: string
  valueKey: string
  level: number
  index: number
  value: BaseType | Record<string, any>
  label: string
  disabled: boolean
  selectionDisabled: boolean
  isLeaf: boolean
  parent?: CascaderOptionInfo
  children?: CascaderOptionInfo[]
  path: CascaderOptionInfo[]
  pathValue: any[]
}

export interface CascaderReadScope {
  value: CascaderBaseValue | undefined
  text: string
}
export type CascaderEmits = {
  [Event in keyof typeof import('./emits').cascaderEmits]: Parameters<(typeof import('./emits').cascaderEmits)[Event]>
}
export interface CascaderSlots {
  read?(scope: CascaderReadScope): import('vue').VNodeChild
  option?(scope: { data: CascaderOptionInfo }): import('vue').VNodeChild
  label?(scope: { data: import('../_components/selection-field/props').SelectionFieldItem }): import('vue').VNodeChild
  selected?(): import('vue').VNodeChild
  prefix?(): import('vue').VNodeChild
  suffix?(): import('vue').VNodeChild
  empty?(): import('vue').VNodeChild
  'clear-icon'?(scope: { clear(event?: Event): void }): import('vue').VNodeChild
  'arrow-icon'?(scope: { focus: boolean; menuOpen: boolean }): import('vue').VNodeChild
  'loading-icon'?(): import('vue').VNodeChild
  'search-icon'?(): import('vue').VNodeChild
}
export interface CascaderExpose {
  refresh(): Promise<void>
  focus(): void
  blur(): void
}
