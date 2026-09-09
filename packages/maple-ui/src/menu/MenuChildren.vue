<template>
  <MenuView :options="viewOptions">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </MenuView>
</template>

<script setup lang="ts">
import { computed, h, inject, nextTick, ref, watch } from 'vue'
import type { TriggerInstance } from '../trigger'
import { useTriggerState } from '../trigger/state'
import { createNamespace } from '../utils/components'
import { useMenuKeyboard } from './keyboard'
import { useMenuLevel } from './level'
import MenuOption from './MenuOption.vue'
import MenuPanel from './MenuPanel.vue'
import MenuOptions from './options'
import { submenuTriggerAppearance, Trigger } from './platform'
import MenuView from './render'
import { createMenuTree, menuSelectionKey } from './selection'
import { menuSubmenuProps } from './submenu-props'

defineOptions({ name: createNamespace('menu-submenu').name })
const props = defineProps(menuSubmenuProps)
const emit = defineEmits(['update:open', 'open-change', 'key-arrow-x', 'key-arrow-right-open', 'mouseenter'])
const state = useTriggerState(props, emit)
const computedOpen = state.visible
const menu = ref<TriggerInstance>()
const panel = ref<InstanceType<typeof MenuPanel>>()
const selection = inject(menuSelectionKey, undefined)
const disabled = computed(() => props.disabled || !!selection?.disabled.value)
function close() {
  state.request(false)
}
function allowClose() {
  menu.value?.allowClose?.()
}
const branch = { close, allowClose, focus: () => menu.value?.focusReference?.() }
const { activate } = useMenuLevel(computedOpen, branch)
function open() {
  if (!disabled.value) {
    activate()
    state.request(true)
  }
}
const keyboard = useMenuKeyboard({
  reference: () => menu.value?.getReference?.(),
  panel: () => panel.value?.panel,
  visible: () => computedOpen.value,
  disabled: () => disabled.value,
  isTopLayer: (event) => menu.value?.isTopLayer?.(event) ?? false,
  restoreFocus: () => menu.value?.focusReference?.(),
  openKey: 'ArrowRight',
  open,
  close,
})
watch(
  () => props.parentShow,
  (value) => {
    if (value === false) {
      close()
    }
  },
)
async function handleArrow(key: 'ArrowLeft' | 'ArrowRight') {
  emit('key-arrow-x', key)
  if (key === 'ArrowRight') {
    emit('key-arrow-right-open')
    open()
    await nextTick()
    if (computedOpen.value) {
      keyboard.focus('ArrowDown')
    }
  }
}
function handleMouseenter() {
  activate()
  emit('mouseenter')
}
const viewOptions = computed(() => {
  const names = createMenuTree([], props.fieldNames).names
  const raw = props.option
  const value = raw?.[names.value] !== undefined ? raw[names.value] : raw?.[names.label]
  const highlight =
    selection
      ?.ancestors(selection.tree.value.flat.find((node) => selection.isSelected(node.value))?.value)
      .includes(raw!) ?? false
  return {
    kind: 'submenu',
    triggerComponent: Trigger,
    triggerRef: menu,
    triggerProps: {
      ...submenuTriggerAppearance(),
      open: computedOpen.value,
      trigger: props.trigger,
      placement: props.placement,
      unmountOnClose: props.unmountOnClose,
      disabled: disabled.value,
      escToClose: false,
      onOpenChange: (value: boolean) => {
        if (value) {
          activate()
        }
        state.request(value)
      },
    },
    reference: (slots: any) =>
      h(
        MenuOption,
        {
          ...props.optionProps,
          ...(raw ? { label: raw[names.label], value, option: raw, ripple: raw.ripple } : {}),
          active: computedOpen.value,
          highlight,
          childrenTrigger: true,
          uninjectContext: !raw && !props.selectable,
          disabled: disabled.value,
          'onKey-arrow-x': handleArrow,
          onMouseenter: handleMouseenter,
        },
        slots,
      ),
    panelComponent: MenuPanel,
    panelProps: { ref: panel, submenu: true },
    items: () => h(MenuOptions, { options: props.options, fieldNames: props.fieldNames }),
  }
})
defineExpose({ open, close, allowClose, menu, panel, computedOpen })
</script>
