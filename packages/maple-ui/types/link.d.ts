import { VNode } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const linkProps: Record<keyof LinkProps, any>

export type LinkUnderline = 'always' | 'hover' | 'none'
export type LinkStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'

export interface LinkProps extends BasicAttributes {
  status?: LinkStatus
  href?: string
  rel?: string
  target?: string
  to?: RouteLocationRaw
  replace?: boolean
  underline?: LinkUnderline
  disabled?: boolean
  textColor?: string
  textSize?: string | number
  onClick?: ListenerProp<(e: Event) => void>
}

export class Link extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<LinkProps>

  $props: LinkProps

  $slots: {
    default(): VNode[]
  }
}

export class _LinkComponent extends Link {}
