import { TeleportProps, VNode } from 'vue'
import { PositioningStrategy } from '@popperjs/core'
import { Placement as PopperPlacement } from '@popperjs/core/lib/enums'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const popoverProps: Record<keyof PopoverProps, any>

type PopoverNeededPopperPlacement = Exclude<PopperPlacement, 'auto' | 'auto-start' | 'auto-end'>

export type PopoverPlacement =
  | PopoverNeededPopperPlacement
  | 'cover-top'
  | 'cover-top-start'
  | 'cover-top-end'
  | 'cover-bottom'
  | 'cover-bottom-start'
  | 'cover-bottom-end'
  | 'cover-left'
  | 'cover-right'

export type PopoverTrigger = 'click' | 'hover' | 'manual'

export type PopoverStrategy = PositioningStrategy

export type PopoverReference = string | HTMLElement

export interface PopoverProps extends BasicAttributes {
  show?: boolean
  disabled?: boolean
  trigger?: PopoverTrigger
  reference?: PopoverReference
  placement?: PopoverPlacement
  strategy?: PopoverStrategy
  offsetX?: string | number
  offsetY?: string | number
  teleport?: TeleportProps['to'] | false
  sameWidth?: boolean
  elevation?: boolean | number | string
  defaultStyle?: boolean
  popoverClass?: string
  closeOnClickReference?: boolean
  closeOnKeyEscape?: boolean
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onClickOutside?: ListenerProp<(event: Event) => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
}

export class Popover extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<PopoverProps>

  $props: PopoverProps

  $slots: {
    default(): VNode[]
    content(): VNode[]
  }

  open(): void

  close(): void

  resize(): void

  setReference(reference: PopoverReference): void
}

export class _PopoverComponent extends Popover {}
