import { VNode, VNodeChild } from 'vue'
import type { StepStatus } from './steps'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export declare const stepProps: Record<keyof StepProps, any>

export interface StepProps extends BasicAttributes {
  title?: string
  description?: string
  status?: StepStatus
  disabled?: boolean
}

export class Step extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<StepProps>

  $props: StepProps

  $slots: {
    default(): VNode[]
    icon(data: { step: number; status: StepStatus }): VNodeChild
    description(): VNode[]
  }
}

export class _StepComponent extends Step {}
