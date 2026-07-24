import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export type BreadcrumbRoute = {
  label: string
  path: string
  children?: {
    label: string
    path: string
  }[]
}

export declare const breadcrumbProps: Record<keyof BreadcrumbProps, any>

export interface BreadcrumbProps extends BasicAttributes {
  separator?: string | number
  maxCount?: number
  routes?: BreadcrumbRoute[]
  customUrl?: (paths: string[]) => string
}

export class Breadcrumb extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<BreadcrumbProps>

  $props: BreadcrumbProps

  $slots: {
    default(): VNode[]
    separator(): VNode[]
    'item-render'(data: { route: BreadcrumbRoute; routes: BreadcrumbRoute[]; paths: string[] }): VNode[]
    'more-icon'(): VNode[]
  }
}

export class _BreadcrumbComponent extends Breadcrumb {}
