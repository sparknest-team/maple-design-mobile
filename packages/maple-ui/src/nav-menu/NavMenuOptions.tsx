import { computed, defineComponent, h, mergeProps, ref, watch, type VNodeChild } from 'vue'
import { useDirection } from '@maple-design/use'
import { createNamespace } from '../utils/components'
import { navMenuItemProps } from './item-props'
import { createNavMenuTree } from './tree'
import type { NavMenuContent, NavMenuKey, NavMenuNode } from './types'

const { n } = createNamespace('nav-menu')

export default defineComponent({
  name: createNamespace('nav-menu-options').name,
  props: {
    options: navMenuItemProps.options,
    fieldNames: navMenuItemProps.fieldNames,
    modelValue: navMenuItemProps.modelValue,
    mode: navMenuItemProps.optionsMode,
  },
  emits: { select: (_key: NavMenuKey, _event: Event) => true },
  setup(props, { slots, emit }) {
    const root = ref<HTMLElement>()
    const { isRtl } = useDirection(() => root.value)
    const tree = computed(() => createNavMenuTree(props.options, props.fieldNames))
    const expanded = ref<NavMenuKey[]>([])
    watch(
      [() => props.modelValue, tree, () => props.mode],
      () => {
        const valid = expanded.value.filter((key) => tree.value.byKey.get(key)?.children.length)
        const path =
          props.mode === 'vertical'
            ? tree.value
                .ancestors(props.modelValue)
                .filter((node) => !node.disabled)
                .map((node) => node.key)
            : []
        expanded.value = [...new Set([...valid, ...path])]
      },
      { immediate: true },
    )
    function render(node: NavMenuNode): VNodeChild {
      const context = {
        option: node.option,
        active: node.type === 'item' && props.modelValue === node.key,
        expanded: expanded.value.includes(node.key),
        level: node.level,
      }
      const content = (field: 'label' | 'icon' | 'extra') => {
        const value = node.option[field === 'label' ? tree.value.names.label : field] as NavMenuContent
        return slots[field]?.(context) ?? (typeof value === 'function' ? value(context) : value)
      }
      if (node.type === 'divider') {
        return h('li', { key: node.key, role: 'separator', class: n('divider') })
      }
      if (node.type === 'group') {
        return h('li', { key: node.key, role: 'none' }, [
          h('div', { class: n('group') }, [content('label')]),
          h('ul', { class: n('options') }, node.children.map(render)),
        ])
      }
      return h('li', { key: node.key, role: 'none' }, [
        h(
          'button',
          mergeProps(
            { ...node.option.props },
            {
              type: 'button',
              'data-nav-option': '',
              disabled: node.disabled,
              class: [n('option'), node.option.props?.class, { [n('--active')]: context.active }],
              'aria-pressed': node.children.length ? undefined : context.active,
              'aria-expanded': node.children.length ? context.expanded : undefined,
              onClick: (event: MouseEvent) => {
                if (node.disabled) {
                  return
                }
                if (node.children.length) {
                  expanded.value = context.expanded
                    ? expanded.value.filter((key) => key !== node.key)
                    : [...expanded.value, node.key]
                } else {
                  emit('select', node.key, event)
                }
              },
            },
          ),
          [
            content('icon'),
            h('span', { class: n('label') }, [content('label')]),
            content('extra'),
            node.children.length
              ? h('span', { class: [n('arrow'), { [n('--expanded')]: context.expanded }], 'aria-hidden': 'true' })
              : null,
          ],
        ),
        node.children.length && context.expanded ? h('ul', { class: n('options') }, node.children.map(render)) : null,
      ])
    }
    function navigate(event: KeyboardEvent) {
      if (!(event.target instanceof HTMLElement) || !event.target.hasAttribute('data-nav-option')) {
        return
      }
      const elements = Array.from(
        (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('[data-nav-option]:not(:disabled)'),
      )
      const index = elements.indexOf(event.target as HTMLButtonElement)
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? elements.length - 1
            : ['ArrowDown', isRtl.value ? 'ArrowLeft' : 'ArrowRight'].includes(event.key)
              ? (index + 1) % elements.length
              : ['ArrowUp', isRtl.value ? 'ArrowRight' : 'ArrowLeft'].includes(event.key)
                ? (index - 1 + elements.length) % elements.length
                : -1
      if (next >= 0) {
        event.preventDefault()
        event.stopPropagation()
        elements[next]?.focus()
      }
    }
    return () =>
      h(
        'ul',
        { ref: root, class: [n('options'), n(`options--${props.mode}`)], onKeydown: navigate },
        tree.value.roots.map(render),
      )
  },
})
