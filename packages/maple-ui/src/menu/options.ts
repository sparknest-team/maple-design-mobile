import { defineComponent, h, inject, type PropType, type Slots, type VNodeChild } from 'vue'
import { createNamespace } from '../utils/components'
import type { MenuOptionRenderers } from './branch-props'
import MenuBranch from './MenuBranch.vue'
import MenuOption from './MenuOption.vue'
import { menuProps } from './props'
import { createMenuTree, menuSelectionKey, type MenuNode } from './selection'
import type { MenuContent, MenuOptionData, MenuRenderContext } from './types'

function resolveContent(content: MenuContent | undefined, context: MenuRenderContext): VNodeChild {
  return typeof content === 'function' ? content(context) : content
}

function createRenderers(slots: Slots, names: { label: string }): MenuOptionRenderers {
  const render = (kind: 'label' | 'icon' | 'extra', option: MenuOptionData, active: boolean, level: number) => {
    const context: MenuRenderContext = { option, active, level }
    if (slots[kind]) {
      return slots[kind]?.(context)
    }
    const content = option[kind === 'label' ? names.label : kind] as MenuContent | undefined
    return resolveContent(content, context)
  }
  return {
    label: (option, active, level) => render('label', option, active, level),
    icon: (option, active, level) => render('icon', option, active, level),
    extra: (option, active, level) => render('extra', option, active, level),
    hasIcon: (option) => !!slots.icon || option.icon !== undefined,
    hasExtra: (option) => !!slots.extra || option.extra !== undefined,
  }
}

export default defineComponent({
  name: createNamespace('menu-options').name,
  props: {
    options: menuProps.options,
    fieldNames: menuProps.fieldNames,
    level: { type: Number, default: 0 },
    renderers: Object as PropType<MenuOptionRenderers>,
  },
  setup(props, { slots }) {
    const selection = inject(menuSelectionKey, undefined)
    const { n } = createNamespace('menu')
    const group = createNamespace('menu-group')
    return () => {
      const tree = createMenuTree(props.options, props.fieldNames)
      const renderers = props.renderers ?? createRenderers(slots, tree.names)
      const renderNode = (node: MenuNode, index: number): VNodeChild => {
        const option = node.raw as MenuOptionData
        const active = selection?.isSelected(node.value) ?? false
        const level = props.level + node.level
        if (node.type === 'divider') {
          return h('li', { key: index, role: 'separator', class: n('divider') })
        }
        if (node.type === 'group') {
          return h('li', { key: index, role: 'group', class: group.n() }, [
            h('div', { class: group.n('title') }, [renderers.label(option, active, level)]),
            h('ul', { role: 'group', class: group.n('list') }, node.children.map(renderNode)),
          ])
        }
        if (node.children.length) {
          return h(MenuBranch, {
            key: index,
            option,
            options: node.children.map((child) => child.raw),
            fieldNames: props.fieldNames,
            level,
            disabled: node.disabled,
            renderers,
          })
        }
        return h(
          MenuOption,
          {
            ...option.props,
            key: index,
            value: node.value,
            option,
            ripple: option.ripple,
            disabled: node.disabled,
          },
          {
            default: () => renderers.label(option, active, level),
            ...(renderers.hasIcon(option) ? { icon: () => renderers.icon(option, active, level) } : {}),
            ...(renderers.hasExtra(option) ? { suffix: () => renderers.extra(option, active, level) } : {}),
          },
        )
      }
      return tree.roots.map(renderNode)
    }
  },
})
