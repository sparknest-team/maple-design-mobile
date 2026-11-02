<template>
  <label
    :class="
      classes(
        n(),
        [checked, n('--checked')],
        [indeterminate, n('--indeterminate')],
        [mergedDisabled, n('--disabled')],
        [mergedReadonly, n('--readonly')],
        [mergedError, n('--error')],
      )
    "
    :style="controlStyle"
    :aria-disabled="mergedDisabled || undefined"
    @click="handleClick"
  >
    <input
      ref="input"
      :class="n('input')"
      type="checkbox"
      autocomplete="off"
      :name="name ?? group?.name"
      :value="value"
      :checked="checked"
      :indeterminate="indeterminate"
      :disabled="mergedDisabled"
      :aria-label="ariaLabel"
      :aria-checked="indeterminate ? 'mixed' : checked"
      :aria-readonly="mergedReadonly || undefined"
      :aria-invalid="mergedError || undefined"
      @change="handleChange"
      @keydown="keyboard.keydown"
      @keyup="keyboard.keyup"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-ripple="{ disabled: mergedDisabled || mergedReadonly || !ripple }"
      :class="n('control')"
      :aria-hidden="customControl ? undefined : true"
    >
      <choice-label
        v-if="customControl"
        :content="customControl({ checked, disabled: mergedDisabled, indeterminate })"
      />
      <template v-else>
        <slot v-if="indeterminate" name="indeterminate-icon">
          <span :class="n('icon')"><span :class="n('mark')" /></span>
        </slot>
        <slot v-else-if="checked" name="checked-icon">
          <span :class="n('icon')">
            <svg :class="n('check')" viewBox="0 0 12 12" focusable="false">
              <path d="M2 6l2.5 2.5L10 3" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
          </span>
        </slot>
        <slot v-else name="unchecked-icon"><span :class="n('icon')" /></slot>
      </template>
    </span>
    <span v-if="$slots.default" :class="n('label')"><slot :checked="checked" /></span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref, useSlots, watch, type CSSProperties } from 'vue'
import vRipple from '../ripple'
import { createNamespace } from '../utils/components'
import { ChoiceLabel } from './choice-label'
import type { CheckboxModel } from './choice-value-props'
import { checkboxGroupKey } from './context'
import { checkboxProps } from './props'
import { useChoiceRegistration } from './use-checkbox-group-methods'
import { useCheckboxControl } from './use-choice-control'
import { useChoiceForm } from './use-choice-form'
import { useChoiceKeyboard } from './use-choice-keyboard'

defineOptions({ name: createNamespace('checkbox').name })
const { n, classes } = createNamespace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits<{
  'update:modelValue': [value: CheckboxModel]
  change: [value: CheckboxModel, event?: Event]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const slots = useSlots()
const group = !props.uninjectGroupContext ? inject(checkboxGroupKey, undefined) : undefined
const input = ref<HTMLInputElement>()
const state = useChoiceForm({
  get disabled() {
    return props.disabled ?? group?.disabled
  },
  get readonly() {
    return props.readonly ?? group?.readonly
  },
  get error() {
    return props.error ?? group?.error
  },
})
const mergedDisabled = computed(() =>
  Boolean(group?.disabled || state.mergedDisabled.value || (!checked.value && group?.isMaxed)),
)
const mergedReadonly = computed(() => Boolean(group?.readonly || state.mergedReadonly.value))
const mergedError = computed(() => Boolean(group?.error || state.mergedError.value))
const { checked, toggle } = useCheckboxControl(
  props,
  (value, event) => {
    emit('update:modelValue', value)
    emit('change', value, event)
    state.eventHandlers.value?.onChange?.(event)
  },
  () => mergedDisabled.value || mergedReadonly.value,
  group ? { value: () => group.computedValue, change: group.handleChange } : undefined,
)
useChoiceRegistration(group?.registerChoice, {
  value: () => props.value,
  disabled: () => Boolean(group?.disabled || state.mergedDisabled.value),
  readonly: () => mergedReadonly.value,
  element: () => input.value,
})
const customControl = computed(() => slots.checkbox ?? group?.slots.checkbox)
const controlStyle = computed<CSSProperties>(() => ({
  '--mp-internal-checkbox-instance-checked-color': props.checkedColor,
  '--mp-internal-checkbox-instance-unchecked-color': props.uncheckedColor,
  '--mp-internal-checkbox-instance-size': typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize,
}))
const keyboard = useChoiceKeyboard(
  () => input.value?.click(),
  () => mergedDisabled.value || mergedReadonly.value,
)
function handleClick(event: MouseEvent) {
  if (mergedDisabled.value || mergedReadonly.value) {
    event.preventDefault()
    if (!mergedDisabled.value) {
      emit('click', event)
    }
    return
  }
  if (event.target === input.value) {
    event.stopPropagation()
    emit('click', event)
    return
  }
  // Preserve embedded links/buttons. Forward decorative/label clicks once.
  const target = event.target as HTMLElement
  if (target.closest('button, a, input, select, textarea, [contenteditable="true"]')) {
    return
  }
  event.preventDefault()
  input.value?.focus()
  input.value?.click()
}
function handleChange(event: Event) {
  if (!mergedDisabled.value && !mergedReadonly.value) {
    toggle((event.target as HTMLInputElement).checked, event)
  }
  nextTick(() => {
    if (input.value) {
      input.value.checked = checked.value
      input.value.indeterminate = props.indeterminate
    }
  })
}
function handleFocus(event: FocusEvent) {
  emit('focus', event)
  state.eventHandlers.value?.onFocus?.(event)
}
function handleBlur(event: FocusEvent) {
  keyboard.reset()
  emit('blur', event)
  state.eventHandlers.value?.onBlur?.(event)
}
watch(checked, (value) => {
  if (input.value) {
    input.value.checked = value
  }
})
defineExpose({
  toggle,
  focus(options?: FocusOptions) {
    if (!mergedDisabled.value) {
      input.value?.focus(options)
    }
  },
  blur() {
    input.value?.blur()
  },
})
</script>
