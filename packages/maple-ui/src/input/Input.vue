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
        isFocusing: isForceFocusingEffect != null ? isForceFocusingEffect : isFocusing,
        isError: isForceErrorEffect != null ? isForceErrorEffect : mergedError,
        formDisabled,
        disabled,
        clearable,
        cursor,
        composing: isComposing,
        hintCenter: true,
        onClick: handleClick,
        onClear: handleClear,
      }"
    >
      <template v-if="$slots['prefix']" #prefix>
        <slot name="prefix" />
      </template>

      <input
        v-if="normalizedType === 'password'"
        tabindex="-1"
        :aria-label="ariaLabel"
        :class="n('autocomplete')"
        :placeholder="!mergedHint ? placeholder : undefined"
        :style="{
          '--mp-input-placeholder-color': placeholderColor,
        }"
        :enterkeyhint="enterkeyhint"
      />
      <input
        :id="id"
        ref="el"
        :aria-label="ariaLabel"
        :class="
          classes(
            n('input'),
            [formDisabled || disabled, n('--disabled')],
            [mergedError, n('--error')],
            [mergedError, n('--caret-error')],
          )
        "
        :autocomplete="autocomplete ? autocomplete : 'new-password'"
        :disabled="formDisabled || disabled"
        :readonly="formReadonly || readonly"
        :type="normalizedType"
        :value="modelValue"
        :placeholder="!mergedHint ? placeholder : undefined"
        :maxlength="maxlength"
        :enterkeyhint="enterkeyhint"
        :inputmode="type === 'number' ? 'decimal' : undefined"
        :style="{
          color: !mergedError ? textColor : undefined,
          caretColor: !mergedError ? focusColor : undefined,
          '--mp-input-placeholder-color': placeholderColor,
        }"
        v-bind="inputAttrs"
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
import { props, type InputType } from './props'

const { name, n, classes } = createNamespace('input')

export default defineComponent({
  name,
  components: {
    MpFieldDecorator,
  },
  props,
  setup(props) {
    const id = useClientId()
    const el = ref<HTMLInputElement | null>(null)
    const isFocusing = ref(false)
    const isComposing = ref(false)
    const { form } = useForm()
    const { mergedError, eventHandlers, hasOuterLabel } = useFormItem()
    const cursor = computed(() => (props.disabled || props.readonly ? '' : 'text'))
    const mergedHint = computed(() => {
      if (hasOuterLabel.value) {
        return false
      }

      return props.hint
    })
    const normalizedType = computed<InputType>(() => {
      if (props.type === 'number') {
        return 'text'
      }

      return props.type
    })
    const maxlengthText = computed(() => {
      const { maxlength, modelValue } = props

      if (!maxlength) {
        return ''
      }

      if (isEmpty(modelValue)) {
        return `0 / ${maxlength}`
      }

      return `${String(modelValue).length}/${maxlength}`
    })
    const placeholderColor = computed(() => {
      const { blurColor, focusColor } = props

      if (mergedHint.value) {
        return undefined
      }

      if (mergedError.value) {
        return 'var(--mp-field-decorator-error-color)'
      }

      if (isFocusing.value) {
        return focusColor || 'var(--mp-field-decorator-focus-color)'
      }

      return blurColor || 'var(--mp-field-decorator-placeholder-color, var(--mp-field-decorator-blur-color))'
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
      const target = e.target as HTMLInputElement

      let { value } = target

      if (props.type === 'number') {
        value = formatNumber(value)
      }

      // avoid vue cannot render when the target is the same with props.modelValue
      const targetValue = withMaxlength(value)
      if (targetValue === props.modelValue) {
        target.value = targetValue
      }

      return targetValue
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
      const value = withTrim(updateValue(e))

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
      const { disabled, readonly, clearable, onClear } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !clearable) {
        return
      }

      call(props['onUpdate:modelValue'], '')
      call(onClear, '')
      eventHandlers.value.onClear?.()
    }

    function handleClick(e: Event) {
      const { disabled, onClick } = props

      if (form?.disabled.value || disabled) {
        return
      }

      call(onClick, e)
    }

    function formatNumber(value: string) {
      const minusIndex = value.indexOf('-')
      const dotIndex = value.indexOf('.')

      if (minusIndex > -1) {
        value = minusIndex === 0 ? '-' + value.replace(/-/g, '') : value.replace(/-/g, '')
      }

      if (dotIndex > -1) {
        value = value.slice(0, dotIndex + 1) + value.slice(dotIndex).replace(/\./g, '')
      }

      return value.replace(/[^-0-9.]/g, '')
    }

    function withTrim(value: string) {
      return props.modelModifiers.trim ? value.trim() : value
    }

    function withMaxlength(value: string) {
      return props.maxlength ? value.slice(0, toNumber(props.maxlength)) : value
    }

    function handleMousedown(e: MouseEvent) {
      const { disabled } = props

      if (form?.disabled.value || disabled || e.target === el.value) {
        return
      }

      focus()
      preventDefault(e)
    }

    // expose
    function focus() {
      ;(el.value as HTMLInputElement)?.focus()
    }

    // expose
    function blur() {
      ;(el.value as HTMLInputElement).blur()
    }

    return {
      el,
      id,
      isFocusing,
      isComposing,
      mergedError,
      mergedHint,
      placeholderColor,
      normalizedType,
      cursor,
      maxlengthText,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      n,
      classes,
      isEmpty,
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
@import './input';
</style>
