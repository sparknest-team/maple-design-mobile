<template>
  <div
    v-bind="splitAttrs.root"
    :class="classes(n(), [mergedDisabled, n('--disabled')], [resolvedAutoSize, n('--auto-size')])"
    @mousedown="handleMousedown"
  >
    <FieldDecorator
      :id="textareaId"
      :loading="loading"
      :loading-mode="loadingMode"
      :value="value"
      :variant="mergedVariant"
      :size="mergedSize"
      :disabled="mergedDisabled"
      :readonly="mergedReadonly"
      :error="mergedError"
      :focused="focused"
      :placeholder="placeholder"
      :hint="mergedHint"
      :hint-center="false"
      :line="line"
      :clearable="clearable"
      :composing="composition.isComposing.value"
      :text-color="textColor"
      :focus-color="focusColor"
      :blur-color="blurColor"
      @clear="handleClear"
    >
      <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
      <div v-if="resolvedAutoSize" ref="mirrorRef" :class="n('mirror')" :style="mirrorStyle" aria-hidden="true">
        {{ `${value}\n` }}
      </div>
      <textarea
        v-bind="nativeAttrs"
        :id="textareaId"
        ref="textareaRef"
        :aria-busy="loading || undefined"
        autocomplete="off"
        :class="n('inner')"
        :style="textareaStyle"
        :value="composition.isComposing.value ? textareaRef?.value : value"
        :disabled="mergedDisabled"
        :readonly="mergedReadonly"
        :rows="nativeRows"
        :maxlength="undefined"
        :placeholder="mergedHint ? undefined : placeholder"
        :aria-label="ariaLabel ?? nativeAttrs['aria-label']"
        :aria-describedby="describeError(nativeAttrs['aria-describedby'])"
        :aria-invalid="mergedError ? true : nativeAttrs['aria-invalid']"
        :autofocus="autofocus"
        :enterkeyhint="enterkeyhint"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @compositionstart="composition.start"
        @compositionend="handleCompositionEnd"
      />
      <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
      <template v-if="$slots.suffix || feedback" #suffix
        ><slot name="suffix" /><InputFeedback :status="feedback"
      /></template>
    </FieldDecorator>
    <div v-if="maxLength && showWordLimit" :class="n('word-limit')">{{ valueLength }}/{{ maxLength }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
  useAttrs,
  type CSSProperties,
  type TextareaHTMLAttributes,
} from 'vue'
import FieldDecorator, { fieldDecoratorProps } from '../field-decorator'
import { useFormErrorDescription } from '../form/error-description'
import InputFeedback from '../input/InputFeedback.vue'
import { captureInputSelection, splitInputAttrs } from '../input/native-attrs'
import { useInputForm } from '../input/use-input-form'
import { useInputValue } from '../input/use-input-value'
import { createNamespace } from '../utils/components'
import { useInputComposition } from '../utils/input-composition'
import { useId } from '../utils/vue-compat'
import { textareaProps } from './props'
import type { TextareaEmits, TextareaSlots } from './types'
import { useTextareaAutoSize } from './use-textarea-auto-size'
import { getNativeTextareaAttrs, resolveTextareaAutoSize, resolveTextareaRows } from './utils'

defineOptions({ name: createNamespace('textarea').name, inheritAttrs: false })
const { n, classes } = createNamespace('textarea')
const props = defineProps(textareaProps)
const { describe: describeError } = useFormErrorDescription()
const resolvedAutoSize = computed(() => resolveTextareaAutoSize(props.autoSize))
const nativeRows = computed(() => resolveTextareaRows(props.rows))
const emit = defineEmits<TextareaEmits>()
defineSlots<TextareaSlots>()
const attrs = useAttrs()
const textareaRef = ref<HTMLTextAreaElement>()
const mirrorRef = ref<HTMLElement>()
const generatedId = useId()
const splitAttrs = computed(() => splitInputAttrs(attrs, ['cols', 'wrap', 'dirname']))
const nativeAttrs = computed(
  () =>
    getNativeTextareaAttrs({ ...splitAttrs.value.native, ...props.textareaAttrs }) as TextareaHTMLAttributes &
      Record<string, unknown>,
)
const textareaId = computed(() => String(nativeAttrs.value.id ?? generatedId))
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
  reactive({ ...toRefs(props), type: 'text' }),
  (nextValue, notifyModel = true) => {
    if (notifyModel) {
      emit('update:modelValue', nextValue)
    }
  },
  (nextValue, event) => {
    emit('change', nextValue, event)
    eventHandlers.value?.onChange?.(event)
  },
)
const mergedError = computed(
  () => formError.value || Boolean(errorOnly.value && maxLength.value > 0 && valueLength.value > maxLength.value),
)
const { mirrorStyle, autoSizeStyle } = useTextareaAutoSize(textareaRef, mirrorRef, value, () => resolvedAutoSize.value)
const textareaStyle = computed<CSSProperties>(() => ({
  resize: resolvedAutoSize.value ? 'none' : props.resize ? 'vertical' : 'none',
  ...autoSizeStyle.value,
  '--mp-textarea-placeholder-color':
    !mergedHint.value && !mergedDisabled.value && !mergedError.value
      ? focused.value
        ? props.focusColor
        : props.blurColor
      : undefined,
}))
function processInput(event: Event) {
  if (mergedDisabled.value || mergedReadonly.value) {
    return
  }
  const input = event.target as HTMLTextAreaElement
  const restore = captureInputSelection(input)
  const isCurrent = composition.capture()
  updateValue(input.value, (nextValue) => {
    emit('input', nextValue ?? '', event)
    eventHandlers.value?.onInput?.(event)
  })
  void nextTick(() => {
    if (isCurrent() && textareaRef.value === input) {
      restore(value.value)
    }
  })
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
    emit('input', nextValue ?? '', event)
    eventHandlers.value?.onInput?.(event)
  })
  focus()
}
function handleMousedown(event: MouseEvent) {
  if (mergedDisabled.value || event.target === textareaRef.value) {
    return
  }
  if ((event.target as HTMLElement).closest('button, a, [role="button"], input, textarea, select')) {
    return
  }
  event.preventDefault()
  focus()
}
function focus(options?: FocusOptions) {
  if (!mergedDisabled.value) {
    textareaRef.value?.focus(options)
  }
}
function blur() {
  textareaRef.value?.blur()
}
function select() {
  textareaRef.value?.select()
}
onMounted(() => {
  if (props.autofocus) {
    focus()
  }
})
defineExpose({ textareaRef, focus, blur, select })
</script>
