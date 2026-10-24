<template>
  <MenuView :options="viewOptions">
    <template v-if="$slots.default" #default><slot v-bind="renderContext" /></template>
    <template v-if="$slots.icon" #icon><slot name="icon" v-bind="renderContext" /></template>
    <template v-if="$slots.suffix" #suffix><slot name="suffix" v-bind="renderContext" /></template>
  </MenuView>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useEventListener } from '@maple-design/use'
import { createNamespace } from '../utils/components'
import { useOptionAppearance } from './appearance'
import { menuInjectionKey, menuLevelKey, menuRenderLevelKey } from './context'
import { props as optionProps } from './option-props'
import MenuView from './render'
import { menuSelectionKey } from './selection'
import type { MenuOptionSlots, MenuRenderContext } from './types'

defineOptions({ name: createNamespace('menu-option').name })
const props = defineProps(optionProps)
const emit = defineEmits(['click', 'key-arrow-x'])
const slots = defineSlots<MenuOptionSlots>()
const renderLevel = inject(menuRenderLevelKey, undefined)
const root = ref<HTMLElement>()
const isFocusing = ref(false)
const selection = props.uninjectContext ? undefined : inject(menuSelectionKey, undefined)
const level = inject(menuLevelKey, undefined)
const context = props.uninjectContext ? undefined : inject(menuInjectionKey, undefined)
const value = computed(() =>
  props.value !== undefined
    ? props.value
    : typeof props.label === 'function'
      ? undefined
      : (props.label ?? root.value?.textContent ?? undefined),
)
const optionSelected = computed(
  () => selection?.isSelected(value.value) ?? (value.value !== undefined && context?.modelValue?.value === value.value),
)
const disabled = computed(() => props.disabled || !!selection?.disabled.value)
const size = computed(() => selection?.size.value ?? 'md')
const renderContext = computed<MenuRenderContext>(() => ({
  option: props.option ?? { label: props.label, value: props.value, disabled: props.disabled, ripple: props.ripple },
  active: !!optionSelected.value,
  level: renderLevel?.value ?? 0,
}))
const labelVNode = computed(() => (typeof props.label === 'function' ? props.label(renderContext.value) : props.label))
function handleSelect(event: Event) {
  if (disabled.value || props.childrenTrigger) {
    return
  }
  const option = props.option ?? {
    value: value.value,
    label: props.label,
    disabled: disabled.value,
    ripple: props.ripple,
  }
  if (selection) {
    selection.select(value.value, option, event)
  } else {
    context?.onOptionClick(value.value, option, event)
  }
}
function handleClick(event: MouseEvent) {
  if (!disabled.value) {
    emit('click', event)
    handleSelect(event)
  }
}
// Local row handlers also support standalone options. The panel handles navigation.
function handleKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || disabled.value || !isFocusing.value) {
    return
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    // A submenu's panel owns ArrowLeft; only references consume ArrowRight.
    if (event.key === 'ArrowLeft' && level?.leave) {
      event.preventDefault()
      level.leave()
    }
    if (event.key === 'ArrowRight' && props.childrenTrigger) {
      event.preventDefault()
      emit('key-arrow-x', event.key)
    }
    return
  }
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
  }
  if (event.key === 'Enter') {
    root.value?.click()
  }
}
function handleKeyup(event: KeyboardEvent) {
  if (!event.defaultPrevented && !disabled.value && isFocusing.value && event.key === ' ') {
    event.preventDefault()
    root.value?.click()
  }
}
useEventListener(() => root.value?.ownerDocument.defaultView, 'keydown', handleKeydown)
useEventListener(() => root.value?.ownerDocument.defaultView, 'keyup', handleKeyup)
const appearance = useOptionAppearance(props, { optionSelected, disabled, size, isFocusing, labelVNode }, slots)
const viewOptions = computed(() => ({
  kind: 'option',
  ...appearance.value,
  rootRef: root,
  selected: optionSelected.value,
  disabled: disabled.value,
  onClick: handleClick,
  onFocus: () => {
    isFocusing.value = true
  },
  onBlur: () => {
    isFocusing.value = false
  },
}))
defineExpose({ root, isFocusing, optionSelected, handleClick, handleSelect })
</script>
