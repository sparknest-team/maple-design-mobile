import { TeleportProps, VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const popupProps: Record<keyof PopupProps, any>

export type PopupPosition = 'top' | 'bottom' | 'right' | 'left' | 'center'

export interface PopupProps extends BasicAttributes {
  open?: boolean
  position?: PopupPosition
  mask?: boolean
  maskClass?: string
  maskStyle?: Record<string, any>
  lockScroll?: boolean
  maskClosable?: boolean
  escToClose?: boolean
  defaultStyle?: boolean
  safeArea?: boolean
  safeAreaTop?: boolean
  zIndex?: number
  popupContainer?: TeleportProps['to'] | false
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onClickOverlay?: ListenerProp<() => void>
  onKeyEscape?: ListenerProp<() => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
}

export class Popup extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<PopupProps>

  $props: PopupProps

  $slots: {
    default(): VNode[]
  }
}

export class _PopupComponent extends Popup {}
