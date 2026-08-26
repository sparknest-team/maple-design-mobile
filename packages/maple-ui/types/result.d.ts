import { VNode } from 'vue'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const resultProps: Record<keyof ResultProps, any>

export type ResultStatus = 'info' | 'success' | 'warning' | 'danger' | 'question' | 'empty'

export interface ResultProps extends BasicAttributes {
  status?: ResultStatus
  title?: string
  subtitle?: string
  imageSize?: string | number
  animation?: boolean
}

export class Result extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<ResultProps>

  $props: ResultProps

  $slots: {
    image(): VNode[]
    title(): VNode[]
    subtitle(): VNode[]
    footer(): VNode[]
  }
}

export class _ResultComponent extends Result {}
