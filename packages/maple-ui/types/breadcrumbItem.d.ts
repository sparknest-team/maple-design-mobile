import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const breadcrumbItemProps: Record<keyof BreadcrumbItemProps, any>

export interface BreadcrumbItemProps extends BasicAttributes {
  separator?: string | number
  href?: string
  onClick?: ListenerProp<(e: Event) => void>
}

export class BreadcrumbItem extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<BreadcrumbItemProps>

  $props: BreadcrumbItemProps

  $slots: {
    default(): VNode[]
    separator(): VNode[]
  }
}

export class _BreadcrumbItemComponent extends BreadcrumbItem {}
