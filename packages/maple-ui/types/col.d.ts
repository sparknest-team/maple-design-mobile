import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const colProps: Record<keyof ColProps, any>

export type FlexType = number | string | 'initial' | 'auto' | 'none'

export type ColSizeDescriptor = {
  span?: number
  offset?: number
  order?: number
}

export type ColBreakpoint = number | ColSizeDescriptor

export interface ColProps extends BasicAttributes {
  span?: number
  offset?: number
  order?: number
  xs?: ColBreakpoint
  sm?: ColBreakpoint
  md?: ColBreakpoint
  lg?: ColBreakpoint
  xl?: ColBreakpoint
  xxl?: ColBreakpoint
  flex?: FlexType
  onClick?: ListenerProp<(e: Event) => void>
}

export class Col extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<ColProps>

  $props: ColProps

  $slots: {
    default(): VNode[]
  }
}

export class _ColComponent extends Col {}
