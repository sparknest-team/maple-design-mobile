import { VNode } from 'vue'
import { BasicAttributes, SetPropsDefaults, VarComponent } from './varComponent'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerTextAlign = 'start' | 'center' | 'end'
export type DividerType = 'dashed' | 'dotted' | 'solid' | 'double'
export type DividerSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type DividerSize = number | string | Array<number | string>

export declare const dividerProps: Record<keyof DividerProps, any>

export interface DividerProps extends BasicAttributes {
  sizeX?: DividerSize
  sizeY?: DividerSize
  orientation?: DividerOrientation
  textAlign?: DividerTextAlign
  description?: string
  type?: DividerType
  hairline?: boolean
  thickness?: number
  color?: string
  opacity?: number
}

export class Divider extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<DividerProps>

  $props: DividerProps

  $slots: {
    default(): VNode[]
  }
}

export class _DividerComponent extends Divider {}
