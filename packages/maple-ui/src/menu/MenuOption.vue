<template>
  <MenuView :options="viewOptions">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </MenuView>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, useSlots } from 'vue'
import { useEventListener } from '@maplejs/maple-use'
import { createNamespace } from '../utils/components'
import { menuInjectionKey, menuLevelKey } from './context'
import { props as optionProps } from './option-props'
import { checkboxActivation, useOptionAppearance } from './platform'
import MenuView from './render'
import { menuSelectionKey } from './selection'

defineOptions({ name: createNamespace('menu-option').name })
const props = defineProps(optionProps)
const emit = defineEmits(['click', 'key-arrow-x'])
const slots = useSlots()
const root = ref<HTMLElement>()
const checkbox = ref<{ isFocusing?: boolean }>()
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
const optionIndeterminate = computed(() => selection?.isIndeterminate(value.value) ?? false)
const disabled = computed(() => props.disabled || !!selection?.disabled.value)
const multiple = computed(() => selection?.multiple.value ?? false)
const size = computed(() => selection?.size.value ?? 'md')
const unregister = selection?.register(() => value.value)
onBeforeUnmount(() => unregister?.())
const labelVNode = computed(() =>
  typeof props.label === 'function'
    ? props.label(
        props.option ?? { label: props.label, value: props.value, disabled: props.disabled, ripple: props.ripple },
        optionSelected.value,
      )
    : props.label,
)
function handleSelect(event: Event) {
  if (disabled.value || (!multiple.value && props.childrenTrigger)) {
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
  if (event.defaultPrevented || disabled.value || (!isFocusing.value && !checkbox.value?.isFocusing)) {
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
  if (!isFocusing.value) {
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
const appearance = useOptionAppearance(
  props,
  { optionSelected, optionIndeterminate, disabled, multiple, size, isFocusing, labelVNode },
  slots,
)
const viewOptions = computed(() => ({
  kind: 'option',
  ...appearance.value,
  rootRef: root,
  checkboxRef: checkbox,
  multiple: multiple.value,
  selected: optionSelected.value,
  indeterminate: optionIndeterminate.value,
  disabled: disabled.value,
  checkboxProps: {
    ...appearance.value.checkboxProps,
    modelValue: optionSelected.value,
    indeterminate: optionIndeterminate.value,
    disabled: disabled.value,
    onClick: (event: Event) => {
      event.stopPropagation()
      if (checkboxActivation === 'click') {
        handleSelect(event)
      }
    },
    onChange: (_value: unknown, event: Event) => {
      if (checkboxActivation === 'change') {
        handleSelect(event)
      }
    },
  },
  onClick: handleClick,
  onFocus: () => {
    isFocusing.value = true
  },
  onBlur: () => {
    isFocusing.value = false
  },
}))
defineExpose({ root, checkbox, isFocusing, optionSelected, optionIndeterminate, handleClick, handleSelect })
</script>
