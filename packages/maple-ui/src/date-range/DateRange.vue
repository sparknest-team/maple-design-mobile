<template>
  <div
    ref="root"
    :class="n()"
    :tabindex="disabled || formDisabled ? undefined : '0'"
    @focus="handleFocus"
    @blur="handleRootBlur"
  >
    <mp-field-decorator
      v-bind="{
        value: modelValue,
        size,
        variant,
        placeholder,
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
        onClick: handleClick,
        onClear: handleClear,
      }"
    >
      <template v-if="$slots['prefix']" #prefix>
        <slot name="prefix" />
      </template>

      <div
        :class="classes(n('select'), [mergedError, n('--error')], [formDisabled || disabled, n('--disabled')])"
        :style="{ color: textColor }"
      >
        <div :class="n('label')">
          <slot v-if="!isEmptyModelValue" name="selected">
            {{ displayLabel }}
          </slot>
        </div>

        <span
          v-if="enableCustomPlaceholder"
          :class="classes(n('placeholder'), n('$--ellipsis'))"
          :style="{ color: placeholderColor }"
        >
          {{ placeholder }}
        </span>

        <slot name="arrow-icon" :focus="isFocusing" :popup-open="open">
          <mp-icon :class="classes(n('arrow'), [open, n('--arrow-rotate')])" mp-date-range-cover :transition="300"
            ><MIconMenuDown
          /></mp-icon>
        </slot>
      </div>

      <template #clear-icon="{ clear }">
        <slot name="clear-icon" :clear="clear" />
      </template>

      <template #suffix>
        <slot name="suffix" />
      </template>
    </mp-field-decorator>

    <mp-popup v-model:open="open" position="bottom" v-bind="popupBindingProps">
      <div :class="n('panel')">
        <div :class="n('toolbar')">
          <mp-button :class="n('cancel-button')" mp-date-range-cover variant="text" @click="handleCancel">
            {{ cancelButtonText }}
          </mp-button>
          <div :class="n('title')">{{ titleText }}</div>
          <mp-button :class="n('confirm-button')" mp-date-range-cover variant="text" @click="handleConfirm">
            {{ confirmButtonText }}
          </mp-button>
        </div>

        <mp-date-range-picker
          v-model="draft"
          v-bind="dateRangePickerBindingProps"
          :presentation="presentation"
          :type="type"
          :show-time="showTime"
          :use-seconds="useSeconds"
          :min="min"
          :max="max"
          :disabled-date="disabledDate"
          :disabled-time="disabledTime"
          :date-picker-props="datePickerBindingProps"
          :picker-props="pickerBindingProps"
          :time-picker-props="timePickerBindingProps"
          :readonly="readonly || formReadonly"
        />
      </div>
    </mp-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { IconMenuDown as MIconMenuDown } from '@maplejs/icons-vue'
import { call, isArray, isEmpty, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import MpButton from '../button'
import { defaultDate, defaultDateTime } from '../date/datetime'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import MpDateRangePicker from './DateRangePicker.vue'
import { props } from './props'

const { name, n, classes } = createNamespace('date-range')

export default defineComponent({
  name,
  components: {
    MIconMenuDown,
    MpIcon,
    MpPopup,
    MpButton,
    MpDateRangePicker,
    MpFieldDecorator,
  },
  props,
  emits: ['close', 'update:modelValue', 'update:open', 'focus', 'blur', 'change', 'clear', 'click'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const isFocusing = ref(false)
    const open = useVModel(props, 'open', { defaultValue: false, emit, eventName: 'update:open' })
    const root = ref<HTMLElement | null>(null)
    const draft = ref<string[]>([])
    const confirming = ref(false)
    const cursor = computed(() => (props.disabled || props.readonly ? '' : 'pointer'))
    const { form } = useForm()
    const { mergedError, eventHandlers, hasOuterLabel } = useFormItem()
    const isEmptyModelValue = computed(() => isEmpty(props.modelValue))
    const mergedHint = computed(() => (hasOuterLabel.value ? false : props.hint))
    const displayLabel = computed(() => {
      const value = props.modelValue
      if (!isArray(value) || isEmpty(value)) {
        return ''
      }
      return value.join(props.separator)
    })
    const enableCustomPlaceholder = computed(() => !mergedHint.value && isEmpty(props.modelValue))
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
    const datePickerBindingProps = computed(() => ({ ...props.datePickerProps }))
    const pickerBindingProps = computed(() => ({ ...props.pickerProps }))
    const timePickerBindingProps = computed(() => ({ ...props.timePickerProps }))
    const dateRangePickerBindingProps = computed(() => ({ ...props.dateRangePickerProps }))
    const popupBindingProps = computed(() => ({ ...props.popupProps }))
    const titleText = computed(
      () => props.datePickerProps?.hint ?? props.pickerProps?.title ?? (pt ? pt : t)('pickerTitle'),
    )
    const cancelButtonText = computed(() => (pt ? pt : t)('pickerCancelButtonText'))
    const confirmButtonText = computed(() => (pt ? pt : t)('pickerConfirmButtonText'))

    function fallbackDate() {
      if (props.showTime) {
        return defaultDateTime(props.useSeconds)
      }
      return defaultDate(props.type)
    }

    watch(open, (visible) => {
      if (visible) {
        const value = props.modelValue
        const fallback = fallbackDate()
        draft.value = [
          isArray(value) && value[0] ? value[0] : fallback,
          isArray(value) && value[1] ? value[1] : fallback,
        ]
        return
      }
      if (!confirming.value) {
        emit('close', props.modelValue)
      }
      confirming.value = false
    })

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function cloneValue(value: string[] | undefined) {
      return isArray(value) ? [...value] : []
    }

    function handleKeydown(event: KeyboardEvent) {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !isFocusing.value) {
        return
      }
      const { key } = event
      if (key === ' ' && !open.value) {
        preventDefault(event)
        return
      }
      if (key === 'Escape' && open.value) {
        root.value?.focus()
        preventDefault(event)
        open.value = false
        return
      }
      if (key === 'Tab' && open.value) {
        root.value?.focus()
        preventDefault(event)
        handleBlur()
        return
      }
      if (key === 'Enter' && !open.value) {
        preventDefault(event)
        open.value = true
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly || open.value || !isFocusing.value) {
        return
      }
      if (event.key === ' ' && !open.value) {
        preventDefault(event)
        open.value = true
      }
    }

    function handleFocus() {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      focus()
      emit('focus')
      eventHandlers.value.onFocus?.()
    }

    function handleBlur() {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      blur()
      emit('blur')
      eventHandlers.value.onBlur?.()
    }

    function handleRootBlur() {
      if (open.value) {
        return
      }
      handleBlur()
    }

    function handleClick(e: Event) {
      const { disabled, readonly } = props
      if (form?.disabled.value || disabled) {
        return
      }
      emit('click', e)
      if (form?.readonly.value || readonly) {
        return
      }
      open.value = true
    }

    function handleClear() {
      const { disabled, readonly, clearable } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !clearable) {
        return
      }
      const changedModelValue: string[] = []
      emit('update:modelValue', changedModelValue)
      emit('clear', changedModelValue)
      eventHandlers.value.onClear?.()
      emit('change', changedModelValue)
      eventHandlers.value.onChange?.()
    }

    function handleConfirm() {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      const value = cloneValue(draft.value)
      confirming.value = true
      emit('update:modelValue', value)
      emit('change', value)
      eventHandlers.value.onChange?.()
      emit('close', value)
      open.value = false
    }

    function handleCancel() {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      open.value = false
    }

    function focus() {
      isFocusing.value = true
    }

    function blur() {
      isFocusing.value = false
      open.value = false
    }

    return {
      root,
      isFocusing,
      open,
      draft,
      mergedError,
      mergedHint,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      displayLabel,
      isEmptyModelValue,
      cursor,
      placeholderColor,
      enableCustomPlaceholder,
      datePickerBindingProps,
      pickerBindingProps,
      timePickerBindingProps,
      dateRangePickerBindingProps,
      popupBindingProps,
      titleText,
      cancelButtonText,
      confirmButtonText,
      n,
      classes,
      handleFocus,
      handleRootBlur,
      handleClick,
      handleClear,
      handleConfirm,
      handleCancel,
      focus,
      blur,
    }
  },
})
</script>
