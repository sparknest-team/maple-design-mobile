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
          <mp-icon :class="classes(n('arrow'), [open, n('--arrow-rotate')])" mp-time-cover :transition="300"
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
          <mp-button :class="n('cancel-button')" mp-time-cover variant="text" @click="handleCancel">
            {{ cancelButtonText }}
          </mp-button>
          <div :class="n('title')">{{ titleText }}</div>
          <mp-button :class="n('confirm-button')" mp-time-cover variant="text" @click="handleConfirm">
            {{ confirmButtonText }}
          </mp-button>
        </div>

        <mp-picker
          v-if="presentation === 'picker'"
          v-bind="pickerBindingProps"
          :toolbar="false"
          :columns="pickerColumns"
          :model-value="pickerValue"
          @change="handlePickerChange"
        />
        <mp-time-picker
          v-else
          v-model="draft"
          presentation="clock"
          v-bind="timePickerBindingProps"
          :format="format"
          :use-seconds="useSeconds"
          :min="min"
          :max="max"
          :disabled-time="disabledTime"
          :readonly="readonly || formReadonly"
        />
      </div>
    </mp-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { IconMenuDown as MIconMenuDown } from '@maplejs/icons-vue'
import { call, isEmpty, preventDefault, toNumber } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import MpButton from '../button'
import MpFieldDecorator from '../field-decorator'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../picker'
import type { PickerColumnOption } from '../picker/props'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import { padStart } from '../utils/shared'
import { props } from './props'
import MpTimePicker from './TimePicker.vue'

const { name, n, classes } = createNamespace('time')

function pad(value: number) {
  return padStart(`${value}`, 2, '0')
}

function buildColumn(count: number, filter?: (value: number) => boolean): PickerColumnOption[] {
  return Array.from({ length: count }, (_, index) => {
    if (filter?.(index)) {
      return null
    }

    const text = pad(index)
    return { text, value: text }
  }).filter(Boolean) as PickerColumnOption[]
}

function parseTimeParts(time: string, useSeconds: boolean) {
  const [hour = '00', minute = '00', second = '00'] = time.split(':')
  const parts = [pad(toNumber(hour)), pad(toNumber(minute))]

  if (useSeconds) {
    parts.push(pad(toNumber(second)))
  }

  return parts
}

function joinTimeParts(values: (string | number)[], useSeconds: boolean) {
  const hour = pad(toNumber(values[0]))
  const minute = pad(toNumber(values[1]))

  if (useSeconds) {
    return `${hour}:${minute}:${pad(toNumber(values[2] ?? 0))}`
  }

  return `${hour}:${minute}`
}

export default defineComponent({
  name,
  components: {
    MIconMenuDown,
    MpIcon,
    MpPopup,
    MpButton,
    MpPicker,
    MpTimePicker,
    MpFieldDecorator,
  },
  props,
  emits: ['close', 'update:modelValue', 'update:open', 'focus', 'blur', 'change', 'clear', 'click'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const isFocusing = ref(false)
    const open = useVModel(props, 'open', { defaultValue: false, emit, eventName: 'update:open' })
    const root = ref<HTMLElement | null>(null)
    const draft = ref<string | undefined>()
    const confirming = ref(false)
    const cursor = computed(() => (props.disabled || props.readonly ? '' : 'pointer'))
    const { form } = useForm()
    const { mergedError, eventHandlers, hasOuterLabel } = useFormItem()
    const isEmptyModelValue = computed(() => isEmpty(props.modelValue))
    const mergedHint = computed(() => (hasOuterLabel.value ? false : props.hint))
    const displayLabel = computed(() => (isEmpty(props.modelValue) ? '' : props.modelValue))
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
    const timePickerBindingProps = computed(() => ({ ...props.timePickerProps }))
    const pickerBindingProps = computed(() => ({ ...props.pickerProps }))
    const popupBindingProps = computed(() => ({
      ...props.popupProps,
      popupContainer: props.popupContainer !== undefined ? props.popupContainer : props.popupProps?.popupContainer,
    }))
    const titleText = computed(() => props.timePickerProps?.hint ?? (pt ? pt : t)('pickerTitle'))
    const cancelButtonText = computed(() => (pt ? pt : t)('pickerCancelButtonText'))
    const confirmButtonText = computed(() => (pt ? pt : t)('pickerConfirmButtonText'))
    const pickerColumns = computed(() => {
      const { disabledTime, useSeconds } = props
      const columns: PickerColumnOption[][] = [
        buildColumn(24, disabledTime?.hours ? (hour) => !!disabledTime.hours?.(hour) : undefined),
        buildColumn(60, disabledTime?.minutes ? (minute) => !!disabledTime.minutes?.(minute) : undefined),
      ]

      if (useSeconds) {
        columns.push(buildColumn(60, disabledTime?.seconds ? (second) => !!disabledTime.seconds?.(second) : undefined))
      }

      return columns
    })
    const pickerValue = computed(() => parseTimeParts(draft.value ?? '00:00', props.useSeconds))

    watch(open, (visible) => {
      if (visible) {
        draft.value = props.modelValue ?? (props.useSeconds ? '00:00:00' : '00:00')
        return
      }
      if (!confirming.value) {
        emit('close', props.modelValue)
      }
      confirming.value = false
    })

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

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
      emit('update:modelValue', undefined)
      emit('clear', undefined)
      eventHandlers.value.onClear?.()
      emit('change', undefined)
      eventHandlers.value.onChange?.()
    }

    function handleConfirm() {
      const { disabled, readonly } = props
      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }
      const value = draft.value
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

    function handlePickerChange(values: (string | number)[]) {
      if (form?.readonly.value || props.readonly) {
        return
      }

      draft.value = joinTimeParts(values, props.useSeconds)
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
      timePickerBindingProps,
      pickerBindingProps,
      pickerColumns,
      pickerValue,
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
      handlePickerChange,
      focus,
      blur,
    }
  },
})
</script>
