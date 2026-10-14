<template>
  <DropdownMenuView :options="viewOptions">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </DropdownMenuView>
</template>

<script setup lang="ts">
import { computed, h, nextTick, provide, ref, useSlots, watch } from 'vue'
import type { TriggerInstance } from '../trigger'
import Trigger from '../trigger'
import { useTriggerState } from '../trigger/state'
import { createNamespace } from '../utils/components'
import { rootTriggerAppearance } from './appearance'
import { menuInjectionKey } from './context'
import DropdownMenuPanel from './DropdownMenuPanel.vue'
import { useMenuKeyboard } from './keyboard'
import { useMenuLevel } from './level'
import DropdownMenuOptions from './options'
import { dropdownMenuProps } from './props'
import DropdownMenuView from './render'
import { menuSelectionKey, useMenuSelection } from './selection'
import type { DropdownMenuReference } from './types'

defineOptions({ name: createNamespace('dropdown-menu').name })
const props = defineProps(dropdownMenuProps)
const slots = useSlots()
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
const panel = ref<InstanceType<typeof DropdownMenuPanel>>()
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
function setReference(reference?: DropdownMenuReference) {
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
  modelValue: computed(() => props.modelValue),
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
  panelComponent: DropdownMenuPanel,
  panelProps: { ref: panel, elevation: props.elevation },
  items: () =>
    h(
      DropdownMenuOptions,
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
