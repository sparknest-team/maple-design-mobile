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
        isFocusing: isForceFocusingEffect != null ? isForceFocusingEffect : isFocusing,
        isError: isForceErrorEffect != null ? isForceErrorEffect : mergedError,
        formDisabled,
        disabled,
        clearable,
        cursor,
        composing: isComposing,
        hintCenter: true,
        onClear: handleClear,
      }"
    >
      <template v-if="$slots['prefix']" #prefix>
        <slot name="prefix" />
      </template>

      <input
        v-if="normalizedType === 'password'"
        tabindex="-1"
        autocomplete="off"
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
        :autocomplete="autocomplete"
        :disabled="formDisabled || disabled"
        :readonly="formReadonly || readonly"
        :type="normalizedType"
        v-bind="inputAttrs"
        :value="computedValue"
        :maxlength="undefined"
        :placeholder="!mergedHint ? placeholder : undefined"
        :enterkeyhint="enterkeyhint"
        :inputmode="type === 'number' ? 'decimal' : undefined"
        :aria-invalid="mergedError || undefined"
        :style="{
          color: !mergedError ? textColor : undefined,
          caretColor: !mergedError ? focusColor : undefined,
          '--mp-input-placeholder-color': placeholderColor,
        }"
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
import { computed, defineComponent, ref, watch } from 'vue'
import { IconCloseCircle as MIconCloseCircle } from '@maplejs/icons-vue'
import { isEmpty, preventDefault, toNumber } from '@maplejs/maple-shared'
import { onSmartMounted, useClientId } from '@maplejs/maple-use'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { props, type InputType } from './props'

const { name, n, classes } = createNamespace('input')

export default defineComponent({
  name,
  components: {
    MIconCloseCircle,
    MpIcon,
    MpFieldDecorator,
  },
  props,
  emits: ['focus', 'blur', 'input', 'change', 'pressEnter', 'keydown', 'update:modelValue', 'clear'],
  setup(props, { emit }) {
    const id = useClientId()
    const el = ref<HTMLInputElement | null>(null)
    const isFocusing = ref(false)
    const isComposing = ref(false)
    const { form } = useForm()
    const { mergedError: formError, eventHandlers, hasOuterLabel } = useFormItem()
    const cursor = computed(() => (props.disabled || props.readonly || form?.readonly.value ? '' : 'text'))
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

    watch(computedValue, (value, oldValue) => {
      preValue = isFocusing.value ? oldValue : value
    })

    const maxLength = computed(() => (typeof props.maxLength === 'object' ? props.maxLength.length : props.maxLength))
    const maxLengthErrorOnly = computed(() => typeof props.maxLength === 'object' && Boolean(props.maxLength.errorOnly))
    const getValueLength = (value: string) => props.wordLength?.(value) ?? value.length
    const valueLength = computed(() => getValueLength(computedValue.value))
    const mergedError = computed(
      () => formError.value || props.error || (maxLengthErrorOnly.value && valueLength.value > (maxLength.value ?? 0)),
    )
    const maxlengthText = computed(() => {
      if (!maxLength.value || !props.showWordLimit) {
        return ''
      }

      return `${isEmpty(computedValue.value) ? 0 : valueLength.value}/${maxLength.value}`
    })
    const placeholderColor = computed(() => {
      const { blurColor, focusColor } = props

      if (mergedHint.value) {
        return undefined
      }

      if (mergedError.value) {
        return 'var(--mp-field-color-error)'
      }

      if (isFocusing.value) {
        return focusColor || 'var(--mp-field-color-focus)'
      }

      return blurColor || 'var(--mp-field-color-placeholder-text, var(--mp-field-color-blur))'
    })

    onSmartMounted(() => {
      if (props.autofocus) {
        focus()
      }
    })

    function handleFocus(e: FocusEvent) {
      isFocusing.value = true

      emit('focus', e)
      eventHandlers.value.onFocus?.()
    }

    function handleBlur(e: FocusEvent) {
      isFocusing.value = false

      commitValue(e)
      emit('blur', e)
      eventHandlers.value.onBlur?.()
    }

    function updateValue(value: string) {
      if (props.type === 'number') {
        value = formatNumber(value)
      }

      const targetValue = withMaxlength(value)
      _value.value = targetValue
      emit('update:modelValue', targetValue)
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

      const value = updateValue((e.target as HTMLInputElement).value)

      emit('input', value, e)
      eventHandlers.value.onInput?.()
    }

    function handleKeydown(e: KeyboardEvent) {
      emit('keydown', e)
      if (e.key === 'Enter' && !isComposing.value) {
        commitValue(e)
        emit('pressEnter', e)
      }
    }

    function commitValue(e: Event) {
      const value = withTrim(computedValue.value)

      if (value !== computedValue.value) {
        _value.value = value
        emit('update:modelValue', value)
      }

      emitChange(value, e)
    }

    function handleClearKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        ;(e.currentTarget as HTMLElement).click()
      }
    }

    function emitChange(value: string, e: Event) {
      if (value !== preValue) {
        preValue = value
        emit('change', value, e)
        eventHandlers.value.onChange?.()
      }
    }

    function handleClear(e: Event = new Event('clear')) {
      const { disabled, readonly, clearable } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !clearable) {
        return
      }

      updateValue('')
      emit('clear', e)
      eventHandlers.value.onClear?.()
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
      if (!maxLength.value || maxLengthErrorOnly.value || getValueLength(value) <= maxLength.value) {
        return value
      }

      return props.wordSlice?.(value, maxLength.value) ?? value.slice(0, toNumber(maxLength.value))
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
      computedValue,
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
