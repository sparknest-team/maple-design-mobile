import { VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export type SwipeCellSide = 'left' | 'right'
export type SwipeCellPosition = SwipeCellSide | 'cell' | 'outside'

export interface SwipeCellBeforeCloseArgs {
  name: string | number
  position: SwipeCellPosition
  event?: Event
}

export declare const swipeCellProps: Record<keyof SwipeCellProps, any>

export interface SwipeCellProps extends BasicAttributes {
  name?: string | number
  leftWidth?: string | number
  rightWidth?: string | number
  disabled?: boolean
  stopPropagation?: boolean
  beforeClose?: (args: SwipeCellBeforeCloseArgs) => boolean | Promise<boolean>
  onClick?: ListenerProp<(position: SwipeCellPosition) => void>
  onOpen?: ListenerProp<(value: { name: string | number; position: SwipeCellSide }) => void>
  onClose?: ListenerProp<(value: { name: string | number; position: SwipeCellPosition }) => void>
}

export class SwipeCell extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<SwipeCellProps>

  $props: SwipeCellProps

  $slots: {
    default(): VNode[]
    left(): VNode[]
    right(): VNode[]
  }

  open(side: SwipeCellSide): void
  close(): void
}

export class _SwipeCellComponent extends SwipeCell {}
