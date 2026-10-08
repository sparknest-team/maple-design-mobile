<template>
  <div
    v-bind="splitAttrs.root"
    :class="
      classes(
        n(),
        n(`--mode-${mode}`),
        n(`--size-${mergedSize}`),
        [mergedDisabled, n('--disabled')],
        [mergedReadonly, n('--readonly')],
      )
    "
  >
    <div v-if="$slots.prepend" :class="[n('addon'), n('prepend')]"><slot name="prepend" /></div>
    <FieldDecorator
      :id="inputId"
      :class="n('field')"
      :value="text"
      :size="mergedSize"
      :variant="mergedVariant"
      :disabled="mergedDisabled"
      :readonly="mergedReadonly"
      :error="mergedError"
      :focused="focused"
      :hint="mergedHint"
      :placeholder="placeholder"
      :clearable="clearable"
      :composing="composition.isComposing.value"
      @clear="handleClear"
      @mousedown="handleMousedown"
    >
      <template v-if="(mode === 'button' && !mergedReadonly) || $slots.prefix" #prefix>
        <InputNumberStep
          v-if="mode === 'button' && !mergedReadonly"
          method="minus"
          :disabled="mergedDisabled || isMin"
          :label="t('common.decrease')"
          @step="handleStep"
          @stop="stop"
        >
          <template v-if="$slots.minus" #default><slot name="minus" /></template>
        </InputNumberStep>
        <span v-if="$slots.prefix" :class="n('prefix')"><slot name="prefix" /></span>
      </template>
      <input
        v-bind="nativeAttrs"
        :id="inputId"
        ref="inputRef"
        :class="n('input')"
        type="text"
        role="spinbutton"
        :value="text"
        :disabled="mergedDisabled"
        :readonly="mergedReadonly"
        :placeholder="mergedHint ? undefined : placeholder"
        :aria-valuemin="Number.isFinite(min) ? min : undefined"
        :aria-valuemax="Number.isFinite(max) ? max : undefined"
        :aria-valuenow="number"
        :aria-valuetext="text || undefined"
        :aria-invalid="mergedError || nativeAttrs['aria-invalid'] || undefined"
        :inputmode="nativeAttrs.inputmode ?? 'decimal'"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @compositionstart="composition.start"
        @compositionend="handleCompositionEnd"
      />
      <template v-if="$slots['clear-icon']" #clear-icon="scope"><slot name="clear-icon" v-bind="scope" /></template>
      <template v-if="$slots.suffix || feedback || (mode !== 'input' && !mergedReadonly)" #suffix>
        <span v-if="$slots.suffix" :class="n('suffix')"><slot name="suffix" /></span>
        <InputFeedback :status="feedback" />
        <div v-if="mode === 'embed' && !mergedReadonly" :class="n('step')">
          <InputNumberStep
            method="plus"
            compact
            :disabled="mergedDisabled || isMax"
            :label="t('common.increase')"
            @step="handleStep"
            @stop="stop"
          >
            <template v-if="$slots.plus" #default><slot name="plus" /></template>
          </InputNumberStep>
          <InputNumberStep
            method="minus"
            compact
            :disabled="mergedDisabled || isMin"
            :label="t('common.decrease')"
            @step="handleStep"
            @stop="stop"
          >
            <template v-if="$slots.minus" #default><slot name="minus" /></template>
          </InputNumberStep>
        </div>
        <InputNumberStep
          v-else-if="mode === 'button' && !mergedReadonly"
          method="plus"
          :disabled="mergedDisabled || isMax"
          :label="t('common.increase')"
          @step="handleStep"
          @stop="stop"
        >
          <template v-if="$slots.plus" #default><slot name="plus" /></template>
        </InputNumberStep>
      </template>
    </FieldDecorator>
    <div v-if="$slots.append" :class="[n('addon'), n('append')]"><slot name="append" /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useId, watch, type InputHTMLAttributes } from 'vue'
import FieldDecorator, { fieldDecoratorProps } from '../field-decorator'
import { useFieldLocale } from '../field-decorator/use-field-locale'
import InputFeedback from '../input/InputFeedback.vue'
import { captureInputSelection, splitInputAttrs } from '../input/native-attrs'
import { useInputForm } from '../input/use-input-form'
import { createNamespace } from '../utils/components'
import { useInputComposition } from '../utils/input-composition'
import InputNumberStep from './InputNumberStep.vue'
import type { StepMethod } from './number-arithmetic'
import { inputNumberProps } from './props'
import { useNumberValue } from './use-number-value'
import { useStepRepeat } from './use-step-repeat'

defineOptions({ name: createNamespace('input-number').name, inheritAttrs: false })
const props = defineProps(inputNumberProps)
const emit = defineEmits<{
  'update:modelValue': [value: number | undefined]
  input: [value: number | undefined, text: string, event: Event]
  change: [value: number | undefined, event: Event]
  clear: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}>()
const { n, classes } = createNamespace('input-number')
const { t } = useFieldLocale()
const { group, mergedSize, mergedDisabled, mergedReadonly, mergedError, feedback, eventHandlers, hasOuterLabel } =
  useInputForm(props)
const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'outline')
const mergedHint = computed(
  () => !hasOuterLabel.value && (props.hint ?? group?.hint.value ?? fieldDecoratorProps.hint.default),
)
const blocked = computed(() => mergedDisabled.value || mergedReadonly.value)
const inputRef = ref<HTMLInputElement>()
const focused = ref(false)
const attrs = useAttrs()
const splitAttrs = computed(() => splitInputAttrs(attrs))
const nativeAttrs = computed(() => ({ ...splitAttrs.value.native, ...props.inputAttrs }) as InputHTMLAttributes)
const generatedId = useId()
const inputId = computed(() => nativeAttrs.value.id ?? generatedId)
const composition = useInputComposition()
const { text, number, isMin, isMax, edit, commit, step, clear } = useNumberValue(props, blocked, {
  update: (value) => emit('update:modelValue', value),
  input: (value, text, event) => {
    emit('input', value, text, event)
    eventHandlers.value?.onInput?.(event)
  },
  change: (value, event) => {
    emit('change', value, event)
    eventHandlers.value?.onChange?.(event)
  },
  clear: (event) => {
    emit('clear', event)
    eventHandlers.value?.onClear?.(event)
  },
})
const { start, stop } = useStepRepeat()
watch(() => [blocked.value, props.mode], stop)
function processInput(event: Event) {
  const input = event.target as HTMLInputElement
  const restoreSelection = captureInputSelection(input)
  edit(input.value, event)
  nextTick(() => {
    restoreSelection(text.value)
    input.value = text.value
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
  stop()
  if (!composition.isComposing.value) {
    commit(event)
  }
  emit('blur', event)
  eventHandlers.value?.onBlur?.(event)
}
function handleClear(event: Event) {
  clear(event)
  focus()
}
function handleStep(method: StepMethod, event: Event, repeat = false) {
  stop()
  if (blocked.value || composition.isComposing.value) {
    return
  }
  focus()
  if (step(method, event) && repeat) {
    start(() => step(method, event), inputRef.value?.ownerDocument.defaultView)
  }
}
function handleKeydown(event: KeyboardEvent) {
  emit('keydown', event)
  if (event.defaultPrevented || blocked.value || event.isComposing || composition.isComposing.value) {
    return
  }
  if (event.key === 'Enter') {
    commit(event)
  }
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
    handleStep(event.key === 'ArrowUp' ? 'plus' : 'minus', event)
  }
}
function handleMousedown(event: MouseEvent) {
  if (mergedDisabled.value || event.target === inputRef.value) {
    return
  }
  if ((event.target as HTMLElement).closest('button, a, input, textarea, select, [role="button"]')) {
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
defineExpose({ inputRef, focus, blur, select })
</script>
