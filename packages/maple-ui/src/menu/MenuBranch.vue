<template>
  <MenuView :options="viewOptions" />
</template>

<script setup lang="ts">
import { computed, h, inject, nextTick, ref } from 'vue'
import type { TriggerInstance } from '../trigger'
import Trigger from '../trigger'
import { createNamespace } from '../utils/components'
import { menuDefaults, submenuTriggerAppearance } from './appearance'
import { menuBranchProps } from './branch-props'
import { menuInjectionKey } from './context'
import { useMenuKeyboard } from './keyboard'
import { useMenuLevel } from './level'
import MenuOption from './MenuOption.vue'
import MenuPanel from './MenuPanel.vue'
import MenuOptions from './options'
import MenuView from './render'
import { createMenuTree, menuSelectionKey } from './selection'

defineOptions({ name: createNamespace('menu-branch').name })
const props = defineProps(menuBranchProps)
const computedOpen = ref(false)
const triggerRef = ref<TriggerInstance>()
const panel = ref<InstanceType<typeof MenuPanel>>()
const selection = inject(menuSelectionKey, undefined)
const menu = inject(menuInjectionKey, undefined)
const trigger = computed(() => menu?.submenuTrigger.value ?? menuDefaults.submenuTrigger)
const disabled = computed(() => props.disabled || !!selection?.disabled.value)
function close() {
  computedOpen.value = false
}
function allowClose() {
  triggerRef.value?.allowClose?.()
}
const branch = { close, allowClose, focus: () => triggerRef.value?.focusReference?.() }
const { activate } = useMenuLevel(computedOpen, branch)
function open() {
  if (!disabled.value) {
    activate()
    computedOpen.value = true
  }
}
const keyboard = useMenuKeyboard({
  reference: () => triggerRef.value?.getReference?.(),
  panel: () => panel.value?.panel,
  visible: () => computedOpen.value,
  disabled: () => disabled.value,
  isTopLayer: (event) => triggerRef.value?.isTopLayer?.(event) ?? false,
  restoreFocus: () => triggerRef.value?.focusReference?.(),
  openKey: 'ArrowRight',
  open,
  close,
})
// Under click, hovering must not collapse a sibling the user opened on purpose.
function handleMouseenter() {
  if (trigger.value === 'hover') {
    activate()
  }
}
async function handleArrow(key: 'ArrowLeft' | 'ArrowRight') {
  if (key !== 'ArrowRight') {
    return
  }
  open()
  await nextTick()
  if (computedOpen.value) {
    keyboard.focus('ArrowDown')
  }
}
const viewOptions = computed(() => {
  const names = createMenuTree([], props.fieldNames).names
  const value = props.option[names.value] !== undefined ? props.option[names.value] : props.option[names.label]
  const active =
    selection
      ?.ancestors(selection.tree.value.flat.find((node) => selection.isSelected(node.value))?.value)
      .includes(props.option) ?? false
  return {
    kind: 'submenu',
    triggerComponent: Trigger,
    triggerRef,
    triggerProps: {
      ...submenuTriggerAppearance(),
      strategy: menu?.strategy.value ?? 'absolute',
      open: computedOpen.value,
      trigger: trigger.value,
      placement: 'right-start',
      unmountOnClose: true,
      disabled: disabled.value,
      escToClose: false,
      onOpenChange: (open: boolean) => {
        if (open) {
          activate()
        }
        computedOpen.value = open
      },
    },
    reference: () =>
      h(
        MenuOption,
        {
          ...props.option.props,
          value,
          option: props.option,
          ripple: props.option.ripple,
          active: computedOpen.value || active,
          childrenTrigger: true,
          disabled: disabled.value,
          'onKey-arrow-x': handleArrow,
          onMouseenter: handleMouseenter,
        },
        {
          default: () => props.renderers.label(props.option, active, props.level),
          ...(props.renderers.hasIcon(props.option)
            ? { icon: () => props.renderers.icon(props.option, active, props.level) }
            : {}),
          ...(props.renderers.hasExtra(props.option)
            ? { suffix: () => props.renderers.extra(props.option, active, props.level) }
            : {}),
        },
      ),
    panelComponent: MenuPanel,
    panelProps: { ref: panel, submenu: true },
    items: () =>
      h(MenuOptions, {
        options: props.options,
        fieldNames: props.fieldNames,
        level: props.level + 1,
        renderers: props.renderers,
      }),
  }
})
</script>
