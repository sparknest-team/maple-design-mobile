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

export type MenuTrigger = 'click' | 'hover' | 'manual'

export type MenuStrategy = PositioningStrategy

export type MenuSize = 'normal' | 'mini' | 'small' | 'large'
export type MenuPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'

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
  scrollable?: boolean
  closeOnSelect?: boolean
  hideOnSelect?: boolean
  show?: boolean
  popupVisible?: boolean
  defaultPopupVisible?: boolean
  disabled?: boolean
  trigger?: MenuTrigger
  reference?: MenuReference
  placement?: MenuPlacement
  position?: MenuPosition
  strategy?: MenuStrategy
  labelKey?: string
  valueKey?: string
  childrenKey?: string
  offsetX?: string | number
  offsetY?: string | number
  teleport?: TeleportProps['to'] | false
  popupContainer?: TeleportProps['to'] | false
  sameWidth?: boolean
  elevation?: boolean | number | string
  popoverClass?: string
  closeOnClickReference?: boolean
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onSelect?: ListenerProp<(value: any) => void>
  onPopupVisibleChange?: ListenerProp<(visible: boolean) => void>
  'onUpdate:modelValue'?: ListenerProp<(value: any) => void>
  'onUpdate:show'?: ListenerProp<(show: boolean) => void>
  'onUpdate:popupVisible'?: ListenerProp<(visible: boolean) => void>
}

export class Menu extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<MenuProps>

  $props: MenuProps

  $slots: {
    default(): VNode[]
    content(): VNode[]
    options(): VNode[]
  }

  open(): void

  close(): void

  resize(): void

  setReference(reference: MenuReference): void
}

export class _MenuComponent extends Menu {}
