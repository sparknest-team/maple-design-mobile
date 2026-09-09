import { defineComponent, h, inject } from 'vue'
import { createNamespace } from '../utils/components'
import { menuLevelKey } from './context'
import MenuSubmenu from './MenuChildren.vue'
import MenuOption from './MenuOption.vue'
import { menuProps } from './props'
import { createMenuTree, menuSelectionKey } from './selection'

export default defineComponent({
  name: createNamespace('menu-options').name,
  props: { options: menuProps.options, fieldNames: menuProps.fieldNames },
  setup(props) {
    const selection = inject(menuSelectionKey, undefined)
    const level = inject(menuLevelKey, undefined)
    return () =>
      createMenuTree(props.options, props.fieldNames).roots.map((node, index) => {
        const names = selection?.tree.value.names ?? createMenuTree([], props.fieldNames).names
        const label = node.raw[names.label]
        return node.children.length
          ? h(MenuSubmenu, {
              key: index,
              option: node.raw,
              options: node.raw[names.children],
              fieldNames: props.fieldNames,
              disabled: node.disabled,
              selectable: true,
            })
          : h(MenuOption, {
              key: index,
              value: node.value,
              label,
              option: node.raw,
              ripple: node.raw.ripple,
              disabled: node.disabled,
              onMouseenter: () => level?.activate(),
            })
      })
  },
})
