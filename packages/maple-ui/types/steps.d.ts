import { VNode } from 'vue'
import {
  BasicAttributes,
  ListenerProp,
  SetPropsDefaults,
  Direction as StepsDirection,
  VarComponent,
} from './varComponent'

export { StepsDirection }

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

export declare const stepsProps: Record<keyof StepsProps, any>

export interface StepsProps extends BasicAttributes {
  current?: number
  defaultCurrent?: number
  direction?: StepsDirection
  status?: StepStatus
  changeable?: boolean
  onChange?: ListenerProp<(step: number, ev: Event) => void>
  'onUpdate:current'?: ListenerProp<(step: number) => void>
}

export class Steps extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<StepsProps>

  $props: StepsProps

  $slots: {
    default(): VNode[]
  }
}

export class _StepsComponent extends Steps {}
