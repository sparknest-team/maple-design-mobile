import { TeleportProps, VNode, VNodeChild } from 'vue'
import { PositioningStrategy } from '@popperjs/core'
import { Placement as PopperPlacement } from '@popperjs/core/lib/enums'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const menuProps: Record<keyof MenuProps, any>

type MenuNeededPopperPlacement = Exclude<PopperPlacement, 'auto' | 'auto-start' | 'auto-end'>

export type MenuPlacement =
  | MenuNeededPopperPlacement
  | 'cover-top'
  | 'cover-top-start'
  | 'cover-top-end'
  | 'cover-bottom'
  | 'cover-bottom-start'
  | 'cover-bottom-end'
  | 'cover-left'
  | 'cover-right'

export type MenuTrigger = 'click' | 'hover' | 'manual' | 'contextMenu'

export type MenuStrategy = PositioningStrategy

export type MenuSize = 'normal' | 'mini' | 'small' | 'large'
export type MenuReference = string | HTMLElement

export type MenuOptionLabelRender = (option: MenuOption, checked: boolean) => VNodeChild

export interface MenuOption {
  label?: string | VNode | MenuOptionLabelRender
  value?: any
  disabled?: boolean
  ripple?: boolean
  children?: MenuOption[]

  [key: PropertyKey]: any
}

export interface MenuProps extends BasicAttributes {
  modelValue?: any
  options?: MenuOption[]
  size?: MenuSize
  multiple?: boolean
  popupMaxHeight?: boolean | number
  hideOnSelect?: boolean
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
  trigger?: MenuTrigger
  reference?: MenuReference
  placement?: MenuPlacement
  strategy?: MenuStrategy
  fieldNames?: {
    label?: string
    value?: string
    children?: string
    disabled?: string
  }
  offsetX?: string | number
  offsetY?: string | number
  popupContainer?: TeleportProps['to'] | false
  autoFitPopupWidth?: boolean
  elevation?: boolean | number | string
  popoverClass?: string
  closeOnClickReference?: boolean
  alignPoint?: boolean
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onSelect?: ListenerProp<(value: any, option: MenuOption, ev?: Event) => void>
  onOpenChange?: ListenerProp<(open: boolean) => void>
  onKeyEscape?: ListenerProp<() => void>
  'onUpdate:modelValue'?: ListenerProp<(value: any) => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
}

export class Menu extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<MenuProps>

  $props: MenuProps

  $slots: {
    default(): VNode[]
    content(): VNode[]
    footer(): VNode[]
  }

  open(): void

  close(): void

  resize(): void

  setReference(reference: MenuReference): void
}

export class _MenuComponent extends Menu {}
