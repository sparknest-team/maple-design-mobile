import type { CSSProperties, Ref, Slots } from 'vue'
import { computed, h } from 'vue'
import { IconChevronRight } from '@maplejs/icons-vue'
import Checkbox from '../checkbox'
import Hover, { HoverOverlay, useHoverOverlay } from '../hover'
import Icon from '../icon'
import Ripple from '../ripple'
import Trigger, { triggerProps } from '../trigger'
import { createNamespace, formatElevation, MaybeVNode } from '../utils/components'
import type { MenuProps } from './props'
import type { MenuViewOptions } from './render'

export interface OptionState {
  optionSelected: Ref<boolean>
  optionIndeterminate: Ref<boolean>
  disabled: Ref<boolean>
  multiple: Ref<boolean>
  size: Ref<string>
  isFocusing: Ref<boolean>
  labelVNode: Ref<any>
}

export { Trigger }
export type { Reference as MenuReference, TriggerPlacement as MenuPosition } from '../trigger'
export { componentSizes, type ComponentSize } from '../utils/constants'
export const triggerPropDefaults = triggerProps
export const submenuTrigger = 'hover'
export const checkboxActivation: 'click' | 'change' = 'click'
export function rootTriggerAppearance(props: MenuProps) {
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
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0,
    closeOnClickReference: false,
  }
}
export function groupAppearance() {
  const { n } = createNamespace('menu-group')
  return { class: n(), titleClass: n('title') }
}
export function panelAppearance(
  props: { submenu: boolean; elevation: boolean | number },
  _slots: Slots,
  style?: CSSProperties,
): MenuViewOptions {
  const { n, classes } = createNamespace('menu')
  if (props.submenu) {
    return { bare: true }
  }
  return {
    class: classes(n('panel'), formatElevation(props.elevation, 3)),
    panelOnList: true,
    listClass: classes(n('menu'), [style?.maxHeight !== 'none', n('--max-height')]),
    listStyle: style,
    footerClass: n('footer'),
  }
}
export function useOptionAppearance(
  props: { childrenTrigger: boolean; highlight: boolean; ripple: boolean },
  state: OptionState,
  slots: Slots,
) {
  const { n, classes } = createNamespace('menu-option')
  const { hovering, handleHovering } = useHoverOverlay()
  return computed<MenuViewOptions>(() => ({
    class: classes(
      n(),
      n('$--box'),
      n(`--${state.size.value}`),
      [state.optionSelected.value, n('--selected-color')],
      [state.disabled.value, n('--disabled')],
      [props.childrenTrigger, n('--children-trigger')],
    ),
    coverClass: classes(n('cover'), [state.optionSelected.value, n('--selected-background')]),
    checkbox: Checkbox,
    contentTag: slots.default ? undefined : 'div',
    contentClass: n('text'),
    label: state.labelVNode.value,
    labelComponent: MaybeVNode,
    labelClass: n('$--ellipsis'),
    iconClass: n('icon'),
    arrow:
      props.childrenTrigger && !slots.suffix
        ? () => h(Icon, { 'mp-menu-option-cover': '', class: n('arrow-icon') }, () => h(IconChevronRight))
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
  strategy: { type: String as import('vue').PropType<'absolute' | 'fixed'>, default: 'absolute' },
}

export const menuDefaults = { unmountOnClose: false, closeOnClickReference: false }
