import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export type TagStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'contrast' | 'default'

export type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TagVariant = 'default' | 'outline'

export declare const tagProps: Record<keyof TagProps, any>

export interface TagProps extends BasicAttributes {
  status?: TagStatus
  size?: TagSize
  variant?: TagVariant
  visible?: boolean
  defaultVisible?: boolean
  loading?: boolean
  closable?: boolean
  checkable?: boolean
  checked?: boolean
  defaultChecked?: boolean
  nowrap?: boolean
  round?: boolean
  color?: string
  textColor?: string
  onClose?: ListenerProp<(e: MouseEvent) => void>
  onCheck?: ListenerProp<(checked: boolean, e: MouseEvent) => void>
  'onUpdate:visible'?: ListenerProp<(visible: boolean) => void>
  'onUpdate:checked'?: ListenerProp<(checked: boolean) => void>
}

export class Tag extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<TagProps>

  $props: TagProps

  $slots: {
    default(): VNode[]
    icon(): VNode[]
    'close-icon'(): VNode[]
  }
}

export class _TagComponent extends Tag {}
