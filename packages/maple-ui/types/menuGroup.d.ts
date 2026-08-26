import { VNode } from 'vue'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const menuGroupProps: Record<keyof MenuGroupProps, any>

export interface MenuGroupProps extends BasicAttributes {
  title?: string
}

export class MenuGroup extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<MenuGroupProps>

  $props: MenuGroupProps

  $slots: {
    default(): VNode[]
    title(): VNode[]
  }
}

export class _MenuGroupComponent extends MenuGroup {}
