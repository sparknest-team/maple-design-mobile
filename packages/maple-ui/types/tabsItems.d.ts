import { VNode } from 'vue'
import { Carousel } from './carousel'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const tabsItemsProps: Record<keyof TabsItemsProps, any>

export interface TabsItemsProps extends BasicAttributes {
  active?: string | number
  canSwipe?: boolean
  animated?: boolean
  loop?: boolean
  'onUpdate:active'?: ListenerProp<(active: string | number) => void>
}

export class TabsItems extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<TabsItemsProps>

  $props: TabsItemsProps

  $slots: {
    default(): VNode[]
  }

  getCarousel(): Carousel
}

export class _TabsItemsComponent extends TabsItems {}
