<template>
  <div
    v-bind="splitAttrs.root"
    :class="classes(n(), [mergedDisabled, n('--disabled')])"
    @mousedown="handleMousedown"
    @click="handleClick"
  >
    <FieldPresentation
      :id="inputId"
      ref="presentationRef"
      :aria-describedby="nativeAttrs['aria-describedby']"
      :aria-labelledby="typeof nativeAttrs['aria-labelledby'] === 'string' ? nativeAttrs['aria-labelledby'] : undefined"
      :loading="loading"
      intent="input"
      :edit-mode="editMode"
      :read-pretty="readPretty"
      :empty="emptyPolicy.isEmpty(committedValue)"
      :empty-text="emptyPolicy.emptyText.value"
      :popup-container="popupContainer"
      :text="type === 'password' && committedValue ? '••••••' : (committedValue ?? '')"
      :placeholder="placeholder"
      :label="
        ariaLabel ||
        (typeof nativeAttrs['aria-label'] === 'string' ? nativeAttrs['aria-label'] : undefined) ||
        presentationLabel
      "
      :open="editorOpen"
      :disabled="mergedDisabled"
      :readonly="mergedReadonly"
      :need-confirm="true"
      :pending="inputSession.pending.value"
      :error="inputSession.error.value || presentationItem?.message?.value"
      :commit="confirmEditor"
      @open="setEditorOpen"
      @cancel="cancelEditor"
      @confirm="confirmEditor"
    >
      <template v-if="$slots.read" #read><slot name="read" :value="committedValue" /></template>

      <FieldDecorator
        :id="inputId"
        :loading="loading || inputSession.pending.value"
        :loading-mode="loadingMode"
        :value="composition.isComposing.value ? inputRef?.value : value"
        :variant="mergedVariant"
        :size="mergedSize"
        :disabled="mergedDisabled || inputSession.pending.value"
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
          :id="editMode === 'direct' || editorOpen ? inputId : undefined"
          ref="inputRef"
          :aria-busy="loading || inputSession.pending.value || nativeAttrs['aria-busy'] || undefined"
          :autocomplete="oneTimeCode && nativeAttrs.autocomplete === 'one-time-code' ? 'one-time-code' : 'off'"
          :class="n('inner')"
          :value="composition.isComposing.value ? inputRef?.value : value"
          :type="type === 'number' ? 'text' : type"
          :disabled="mergedDisabled || inputSession.pending.value"
          :readonly="mergedReadonly"
          :maxlength="undefined"
          :placeholder="mergedHint ? undefined : placeholder"
          :aria-label="ariaLabel ?? nativeAttrs['aria-label']"
          :aria-describedby="describeError(nativeAttrs['aria-describedby'])"
          :aria-invalid="mergedError ? true : nativeAttrs['aria-invalid']"
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
    </FieldPresentation>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, useAttrs, watch, type InputHTMLAttributes } from 'vue'
import { invokeBeforeCommit, useFieldPresentation } from '../_components/field-presentation/context'
import FieldPresentation from '../_components/field-presentation/FieldPresentation.vue'
import { useSelectionSession } from '../_components/selection-field/use-selection-session'
import FieldDecorator, { fieldDecoratorProps } from '../field-decorator'
import { useFormErrorDescription } from '../form/error-description'
import { createNamespace } from '../utils/components'
import { useEmptyValues } from '../utils/empty-value'
import { useInputComposition } from '../utils/input-composition'
import { useId } from '../utils/vue-compat'
import { oneTimeCodeKey } from './context'
import InputFeedback from './InputFeedback.vue'
import { captureInputSelection, splitInputAttrs } from './native-attrs'
import { inputProps } from './props'
import type { InputEmits, InputSlots } from './types'
import { useInputForm } from './use-input-form'
import { useInputValue } from './use-input-value'

defineOptions({ name: createNamespace('input').name, inheritAttrs: false })
const props = defineProps(inputProps)
const { describe: describeError } = useFormErrorDescription()
const emit = defineEmits<InputEmits>()
defineSlots<InputSlots>()
const { n, classes } = createNamespace('input')
const attrs = useAttrs()
const oneTimeCode = inject(oneTimeCodeKey, false)
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
const {
  editMode,
  readPretty,
  item: presentationItem,
  label: presentationLabel,
  register: registerPresentation,
} = useFieldPresentation(
  () => props.editMode,
  () => props.readPretty,
)
const presentationRef = ref<InstanceType<typeof FieldPresentation>>()
const emptyPolicy = useEmptyValues(props, undefined, Boolean(presentationItem))
const localCommittedValue = ref<string | null>(props.defaultValue)
const committedValue = computed(() => (props.modelValue !== undefined ? props.modelValue : localCommittedValue.value))
const localEditorOpen = ref(props.defaultOpen)
const editorOpen = computed(
  () =>
    editMode.value !== 'direct' &&
    !readPretty.value &&
    !mergedDisabled.value &&
    !mergedReadonly.value &&
    (props.open ?? localEditorOpen.value),
)
function setEditorOpen(open: boolean) {
  if (open && (mergedDisabled.value || mergedReadonly.value || readPretty.value)) {
    return
  }
  localEditorOpen.value = open
  emit('update:open', open)
}
const inputSession = useSelectionSession({
  value: () => committedValue.value,
  open: editorOpen,
  deferred: () => editMode.value !== 'direct',
  blocked: () => mergedDisabled.value || mergedReadonly.value || readPretty.value,
  clone: (value) => value,
  publish: (next, event) => {
    localCommittedValue.value = next
    emit('update:modelValue', next)
    if (event) {
      emit('change', next, event)
    } else {
      emit('change', next)
    }
    if (!presentationItem?.validate) {
      eventHandlers.value?.onChange?.()
    }
  },
  close: () => setEditorOpen(false),
  cancelOnExternalChange: true,
  beforeCommit: async (next, signal) => {
    if (presentationItem?.validate && !(await presentationItem.validate(next))) {
      return false
    }
    if (signal.aborted) {
      return false
    }
    if (next !== committedValue.value) {
      return invokeBeforeCommit(props.beforeCommit, next, { previousValue: committedValue.value, signal })
    }
  },
})
function cancelEditor() {
  inputSession.cancel()
  presentationItem?.resetValidation?.()
}
function confirmEditor(event?: Event) {
  if (composition.isComposing.value) {
    return
  }
  commitValue(event ?? new Event('change'))
  return inputSession.commit(event)
}
watch(
  [editMode, readPretty],
  ([next, pretty], previous) => {
    presentationItem?.resolved?.(next, readPretty.value)
    if (previous && previous.length > 0 && (next !== previous[0] || pretty !== previous[1])) {
      setEditorOpen(false)
      inputSession.reset()
      presentationItem?.resetValidation?.()
    }
  },
  { immediate: true, flush: 'sync' },
)
watch(
  [mergedDisabled, mergedReadonly, readPretty],
  () => {
    if (readPretty.value || (editMode.value !== 'direct' && (mergedDisabled.value || mergedReadonly.value))) {
      setEditorOpen(false)
      inputSession.reset()
      presentationItem?.resetValidation?.()
    }
  },
  { flush: 'sync' },
)
registerPresentation({
  active: () => editorOpen.value,
  cancel: () => {
    setEditorOpen(false)
    inputSession.reset()
  },
  focus: () => presentationRef.value?.focus(),
})
const valueProps = new Proxy(props, {
  get(target, key) {
    return key === 'modelValue' ? inputSession.value.value : Reflect.get(target, key)
  },
})

const composition = useInputComposition()
const { value, focused, maxLength, errorOnly, valueLength, updateValue, commitValue, clearValue } = useInputValue(
  valueProps,
  (nextValue, notifyModel = true) => {
    if (editorOpen.value) {
      inputSession.update(nextValue)
    } else {
      localCommittedValue.value = nextValue
      if (notifyModel) {
        emit('update:modelValue', nextValue)
      }
    }
  },
  (nextValue, event) => {
    if (editorOpen.value) {
      return
    }
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
  const isCurrent = composition.capture()
  updateValue(input.value, (nextValue) => {
    emit('input', nextValue ?? '', event)
    !editorOpen.value && eventHandlers.value?.onInput?.(event)
  })
  nextTick(() => {
    // Only the current edit may normalize its native buffer and selection.
    if (isCurrent() && inputRef.value === input) {
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
  !editorOpen.value && eventHandlers.value?.onFocus?.(event)
}
function handleBlur(event: FocusEvent) {
  focused.value = false
  if (!mergedDisabled.value && !mergedReadonly.value) {
    commitValue(event)
  }
  emit('blur', event)
  !editorOpen.value && eventHandlers.value?.onBlur?.(event)
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
  !editorOpen.value && eventHandlers.value?.onClear?.(event)
  clearValue(event, (nextValue) => {
    emit('input', nextValue ?? '', event)
    !editorOpen.value && eventHandlers.value?.onInput?.(event)
  })
  focus()
}
function handleClick(event: MouseEvent) {
  if (!mergedDisabled.value) {
    emit('click', event)
  }
}
function handleMousedown(event: MouseEvent) {
  if (editMode.value !== 'direct') {
    return
  }
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
