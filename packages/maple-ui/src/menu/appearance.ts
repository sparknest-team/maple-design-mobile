import { computed, h, type CSSProperties, type Ref, type Slots } from 'vue'
import { IconChevronRight } from '@maplejs/icons-vue'
import Icon from '../icon'
import Ripple from '../ripple'
import { createNamespace, formatElevation, MaybeVNode } from '../utils/components'
import type { MenuViewOptions } from './render'
import { getRootTriggerOptions } from './trigger-options'
import type { MenuSubmenuTrigger } from './types'

export interface OptionState {
  optionSelected: Ref<boolean>
  disabled: Ref<boolean>
  size: Ref<string>
  isFocusing: Ref<boolean>
  labelVNode: Ref<any>
}

export const rootTriggerAppearance = getRootTriggerOptions

export function submenuTriggerAppearance() {
  return {
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
): MenuViewOptions {
  const { n, classes } = createNamespace('menu')
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
  const { n, classes } = createNamespace('menu-option')
  return computed<MenuViewOptions>(() => ({
    tag: 'li',
    class: classes(
      n(),
      n('$--box'),
      n(`--${state.size.value}`),
      [state.optionSelected.value, n('--selected-color')],
      [state.disabled.value, n('--disabled')],
      [props.active || props.highlight || state.isFocusing.value, n('--active')],
      [props.childrenTrigger, n('--children-trigger')],
      [!!slots.suffix || props.childrenTrigger, n('--has-suffix')],
    ),
    contentTag: 'div',
    contentClass: n('text'),
    label: state.labelVNode.value,
    labelComponent: MaybeVNode,
    labelClass: n('$--ellipsis'),
    iconClass: n('icon'),
    suffixClass: n('suffix'),
    arrow:
      props.childrenTrigger && !slots.suffix
        ? () => h(Icon, { 'mp-menu-option-cover': '', class: n('arrow-icon') }, () => h(IconChevronRight))
        : undefined,
    arrowClass: n('arrow'),
    directives: [[Ripple, { disabled: state.disabled.value || !props.ripple }]],
  }))
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
  submenuTrigger: 'click' as MenuSubmenuTrigger,
}
