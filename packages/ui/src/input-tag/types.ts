import { FieldString } from '../_utils/types'
import type { TagProps } from '../tag/props'

export interface TagData {
  /**
   * @zh 标签值
   * @en Tag value
   */
  value?: string | number
  /**
   * @zh 标签内容
   * @en Tag content
   */
  label?: string
  /**
   * @zh 是否可关闭
   * @en Whether to close
   */
  closable?: boolean
  /**
   * @zh 标签属性
   * @en Tag props
   */
  tagProps?: TagProps

  [other: string]: any
}

export type InputTagFieldNames = FieldString<TagData>

export interface TagDataInfo extends TagData {
  raw: Record<string, unknown>
  value: string | number
  label: string
  closable: boolean
}

export type InputTagValue = (string | number | TagData)[] | null
export type InputTagEmits = {
  [Event in keyof typeof import('./emits').inputTagEmits]: Parameters<(typeof import('./emits').inputTagEmits)[Event]>
}
export interface InputTagSlots {
  prefix?: () => import('vue').VNodeChild
  suffix?: () => import('vue').VNodeChild
  tag?: (scope: { data: TagData }) => import('vue').VNodeChild
  'clear-icon'?: (scope: { clear(event?: Event): void }) => import('vue').VNodeChild
  read?: (scope: { value: InputTagValue; text: string }) => import('vue').VNodeChild
}
export interface InputTagExpose {
  inputRef: HTMLInputElement | undefined
  focus(): void
  blur(): void
}
