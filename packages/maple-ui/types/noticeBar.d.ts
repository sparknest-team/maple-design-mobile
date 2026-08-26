import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export type NoticeBarMode = 'closeable'
export type NoticeBarType = 'info' | 'success' | 'warning' | 'danger'

export declare const noticeBarProps: Record<keyof NoticeBarProps, any>

export interface NoticeBarProps extends BasicAttributes {
  text?: string
  color?: string
  background?: string
  icon?: string
  type?: NoticeBarType
  mode?: NoticeBarMode
  scrollable?: boolean
  speed?: number | string
  delay?: number | string
  onClose?: ListenerProp<(e: Event) => void>
  onReplay?: ListenerProp<() => void>
}

export class NoticeBar extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<NoticeBarProps>

  $props: NoticeBarProps

  $slots: {
    default(): VNode[]
    icon(): VNode[]
    action(): VNode[]
  }
}

export class _NoticeBarComponent extends NoticeBar {}
