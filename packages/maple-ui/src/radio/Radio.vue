<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { ChoiceLabel } from '../checkbox/choice-label'
import { useRadioControl } from '../checkbox/use-choice-control'
import { useChoiceKeyboard } from '../checkbox/use-choice-keyboard'
import { useChoiceNativeAttrs } from '../checkbox/use-choice-native-attrs'
import { useFormErrorDescription } from '../form/error-description'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { positiveLength } from '../utils/size-length'
import { radioGroupKey } from './context'
import { useRadioForm } from './form-adapter'
import { radioProps } from './props'
import type { RadioMethods, RadioModel } from './props'
import type { RadioSlots } from './types'
import { useRadioRegistration } from './use-radio-navigation'

defineOptions({ name: createNamespace('radio').name, inheritAttrs: false })
const { n, classes } = createNamespace('radio')
const vRipple = Ripple
const props = defineProps(radioProps)
defineSlots<RadioSlots>()
const emit = defineEmits<{
  'update:open': [open: boolean]
  'open-change': [open: boolean]
  'update:modelValue': [value: RadioModel]
  change: [value: RadioModel, event?: Event]
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
const group = props.uninjectGroupContext ? undefined : inject(radioGroupKey, undefined)
const { errorId, describe: describeError } = useFormErrorDescription()
const input = ref<HTMLInputElement>()
const { nativeAttrs, rootAttrs } = useChoiceNativeAttrs(() => props.inputAttrs)
const form = useRadioForm({
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
// A child cannot bypass group interaction restrictions.
const disabled = computed(() => Boolean(group?.disabled || form.mergedDisabled.value))
const readonly = computed(() => Boolean(group?.readonly || form.mergedReadonly.value))
const error = computed(() => Boolean(group?.error || form.mergedError.value))
const variant = computed(() => group?.variant ?? props.variant)
const { checked, select } = useRadioControl(
  props,
  (value, event) => {
    emit('update:modelValue', value)
    emit('change', value, event)
    form.eventHandlers.value.onChange?.(event)
  },
  () => disabled.value || readonly.value,
  group ? { value: () => group.value, change: group.handleChange } : undefined,
)
const tabIndex = useRadioRegistration(group?.navigation, {
  element: () => input.value,
  checked: () => checked.value,
  disabled: () => disabled.value,
  readonly: () => readonly.value,
  select,
})
const keyboard = useChoiceKeyboard(
  () => input.value?.click(),
  () => disabled.value || readonly.value,
)
const customStyle = computed(
  () =>
    ({
      '--mp-internal-radio-instance-checked': props.checkedColor,
      '--mp-internal-radio-instance-unchecked': props.uncheckedColor,
      '--mp-internal-radio-instance-size': positiveLength(props.iconSize, '') || undefined,
    }) as CSSProperties,
)
function restore() {
  group?.navigation.restore()
  if (input.value) {
    input.value.checked = checked.value
  }
}
watch(checked, restore)
let clickProposalPending = false
function handleClick(event: MouseEvent) {
  if (disabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  if (event.target !== input.value) {
    return
  }
  emit('click', event)
  if (readonly.value) {
    event.preventDefault()
    return
  }
  // Keep native activation uncanceled; canceled activation can roll back after
  // Vue's microtask flush. Commit once on click, including keyboard activation.
  clickProposalPending = true
  select(event)
  nextTick(() => {
    clickProposalPending = false
    restore()
  })
}
function handleChange(event: Event) {
  if (!clickProposalPending) {
    select(event)
  }
  nextTick(restore)
}
function handleFocus(event: FocusEvent) {
  emit('focus', event)
  form.eventHandlers.value.onFocus?.(event)
}
function handleBlur(event: FocusEvent) {
  keyboard.reset()
  emit('blur', event)
  form.eventHandlers.value.onBlur?.(event)
}
defineExpose<RadioMethods>({
  select,
  focus: (options) => {
    if (!disabled.value) {
      input.value?.focus(options)
    }
  },
  blur: () => input.value?.blur(),
})
</script>
<template>
  <label
    v-bind="rootAttrs"
    :class="
      classes(
        n(),
        [variant === 'button', n('--button')],
        [checked, n('--checked')],
        [disabled, n('--disabled')],
        [readonly, n('--readonly')],
        [error, n('--error')],
      )
    "
    :style="customStyle"
    @click="handleClick"
  >
    <input
      ref="input"
      v-bind="nativeAttrs"
      :class="n('input')"
      type="radio"
      autocomplete="off"
      :name="name ?? group?.name ?? nativeAttrs.name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :tabindex="tabIndex"
      :aria-label="ariaLabel ?? nativeAttrs['aria-label']"
      :aria-checked="checked"
      :aria-readonly="readonly || undefined"
      :aria-describedby="
        group?.formErrorId === errorId
          ? nativeAttrs['aria-describedby']
          : describeError(nativeAttrs['aria-describedby'])
      "
      :aria-invalid="error || nativeAttrs['aria-invalid'] || undefined"
      @change="handleChange"
      @keydown="keyboard.keydown"
      @keyup="keyboard.keyup"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="variant === 'button'" :class="n('button-label')"><slot :checked="checked" :disabled="disabled" /></span>
    <slot v-else name="radio" :checked="checked" :disabled="disabled">
      <choice-label v-if="group?.slots.radio" :content="group.slots.radio({ checked, disabled })" />
      <template v-else>
        <span v-ripple="{ disabled: disabled || readonly || !ripple }" :class="n('control')" aria-hidden="true">
          <slot v-if="checked" name="checked-icon"><span :class="n('icon')" /></slot>
          <slot v-else name="unchecked-icon"><span :class="n('icon')" /></slot>
        </span>
        <span v-if="$slots.default" :class="n('label')"><slot :checked="checked" :disabled="disabled" /></span>
      </template>
    </slot>
  </label>
</template>
