<template>
  <MenuView :options="viewOptions">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </MenuView>
</template>

<script setup lang="ts">
import { computed, inject, ref, unref, useSlots } from 'vue'
import { createNamespace } from '../utils/components'
import { panelAppearance } from './appearance'
import { menuInjectionKey } from './context'
import MenuView from './render'

defineOptions({ name: createNamespace('menu-panel').name })
const props = defineProps({
  bottomOffset: { type: Number, default: 0 },
  elevation: { type: [Boolean, Number], default: true },
  submenu: Boolean,
})
const emit = defineEmits(['scroll', 'reach-bottom'])
const slots = useSlots()
const context = inject(menuInjectionKey, undefined)
const panel = ref<HTMLElement>()
const style = computed(() => {
  const height = unref(context?.popupMaxHeight) ?? true
  return typeof height === 'number'
    ? { maxHeight: `${height}px` }
    : !height
      ? { maxHeight: 'none', overflowY: 'hidden' as const }
      : undefined
})
function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  if (target.scrollHeight - target.scrollTop - target.offsetHeight <= props.bottomOffset) {
    emit('reach-bottom', event)
  }
  emit('scroll', event)
}
const viewOptions = computed(() => ({
  kind: 'panel',
  ...panelAppearance(props, slots, style.value),
  rootRef: panel,
  onScroll: handleScroll,
}))
defineExpose({ panel, handleScroll })
</script>
