<template>
  <div :class="classes(n(), n('$--box'))" @mousedown="handleMousedown">
    <mp-field-decorator
      v-bind="{
        value: computedValue,
        id,
        size: mergedSize,
        variant,
        placeholder,
        ariaLabel,
        line,
        hint: mergedHint,
        textColor,
        focusColor,
        blurColor,
        focused: isFocusing,
        error: mergedError,
        disabled: mergedDisabled,
        readonly: mergedReadonly,
        clearable: showClearBtn,
        cursor,
        composing: isComposing,
        hintCenter: false,
        onClear: handleClear,
      }"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>

      <div v-if="autoSize" ref="mirrorEl" :class="n('mirror')" :style="mirrorStyle">
        {{ `${computedValue}\n` }}
      </div>

      <textarea
        :id="id"
        ref="el"
        v-bind="mergedTextareaAttrs"
        :aria-label="ariaLabel"
        :aria-invalid="mergedError || undefined"
        :class="
          classes(
            n('inner'),
            [mergedDisabled, n('--disabled')],
            [mergedError, n('--error')],
            [mergedError, n('--caret-error')],
          )
        "
        :disabled="mergedDisabled"
        :readonly="mergedReadonly"
        :value="computedValue"
        :placeholder="!mergedHint ? placeholder : undefined"
        :maxlength="undefined"
        :rows="rows"
        :autofocus="autofocus"
        :enterkeyhint="enterkeyhint"
        :style="[
          textareaStyle,
          {
            color: !mergedError && !mergedDisabled ? textColor : undefined,
            caretColor: !mergedError && !mergedDisabled ? focusColor : undefined,
            '--mp-textarea-placeholder-color': placeholderColor,
          },
        ]"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeydown"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      />

      <template #clear-icon="{ clear }">
        <slot name="clear-icon" :clear="clear">
          <mp-icon
            role="button"
            tabindex="0"
            aria-label="清空"
            :class="n('clear-icon')"
            mp-field-decorator-cover
            @click="clear"
            @keydown="handleClearKeydown"
          >
            <m-icon-close-circle aria-hidden="true" />
          </mp-icon>
        </slot>
      </template>

      <template #suffix>
        <slot name="suffix" />
      </template>
    </mp-field-decorator>

    <div v-if="maxlengthText" :class="n('length')">{{ maxlengthText }}</div>
  </div>
</template>

<script lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, toRefs, watch } from 'vue'
import { IconCloseCircle as MIconCloseCircle } from '@maplejs/icons-vue'
import { preventDefault } from '@maplejs/maple-shared'
import { onSmartMounted, onWindowResize, useClientId } from '@maplejs/maple-use'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { useInputComposition } from '../utils/input-composition'
import { normalizeTextInputValue } from '../utils/text-input-value'
import { textareaProps } from './props'
import { getNativeTextareaAttrs, getSizeStyles, getTextareaAutoSizeStyle } from './utils'

const { name, n, classes } = createNamespace('textarea')

export default defineComponent({
  name,
  components: { MIconCloseCircle, MpFieldDecorator, MpIcon },
  props: textareaProps,
  emits: ['focus', 'blur', 'input', 'change', 'keydown', 'clear', 'update:modelValue'],
  setup(props, { emit }) {
    const id = useClientId()
    const el = ref<HTMLTextAreaElement | null>(null)
    const mirrorEl = ref<HTMLElement | null>(null)
    const mirrorStyle = ref<CSSProperties>()
    const autoSizeStyle = ref<CSSProperties>()
    const isFocusing = ref(false)
    const composition = useInputComposition()
    const isComposing = composition.isComposing
    const { form } = useForm()
    const { size, disabled, readonly, error } = toRefs(props)
    const {
      mergedDisabled,
      mergedReadonly,
      mergedSize,
      mergedError: formError,
      eventHandlers,
      hasOuterLabel,
    } = useFormItem({
      size,
      disabled,
      readonly,
      error,
      formSize: form?.size,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
    })
    const cursor = computed(() => (mergedDisabled.value || mergedReadonly.value ? '' : 'text'))
    const mergedHint = computed(() => (hasOuterLabel.value ? false : props.hint))

    const _value = ref(props.defaultValue)
    const computedValue = computed(() => props.modelValue ?? _value.value)
    let preValue = computedValue.value

    watch(
      () => props.modelValue,
      (value) => {
        if (value === undefined || value === null) {
          _value.value = ''
        }
      },
    )

    const computedMaxLength = computed(() =>
      typeof props.maxLength === 'object' ? props.maxLength.length : props.maxLength,
    )
    const maxLengthErrorOnly = computed(() => typeof props.maxLength === 'object' && Boolean(props.maxLength.errorOnly))
    const getValueLength = (value: string) => props.wordLength?.(value) ?? value.length
    const valueLength = computed(() => getValueLength(computedValue.value))
    const mergedError = computed(
      () =>
        formError.value ||
        Boolean(computedMaxLength.value && maxLengthErrorOnly.value && valueLength.value > computedMaxLength.value),
    )
    const maxlengthText = computed(() => {
      if (!computedMaxLength.value || !props.showWordLimit) {
        return ''
      }
      return `${valueLength.value}/${computedMaxLength.value}`
    })
    const showClearBtn = computed(
      () => props.clearable && !mergedReadonly.value && !mergedDisabled.value && Boolean(computedValue.value),
    )
    const placeholderColor = computed(() => {
      // Leave the public CSS token inheritable unless a color prop is explicit.
      if (mergedHint.value || mergedDisabled.value || mergedError.value) {
        return undefined
      }
      return isFocusing.value ? props.focusColor : props.blurColor
    })

    const mergedTextareaAttrs = computed(() => getNativeTextareaAttrs(props.textareaAttrs))
    const textareaStyle = computed<CSSProperties>(() => ({
      resize: props.autoSize ? 'none' : props.resize ? 'vertical' : 'none',
      ...autoSizeStyle.value,
    }))

    const keepControl = () => {
      nextTick(() => {
        if (el.value && el.value.value !== computedValue.value) {
          el.value.value = computedValue.value
        }
      })
    }

    const updateValue = (value: string) => {
      const nextValue = normalizeTextInputValue(value, {
        maxLength: computedMaxLength.value,
        errorOnly: maxLengthErrorOnly.value,
        wordLength: props.wordLength,
        wordSlice: props.wordSlice,
      })
      _value.value = nextValue
      emit('update:modelValue', nextValue)
      keepControl()
      return nextValue
    }

    const emitChange = (value: string, ev: Event) => {
      if (value !== preValue) {
        preValue = value
        emit('change', value, ev)
        eventHandlers.value.onChange?.()
      }
    }

    const withTrim = (value: string) => (props.modelModifiers.trim ? value.trim() : value)

    const commitValue = (ev: Event) => {
      const value = withTrim(computedValue.value)
      if (value !== computedValue.value) {
        _value.value = value
        emit('update:modelValue', value)
        keepControl()
      }
      emitChange(value, ev)
    }

    function handleFocus(ev: FocusEvent) {
      isFocusing.value = true
      preValue = computedValue.value
      emit('focus', ev)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur(ev: FocusEvent) {
      isFocusing.value = false
      commitValue(ev)
      emit('blur', ev)
      eventHandlers.value.onBlur?.()
    }

    function processInput(ev: Event) {
      const nextValue = updateValue((ev.target as HTMLTextAreaElement).value)
      emit('input', nextValue, ev)
      eventHandlers.value.onInput?.()
    }

    function handleCompositionStart() {
      composition.start()
    }

    function handleCompositionEnd(ev: CompositionEvent) {
      if (composition.end(ev)) {
        processInput(ev)
      }
    }

    function handleInput(ev: Event) {
      if (composition.accepts(ev)) {
        processInput(ev)
      }
    }

    function handleKeydown(ev: KeyboardEvent) {
      emit('keydown', ev)
    }

    function handleClear(ev: Event = new Event('clear')) {
      if (!showClearBtn.value) {
        return
      }
      const value = updateValue('')
      preValue = value
      emit('clear', ev)
      eventHandlers.value.onClear?.()
      nextTick(focus)
    }

    function handleClearKeydown(ev: KeyboardEvent) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault()
        ;(ev.currentTarget as HTMLElement).click()
      }
    }

    function syncAutoSize() {
      if (!props.autoSize) {
        autoSizeStyle.value = undefined
        return
      }
      if (!el.value || !mirrorEl.value || typeof window === 'undefined') {
        return
      }

      const styles = getSizeStyles(window.getComputedStyle(el.value))
      mirrorStyle.value = styles

      nextTick(() => {
        const options = typeof props.autoSize === 'object' ? props.autoSize : undefined
        autoSizeStyle.value = getTextareaAutoSizeStyle(styles, mirrorEl.value?.offsetHeight ?? 0, options)
      })
    }

    function handleMousedown(ev: MouseEvent) {
      if (mergedDisabled.value || !el.value || ev.target === el.value) {
        return
      }
      focus()
      preventDefault(ev)
    }

    function focus() {
      el.value?.focus()
    }

    function blur() {
      el.value?.blur()
    }

    let resizeObserver: ResizeObserver | undefined
    onWindowResize(syncAutoSize)
    onSmartMounted(() => {
      if (props.autofocus) {
        focus()
      }
      syncAutoSize()
      if (typeof ResizeObserver !== 'undefined' && el.value?.parentElement) {
        resizeObserver = new ResizeObserver(syncAutoSize)
        resizeObserver.observe(el.value.parentElement)
      }
    })
    onBeforeUnmount(() => resizeObserver?.disconnect())

    watch(computedValue, (value) => {
      if (!isFocusing.value) {
        preValue = value
      }
      nextTick(syncAutoSize)
    })
    watch(
      () => props.autoSize,
      () => {
        nextTick(syncAutoSize)
      },
      { deep: true },
    )

    return {
      el,
      mirrorEl,
      mirrorStyle,
      textareaStyle,
      id,
      computedValue,
      mergedDisabled,
      mergedSize,
      mergedReadonly,
      isFocusing,
      isComposing,
      mergedError,
      mergedHint,
      placeholderColor,
      cursor,
      maxlengthText,
      showClearBtn,
      mergedTextareaAttrs,
      n,
      classes,
      handleFocus,
      handleBlur,
      handleInput,
      handleKeydown,
      handleClear,
      handleClearKeydown,
      handleCompositionStart,
      handleCompositionEnd,
      handleMousedown,
      focus,
      blur,
    }
  },
})
</script>
