import { VNode } from 'vue'
import type { ResponsiveValue } from './row'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const gridProps: Record<keyof GridProps, any>

export interface GridProps extends BasicAttributes {
  cols?: number | ResponsiveValue
  rowGap?: number | ResponsiveValue
  colGap?: number | ResponsiveValue
  collapsed?: boolean
  collapsedRows?: number
}

export class Grid extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<GridProps>

  $props: GridProps

  $slots: {
    default(): VNode[]
  }
}

export class _GridComponent extends Grid {}
