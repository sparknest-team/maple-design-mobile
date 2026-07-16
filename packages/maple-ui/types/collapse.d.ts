import { VNode, VNodeChild } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const collapseProps: Record<keyof CollapseProps, any>

export type CollapseActiveNames = Array<string | number>

export type CollapseExpandIconPosition = 'left' | 'right'

export type CollapseToggleAllOptions = { expand: boolean | 'inverse'; skipDisabled?: boolean }

export interface CollapseExpandIconSlotProps {
  active: boolean
  disabled: boolean
  position: CollapseExpandIconPosition
}

export interface CollapseProps extends BasicAttributes {
  activeNames?: CollapseActiveNames
  defaultActiveNames?: CollapseActiveNames
  accordion?: boolean
  offset?: boolean
  divider?: boolean
  elevation?: boolean | string | number
  expandIconPosition?: CollapseExpandIconPosition
  showExpandIcon?: boolean
  destroyOnHide?: boolean
  onChange?: ListenerProp<(value: CollapseActiveNames) => void>
  'onUpdate:activeNames'?: ListenerProp<(value: CollapseActiveNames) => void>
}

export class Collapse extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<CollapseProps>

  $props: CollapseProps

  $slots: {
    default(): VNode[]
    'expand-icon'(props: CollapseExpandIconSlotProps): VNodeChild
  }

  toggleAll(options: CollapseToggleAllOptions): void
}

export class _CollapseComponent extends Collapse {}
