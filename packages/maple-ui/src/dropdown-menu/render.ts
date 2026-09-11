import { defineComponent, h, mergeProps, withDirectives, type PropType, type Slots, type VNodeChild } from 'vue'
import { createNamespace } from '../utils/components'

export type DropdownMenuViewOptions = Record<string, any>

/** Shared DOM composition. Native primitives, names and appearance are adapters. */
function panel(
  o: DropdownMenuViewOptions,
  children: () => VNodeChild,
  footer?: () => VNodeChild,
  attrs: Record<string, unknown> = {},
) {
  const list = () =>
    h(
      o.listTag ?? 'div',
      {
        class: o.listClass,
        style: o.listStyle,
        ref: o.panelOnList ? o.rootRef : o.listRef,
        onScroll: o.onScroll,
        ...(o.panelOnList ? { role: 'menu', 'data-dropdown-menu-panel': '' } : {}),
      },
      [children()],
    )
  if (o.bare) {
    return h(
      o.listTag ?? 'div',
      mergeProps({ role: 'menu', 'data-dropdown-menu-panel': '', ref: o.panelOnList ? undefined : o.rootRef }, attrs),
      [children()],
    )
  }
  return h(
    'div',
    mergeProps(
      {
        class: o.class,
        ...(o.panelOnList ? {} : { role: 'menu', 'data-dropdown-menu-panel': '' }),
        ref: o.panelOnList ? undefined : o.rootRef,
      },
      attrs,
    ),
    [list(), footer ? h('div', { class: o.footerClass }, [footer()]) : null],
  )
}

function option(o: DropdownMenuViewOptions, slots: Slots, attrs: Record<string, unknown>) {
  const content =
    slots.default?.() ?? (o.labelComponent ? h(o.labelComponent, { is: o.label, class: o.labelClass }) : o.label)
  const children = [
    o.coverClass ? h('div', { class: o.coverClass }) : null,
    slots.icon ? h('span', { class: o.iconClass }, slots.icon()) : null,
    o.contentTag ? h(o.contentTag, { class: o.contentClass }, content) : content,
    slots.suffix ? h('span', { class: o.suffixClass }, slots.suffix()) : null,
    o.arrow ? h('div', { class: o.arrowClass }, o.arrow()) : null,
    o.overlay ? h(o.overlay, o.overlayProps) : null,
  ]
  const node = h(
    o.tag ?? 'div',
    mergeProps(
      {
        ref: o.rootRef,
        class: o.class,
        'data-dropdown-menu-item': '',
        role: 'menuitem',
        'aria-disabled': o.disabled || undefined,
        tabindex: o.disabled ? undefined : -1,
        onClick: o.onClick,
        onFocus: o.onFocus,
        onBlur: o.onBlur,
      },
      attrs,
    ),
    children,
  )
  return o.directives?.length ? withDirectives(node, o.directives) : node
}

export default defineComponent({
  name: createNamespace('dropdown-menu-view').name,
  inheritAttrs: false,
  props: { options: { type: Object as PropType<DropdownMenuViewOptions>, required: true } },
  setup(props, { slots, attrs }) {
    return () => {
      const o = props.options
      if (o.kind === 'option') {
        return option(o, slots, attrs)
      }
      if (o.kind === 'panel') {
        return panel(o, () => slots.default?.(), slots.footer, attrs)
      }
      // Root and recursive submenu share the same popup/slot composition.
      return h(o.triggerComponent, mergeProps(o.triggerProps, attrs, { ref: o.triggerRef }), {
        default: () => (o.reference ? o.reference(slots) : slots.default?.()),
        content: () => {
          const children = () => [o.items?.(), slots.content?.()]
          return o.panelComponent
            ? h(o.panelComponent, o.panelProps, {
                default: children,
                ...(slots.footer ? { footer: slots.footer } : {}),
              })
            : panel(o.panel, children, slots.footer)
        },
      })
    }
  },
})
