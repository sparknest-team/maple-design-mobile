<template>
  <div :class="classes(n(), n('$--box'))" @mousedown="handleMousedown">
    <mp-field-decorator
      v-bind="{
        value: computedValue,
        id,
        size,
        variant,
        placeholder,
        ariaLabel,
        line,
        hint: mergedHint,
        textColor,
        focusColor,
        blurColor,
        isFocusing,
        isError: mergedError,
        formDisabled: mergedDisabled,
        disabled: mergedDisabled,
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
            color: !mergedError ? textColor : undefined,
            caretColor: !mergedError ? focusColor : undefined,
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
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { IconCloseCircle as MIconCloseCircle } from '@maplejs/icons-vue'
import { preventDefault } from '@maplejs/maple-shared'
import { onSmartMounted, onWindowResize, useClientId } from '@maplejs/maple-use'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { textareaProps } from './props'
import { getNativeTextareaAttrs, getSizeStyles } from './utils'

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
    const isComposing = ref(false)
    const { form } = useForm()
    const { mergedDisabled: formItemDisabled, mergedError: formError, eventHandlers, hasOuterLabel } = useFormItem()
    const mergedDisabled = computed(() => Boolean(form?.disabled.value || formItemDisabled.value || props.disabled))
    const mergedReadonly = computed(() => Boolean(form?.readonly.value || props.readonly))
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
        props.error ||
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
      if (mergedHint.value) {
        return undefined
      }
      if (mergedError.value) {
        return 'var(--mp-field-color-error)'
      }
      if (isFocusing.value) {
        return props.focusColor || 'var(--mp-field-color-focus)'
      }
      return props.blurColor || 'var(--mp-field-color-placeholder-text, var(--mp-field-color-blur))'
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

    const sliceValue = (value: string) =>
      props.wordSlice?.(value, computedMaxLength.value) ?? value.slice(0, computedMaxLength.value)

    const normalizeValue = (value: string) => {
      if (computedMaxLength.value && !maxLengthErrorOnly.value && getValueLength(value) > computedMaxLength.value) {
        return sliceValue(value)
      }
      return value
    }

    const updateValue = (value: string) => {
      const nextValue = normalizeValue(value)
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
      isComposing.value = true
    }

    function handleCompositionEnd(ev: CompositionEvent) {
      if (!isComposing.value) {
        return
      }
      isComposing.value = false
      processInput(ev)
    }

    function handleInput(ev: Event) {
      if (!isComposing.value) {
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
      const fontSize = Number.parseFloat(styles['font-size']) || 0
      const lineHeight = Number.parseFloat(styles['line-height']) || fontSize * 1.5
      const outerHeight =
        (Number.parseFloat(styles['border-width']) || 0) * 2 +
        (Number.parseFloat(styles['padding-top']) || 0) +
        (Number.parseFloat(styles['padding-bottom']) || 0)
      mirrorStyle.value = styles

      nextTick(() => {
        const options = typeof props.autoSize === 'object' ? props.autoSize : undefined
        const minHeight = options?.minRows ? options.minRows * lineHeight + outerHeight : 0
        const maxHeight = options?.maxRows ? options.maxRows * lineHeight + outerHeight : 0
        let height = mirrorEl.value?.offsetHeight ?? 0
        let overflow: CSSProperties['overflow'] = 'hidden'

        if (minHeight && height < minHeight) {
          height = minHeight
        }
        if (maxHeight && height > maxHeight) {
          height = maxHeight
          overflow = 'auto'
        }

        autoSizeStyle.value = { height: `${height}px`, overflow }
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
