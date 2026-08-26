import { VNode } from 'vue'
import type { ResponsiveValue } from './row'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const gridItemProps: Record<keyof GridItemProps, any>

export interface GridItemProps extends BasicAttributes {
  span?: number | ResponsiveValue
  offset?: number | ResponsiveValue
  suffix?: boolean
}

export class GridItem extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<GridItemProps>

  $props: GridItemProps

  $slots: {
    default(data: { overflow: boolean }): VNode[]
  }
}

export class _GridItemComponent extends GridItem {}
