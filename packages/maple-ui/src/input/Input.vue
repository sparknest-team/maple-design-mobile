<template>
  <div
    v-bind="splitAttrs.root"
    :class="classes(n(), [mergedDisabled, n('--disabled')])"
    @mousedown="handleMousedown"
    @click="handleClick"
  >
    <FieldDecorator
      :id="inputId"
      :value="value"
      :variant="mergedVariant"
      :size="mergedSize"
      :disabled="mergedDisabled"
      :readonly="mergedReadonly"
      :error="mergedError"
      :focused="focused"
      :placeholder="placeholder"
      :hint="mergedHint"
      :line="line"
      :clearable="clearable"
      :composing="composition.isComposing.value"
      :text-color="textColor"
      :focus-color="focusColor"
      :blur-color="blurColor"
      @clear="handleClear"
    >
      <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
      <input
        v-bind="nativeAttrs"
        :id="inputId"
        ref="inputRef"
        :class="n('inner')"
        :value="value"
        :type="type === 'number' ? 'text' : type"
        :disabled="mergedDisabled"
        :readonly="mergedReadonly"
        :maxlength="undefined"
        :placeholder="mergedHint ? undefined : placeholder"
        :aria-label="ariaLabel ?? nativeAttrs['aria-label']"
        :aria-invalid="mergedError || nativeAttrs['aria-invalid'] || undefined"
        :autofocus="autofocus"
        :enterkeyhint="enterkeyhint"
        :inputmode="type === 'number' ? 'decimal' : nativeAttrs.inputmode"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="composition.start"
        @compositionend="handleCompositionEnd"
      />
      <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
      <template v-if="$slots.suffix || (maxLength && showWordLimit) || feedback" #suffix>
        <span v-if="maxLength && showWordLimit" :class="n('word-limit')">{{ valueLength }}/{{ maxLength }}</span>
        <slot name="suffix" />
        <InputFeedback :status="feedback" />
      </template>
    </FieldDecorator>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, useId, type InputHTMLAttributes } from 'vue'
import FieldDecorator, { fieldDecoratorProps } from '../field-decorator'
import { createNamespace } from '../utils/components'
import { useInputComposition } from '../utils/input-composition'
import InputFeedback from './InputFeedback.vue'
import { captureInputSelection, splitInputAttrs } from './native-attrs'
import { inputProps } from './props'
import type { InputEmits, InputSlots } from './types'
import { useInputForm } from './use-input-form'
import { useInputValue } from './use-input-value'

defineOptions({ name: createNamespace('input').name, inheritAttrs: false })
const props = defineProps(inputProps)
const emit = defineEmits<InputEmits>()
defineSlots<InputSlots>()
const { n, classes } = createNamespace('input')
const attrs = useAttrs()
const inputRef = ref<HTMLInputElement>()
const generatedId = useId()
const splitAttrs = computed(() => splitInputAttrs(attrs))
const nativeAttrs = computed(
  () => ({ ...splitAttrs.value.native, ...props.inputAttrs }) as InputHTMLAttributes & Record<string, unknown>,
)
const inputId = computed(() => String(nativeAttrs.value.id ?? generatedId))
const {
  group,
  mergedSize,
  mergedDisabled,
  mergedReadonly,
  mergedError: formError,
  feedback,
  eventHandlers,
  hasOuterLabel,
} = useInputForm(props)
const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'outline')
const mergedHint = computed(
  () => !hasOuterLabel.value && (props.hint ?? group?.hint.value ?? fieldDecoratorProps.hint.default),
)
const composition = useInputComposition()
const { value, focused, maxLength, errorOnly, valueLength, updateValue, commitValue, clearValue } = useInputValue(
  props,
  (nextValue) => emit('update:modelValue', nextValue),
  (nextValue, event) => {
    emit('change', nextValue, event)
    eventHandlers.value?.onChange?.(event)
  },
)
const mergedError = computed(
  () => formError.value || Boolean(errorOnly.value && maxLength.value > 0 && valueLength.value > maxLength.value),
)

function processInput(event: Event) {
  if (mergedDisabled.value || mergedReadonly.value) {
    return
  }
  const input = event.target as HTMLInputElement
  const restore = captureInputSelection(input)
  updateValue(input.value, (nextValue) => {
    emit('input', nextValue, event)
    eventHandlers.value?.onInput?.(event)
  })
  nextTick(() => restore(value.value))
}
function handleInput(event: Event) {
  if (composition.accepts(event)) {
    processInput(event)
  }
}
function handleCompositionEnd(event: CompositionEvent) {
  if (composition.end(event)) {
    processInput(event)
  }
}
function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
  eventHandlers.value?.onFocus?.(event)
}
function handleBlur(event: FocusEvent) {
  focused.value = false
  if (!mergedDisabled.value && !mergedReadonly.value) {
    commitValue(event)
  }
  emit('blur', event)
  eventHandlers.value?.onBlur?.(event)
}
function handleKeydown(event: KeyboardEvent) {
  emit('keydown', event)
  if (event.defaultPrevented) {
    return
  }
  if (
    event.key === 'Enter' &&
    !mergedDisabled.value &&
    !mergedReadonly.value &&
    !event.isComposing &&
    !composition.isComposing.value
  ) {
    commitValue(event)
    emit('press-enter', event)
  }
}
function handleClear(event: Event) {
  if (
    !props.clearable ||
    mergedDisabled.value ||
    mergedReadonly.value ||
    composition.isComposing.value ||
    !value.value
  ) {
    return
  }
  emit('clear', event)
  eventHandlers.value?.onClear?.(event)
  clearValue(event, (nextValue) => {
    emit('input', nextValue, event)
    eventHandlers.value?.onInput?.(event)
  })
  focus()
}
function handleClick(event: MouseEvent) {
  if (!mergedDisabled.value) {
    emit('click', event)
  }
}
function handleMousedown(event: MouseEvent) {
  if (mergedDisabled.value || event.target === inputRef.value) {
    return
  }
  const target = event.target as HTMLElement
  if (target.closest('button, a, [role="button"], input, textarea, select')) {
    return
  }
  event.preventDefault()
  focus()
}
function focus(options?: FocusOptions) {
  if (!mergedDisabled.value) {
    inputRef.value?.focus(options)
  }
}
function blur() {
  inputRef.value?.blur()
}
function select() {
  inputRef.value?.select()
}
onMounted(() => {
  if (props.autofocus) {
    focus()
  }
})
defineExpose({ inputRef, focus, blur, select })
</script>
