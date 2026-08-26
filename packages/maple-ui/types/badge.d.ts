import { VNode } from 'vue'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const badgeProps: Record<keyof BadgeProps, any>

export type BadgeVariant = 'default' | 'outline'
export type BadgeMode = 'floating' | 'inline'
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export type BadgeInlinePosition = 'start' | 'end'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BadgeStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends BasicAttributes {
  description?: string
  dot?: boolean
  max?: number
  show?: boolean
  showZero?: boolean
  offsetX?: number
  offsetY?: number
  color?: string
  content?: string | number
  textColor?: string
  mode?: BadgeMode
  position?: BadgePosition
  inlinePosition?: BadgeInlinePosition
  size?: BadgeSize
  status?: BadgeStatus
  variant?: BadgeVariant
}

export class Badge extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<BadgeProps>

  $props: BadgeProps

  $slots: {
    default(): VNode[]
    content(): VNode[]
  }
}

export class _BadgeComponent extends Badge {}
