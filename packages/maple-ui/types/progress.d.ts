import { VNode } from 'vue'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export type ProgressMode = 'line' | 'circle'

export type ProgressStatus = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'

export declare const progressProps: Record<keyof ProgressProps, any>

export interface ProgressProps extends BasicAttributes {
  mode?: ProgressMode
  status?: ProgressStatus
  indeterminate?: boolean
  strokeWidth?: string | number
  color?: string | Record<string, string>
  trackColor?: string
  showText?: boolean
  textClass?: string
  track?: boolean
  percent?: number | string
  size?: number | string
  rotate?: number
}

export class Progress extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<ProgressProps>

  $props: ProgressProps

  $slots: {
    default(): VNode[]
  }
}

export class _ProgressComponent extends Progress {}
