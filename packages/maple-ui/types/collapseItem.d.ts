import { VNode, VNodeChild } from 'vue'
import { CollapseExpandIconSlotProps } from './collapse'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const collapseItemProps: Record<keyof CollapseItemProps, any>

export interface CollapseItemProps extends BasicAttributes {
  name?: string | number
  title?: string
  icon?: string
  disabled?: boolean
  showExpandIcon?: boolean
  destroyOnHide?: boolean
}

export class CollapseItem extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CollapseItemProps>

  $props: CollapseItemProps

  $slots: {
    default(): VNode[]
    title(): VNode[]
    extra(): VNode[]
    'expand-icon'(props: CollapseExpandIconSlotProps): VNodeChild
  }
}

export class _CollapseItemComponent extends CollapseItem {}
