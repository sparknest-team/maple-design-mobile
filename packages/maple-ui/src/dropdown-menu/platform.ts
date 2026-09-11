import { computed, h, type CSSProperties, type PropType, type Ref, type Slots } from 'vue'
import { IconChevronRight } from '@maplejs/icons-vue'
import Hover, { HoverOverlay, useHoverOverlay } from '../hover'
import Icon from '../icon'
import Ripple from '../ripple'
import Trigger, { triggerProps } from '../trigger'
import { createNamespace, formatElevation, MaybeVNode } from '../utils/components'
import type { DropdownMenuProps } from './props'
import type { DropdownMenuViewOptions } from './render'

export interface OptionState {
  optionSelected: Ref<boolean>
  disabled: Ref<boolean>
  size: Ref<string>
  isFocusing: Ref<boolean>
  labelVNode: Ref<any>
}

export type DropdownMenuSubmenuTrigger = 'click' | 'hover'

export { Trigger }
export type { Reference as DropdownMenuReference, TriggerPlacement as DropdownMenuPosition } from '../trigger'
export { componentSizes, type ComponentSize } from '../utils/constants'
export const triggerPropDefaults = triggerProps

export function rootTriggerAppearance(props: DropdownMenuProps) {
  return {
    disabled: props.disabled,
    placement: props.placement,
    cover: props.cover,
    popupContainer: props.popupContainer,
    popupClass: props.popupClass,
    offsetX: props.offsetX,
    offsetY: props.offsetY,
    autoFitPopupWidth: props.autoFitPopupWidth,
    reference: props.reference,
    strategy: props.strategy,
    mouseEnterDelay: props.mouseEnterDelay,
    mouseLeaveDelay: props.mouseLeaveDelay,
    closeOnClickReference: props.closeOnClickReference,
    alignPoint: props.alignPoint,
  }
}

export function submenuTriggerAppearance() {
  return {
    cascadeOptimization: true,
    popupContainer: false,
    mouseEnterDelay: menuDefaults.mouseEnterDelay,
    mouseLeaveDelay: menuDefaults.mouseLeaveDelay,
    closeOnClickReference: false,
  }
}

export function panelAppearance(
  props: { submenu: boolean; elevation: boolean | number },
  _slots: Slots,
  style?: CSSProperties,
): DropdownMenuViewOptions {
  const { n, classes } = createNamespace('dropdown-menu')
  return {
    class: classes(n('panel'), formatElevation(props.elevation, 3), [props.submenu, n('--submenu')]),
    panelOnList: true,
    listTag: 'ul',
    listClass: classes(n('list'), [style?.maxHeight !== 'none', n('--max-height')]),
    listStyle: style,
    footerClass: n('footer'),
  }
}

export function useOptionAppearance(
  props: { active: boolean; childrenTrigger: boolean; highlight: boolean; ripple: boolean },
  state: OptionState,
  slots: Slots,
) {
  const { n, classes } = createNamespace('dropdown-menu-option')
  const { hovering, handleHovering } = useHoverOverlay()
  return computed<DropdownMenuViewOptions>(() => ({
    tag: 'li',
    class: classes(
      n(),
      n('$--box'),
      n(`--${state.size.value}`),
      [state.optionSelected.value, n('--selected-color')],
      [state.disabled.value, n('--disabled')],
      [props.active, n('--active')],
      [props.childrenTrigger, n('--children-trigger')],
      [!!slots.suffix || props.childrenTrigger, n('--has-suffix')],
    ),
    coverClass: classes(n('cover'), [state.optionSelected.value, n('--selected-background')]),
    contentTag: 'div',
    contentClass: n('text'),
    label: state.labelVNode.value,
    labelComponent: MaybeVNode,
    labelClass: n('$--ellipsis'),
    iconClass: n('icon'),
    suffixClass: n('suffix'),
    arrow:
      props.childrenTrigger && !slots.suffix
        ? () => h(Icon, { 'mp-dropdown-menu-option-cover': '', class: n('arrow-icon') }, () => h(IconChevronRight))
        : undefined,
    arrowClass: n('arrow'),
    overlay: HoverOverlay,
    overlayProps: {
      hovering: (hovering.value || props.highlight) && !state.disabled.value,
      focusing: state.isFocusing.value && !state.disabled.value,
    },
    directives: [
      [Ripple, { disabled: state.disabled.value || !props.ripple }],
      [Hover, handleHovering, 'desktop'],
    ],
  }))
}

export const rootPlatformProps = {
  /** Popper 定位策略 */
  strategy: { type: String as PropType<'absolute' | 'fixed'>, default: 'absolute' },
}

/**
 * Touch first: submenus expand on tap. Hover also needs a grace period, otherwise the
 * pointer travelling from the row into the popup closes it mid-flight.
 */
export const menuDefaults = {
  unmountOnClose: false,
  closeOnClickReference: false,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  submenuTrigger: 'click' as DropdownMenuSubmenuTrigger,
}
