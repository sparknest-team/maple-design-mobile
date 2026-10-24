<template>
  <MenuView :options="viewOptions">
    <template v-if="$slots.default" #default><slot /></template>
    <template v-if="$slots.content" #content><slot name="content" /></template>
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </MenuView>
</template>

<script setup lang="ts">
import { computed, h, nextTick, provide, ref, watch } from 'vue'
import type { TriggerInstance } from '../trigger'
import Trigger from '../trigger'
import { useTriggerState } from '../trigger/state'
import { createNamespace } from '../utils/components'
import { rootTriggerAppearance } from './appearance'
import { menuInjectionKey } from './context'
import { useMenuKeyboard } from './keyboard'
import { useMenuLevel } from './level'
import MenuPanel from './MenuPanel.vue'
import MenuOptions from './options'
import { menuProps } from './props'
import MenuView from './render'
import { menuSelectionKey, useMenuSelection } from './selection'
import type { MenuReference, MenuSlots } from './types'

defineOptions({ name: createNamespace('menu').name })
const props = defineProps(menuProps)
const slots = defineSlots<MenuSlots>()
const emit = defineEmits([
  'open-change',
  'select',
  'update:open',
  'update:modelValue',
  'key-escape',
  'open',
  'opened',
  'close',
  'closed',
  'click-outside',
])
const state = useTriggerState(props, emit)
const computedOpen = state.visible
const menu = ref<TriggerInstance>()
const panel = ref<InstanceType<typeof MenuPanel>>()
useMenuLevel(computedOpen)
function open() {
  if (!props.disabled) {
    state.request(true)
  }
}
function close() {
  state.request(false)
}
function resize() {
  menu.value?.resize?.()
}
function setReference(reference?: MenuReference) {
  menu.value?.setReference?.(reference as any)
}
const selection = useMenuSelection(props, (value, option, event, selectedValue) => {
  emit('update:modelValue', value)
  emit('select', selectedValue, option, event)
  if (props.hideOnSelect) {
    close()
    nextTick(() => {
      if (!computedOpen.value) {
        menu.value?.focusReference?.()
      }
    })
  }
})
provide(menuSelectionKey, selection)
provide(menuInjectionKey, {
  strategy: computed(() => props.strategy),
  popupMaxHeight: computed(() => props.popupMaxHeight),
  modelValue: selection.modelValue,
  submenuTrigger: computed(() => props.submenuTrigger),
  onOptionClick: selection.select,
})
useMenuKeyboard({
  reference: () => menu.value?.getReference?.(),
  panel: () => panel.value?.panel,
  visible: () => computedOpen.value,
  disabled: () => props.disabled,
  isTopLayer: (event) => menu.value?.isTopLayer?.(event) ?? false,
  restoreFocus: () => menu.value?.focusReference?.(),
  open,
  close,
  escape: () => emit('key-escape'),
})
watch(
  () => [props.offsetX, props.offsetY],
  () =>
    nextTick(() => {
      if (computedOpen.value) {
        resize()
      }
    }),
)
const viewOptions = computed(() => ({
  kind: 'root',
  triggerComponent: Trigger,
  triggerRef: menu,
  triggerProps: {
    ...rootTriggerAppearance(props),
    open: computedOpen.value,
    trigger: props.trigger,
    unmountOnClose: props.unmountOnClose,
    escToClose: false,
    onOpenChange: state.request,
    onOpen: () => emit('open'),
    onOpened: () => emit('opened'),
    onClose: () => emit('close'),
    onClosed: () => emit('closed'),
    onClickOutside: (event: Event) => emit('click-outside', event),
  },
  panelComponent: MenuPanel,
  panelProps: { ref: panel, elevation: props.elevation },
  items: () =>
    h(
      MenuOptions,
      { options: props.options, fieldNames: props.fieldNames },
      {
        label: slots['option-label'],
        icon: slots['option-icon'],
        extra: slots['option-extra'],
      },
    ),
}))
defineExpose({ open, close, resize, setReference, menu, panel, computedOpen })
</script>
