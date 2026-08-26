import { App, TeleportProps, VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, VarComponent } from './varComponent'

export declare const actionSheetProps: Record<keyof ActionSheetProps, any>

export interface ActionSheetProps extends BasicAttributes {
  actions?: ActionItem[]
  open?: boolean
  title?: string
  mask?: boolean
  maskClass?: string
  maskStyle?: Record<string, any>
  lockScroll?: boolean
  closeOnClickAction?: boolean
  maskClosable?: boolean
  escToClose?: boolean
  safeArea?: boolean
  popupContainer?: TeleportProps['to'] | false
  onOpen?: ListenerProp<() => void>
  onOpened?: ListenerProp<() => void>
  onClose?: ListenerProp<() => void>
  onClosed?: ListenerProp<() => void>
  onSelect?: ListenerProp<(action: ActionItem) => void>
  onClickOverlay?: ListenerProp<() => void>
  onKeyEscape?: ListenerProp<() => void>
  'onUpdate:open'?: ListenerProp<(open: boolean) => void>
}

export interface ActionItem {
  name: string
  color?: string
  icon?: string
  namespace?: string
  iconSize?: string | number
  className?: string
  disabled?: boolean
}

export interface ActionSheetOptions {
  actions?: ActionItem[]
  title?: string
  mask?: boolean
  maskClass?: string
  maskStyle?: Record<string, any>
  lockScroll?: boolean
  closeOnClickAction?: boolean
  maskClosable?: boolean
  escToClose?: boolean
  safeArea?: boolean
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onClickOverlay?: () => void
  onKeyEscape?: () => void
  onSelect?: (action: ActionItem) => void
}

export class ActionSheetComponent extends VarComponent {
  $props: ActionSheetProps

  $slots: {
    default(): VNode[]
    title(): VNode[]
    actions(): VNode[]
  }
}

export type ActionSheetActions = ActionItem | 'close'

export interface IActionSheet {
  (options?: ActionSheetOptions): Promise<ActionSheetActions>

  Component: typeof ActionSheetComponent

  setDefaultOptions(options: ActionSheetOptions): void

  resetDefaultOptions(): void

  close(): void

  install(app: App): void

  setPropsDefaults: SetPropsDefaults<ActionSheetProps>
}

export class _ActionSheetComponent extends ActionSheetComponent {}

export declare const ActionSheet: IActionSheet
