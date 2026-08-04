<template>
  <div :class="classes(n(), n('$--box'))" @mousedown="handleMousedown">
    <mp-field-decorator
      v-bind="{
        value: modelValue,
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
        formDisabled,
        disabled,
        clearable,
        cursor,
        composing: isComposing,
        hintCenter: false,
        onClick: handleClick,
        onClear: handleClear,
      }"
    >
      <textarea
        :id="id"
        ref="el"
        v-bind="textareaAttrs"
        :aria-label="ariaLabel"
        :class="
          classes(
            n('inner'),
            [formDisabled || disabled, n('--disabled')],
            [mergedError, n('--error')],
            [mergedError, n('--caret-error')],
          )
        "
        :disabled="formDisabled || disabled"
        :readonly="formReadonly || readonly"
        :value="modelValue"
        :placeholder="!mergedHint ? placeholder : undefined"
        :maxlength="maxlength"
        :rows="rows"
        :autofocus="autofocus"
        :enterkeyhint="enterkeyhint"
        :style="{
          color: !mergedError ? textColor : undefined,
          caretColor: !mergedError ? focusColor : undefined,
          resize: resize ? 'vertical' : 'none',
          '--mp-textarea-placeholder-color': placeholderColor,
        }"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
        @keydown="handleKeydown"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      />

      <template #clear-icon="{ clear }">
        <slot name="clear-icon" :clear="clear" />
      </template>

      <template #suffix>
        <slot name="suffix" />
      </template>
    </mp-field-decorator>

    <div v-if="maxlengthText" :class="n('length')">{{ maxlengthText }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { call, isEmpty, preventDefault, toNumber } from '@maplejs/maple-shared'
import { onSmartMounted, useClientId } from '@maplejs/maple-use'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import { createNamespace } from '../utils/components'
import { textareaProps } from './props'

const { name, n, classes } = createNamespace('textarea')

export default defineComponent({
  name,
  components: { MpFieldDecorator },
  props: textareaProps,
  setup(props) {
    const id = useClientId()
    const el = ref<HTMLTextAreaElement | null>(null)
    const isFocusing = ref(false)
    const isComposing = ref(false)
    const { form } = useForm()
    const { mergedError, eventHandlers, hasOuterLabel } = useFormItem()
    const cursor = computed(() => (props.disabled || props.readonly ? '' : 'text'))
    const mergedHint = computed(() => (hasOuterLabel.value ? false : props.hint))
    const maxlengthText = computed(() => {
      if (!props.maxlength) {
        return ''
      }
      if (isEmpty(props.modelValue)) {
        return `0 / ${props.maxlength}`
      }
      return `${String(props.modelValue).length}/${props.maxlength}`
    })
    const placeholderColor = computed(() => {
      if (mergedHint.value) {
        return undefined
      }
      if (mergedError.value) {
        return 'var(--mp-field-decorator-error-color)'
      }
      if (isFocusing.value) {
        return props.focusColor || 'var(--mp-field-decorator-focus-color)'
      }
      return props.blurColor || 'var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))'
    })

    onSmartMounted(() => {
      if (props.autofocus) {
        focus()
      }
    })

    function handleFocus(e: FocusEvent) {
      isFocusing.value = true
      call(props.onFocus, e)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur(e: FocusEvent) {
      isFocusing.value = false
      call(props.onBlur, e)
      eventHandlers.value.onBlur?.()
    }

    function updateValue(e: Event) {
      const target = e.target as HTMLTextAreaElement
      const value = props.maxlength ? target.value.slice(0, toNumber(props.maxlength)) : target.value
      if (value === props.modelValue) {
        target.value = value
      }
      return value
    }

    function handleCompositionStart() {
      isComposing.value = true
    }

    function handleCompositionEnd(e: Event) {
      if (!isComposing.value) {
        return
      }
      isComposing.value = false
      e.target!.dispatchEvent(new Event('input'))
    }

    function handleInput(e: Event) {
      if (isComposing.value) {
        return
      }
      const value = updateValue(e)
      call(props['onUpdate:modelValue'], value)
      call(props.onInput, value, e)
      eventHandlers.value.onInput?.()
    }

    function handleChange(e: Event) {
      const value = props.modelModifiers.trim ? updateValue(e).trim() : updateValue(e)
      if (props.modelModifiers.trim) {
        call(props['onUpdate:modelValue'], value)
      }
      call(props.onChange, value, e)
      eventHandlers.value.onChange?.()
    }

    function handleKeydown(e: KeyboardEvent) {
      call(props.onKeydown, e)
    }

    function handleClear() {
      if (form?.disabled.value || form?.readonly.value || props.disabled || props.readonly || !props.clearable) {
        return
      }
      call(props['onUpdate:modelValue'], '')
      call(props.onClear, '')
      eventHandlers.value.onClear?.()
    }

    function handleClick(e: Event) {
      if (form?.disabled.value || props.disabled) {
        return
      }
      call(props.onClick, e)
    }

    function handleMousedown(e: MouseEvent) {
      if (form?.disabled.value || props.disabled || e.target === el.value) {
        return
      }
      focus()
      preventDefault(e)
    }

    function focus() {
      el.value?.focus()
    }

    function blur() {
      el.value?.blur()
    }

    return {
      el,
      id,
      isFocusing,
      isComposing,
      mergedError,
      mergedHint,
      placeholderColor,
      cursor,
      maxlengthText,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      n,
      classes,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange,
      handleKeydown,
      handleClear,
      handleClick,
      handleCompositionStart,
      handleCompositionEnd,
      handleMousedown,
      focus,
      blur,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import '../field-decorator/fieldDecorator';
@import './textarea';
</style>
