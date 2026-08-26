import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const rowProps: Record<keyof RowProps, any>

export type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between'

export type RowAlign = 'start' | 'center' | 'end' | 'stretch'

export interface ResponsiveValue {
  xxl?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

export type RowGutter = number | ResponsiveValue | [number | ResponsiveValue, number | ResponsiveValue]

export interface RowProps extends BasicAttributes {
  gutter?: RowGutter
  justify?: RowJustify
  align?: RowAlign
  wrap?: boolean
  div?: boolean
  onClick?: ListenerProp<(e: Event) => void>
}

export class Row extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<RowProps>

  $props: RowProps

  $slots: {
    default(): VNode[]
  }
}

export class _RowComponent extends Row {}
