<template>
  <div :class="n('wrap')">
    <div :class="n()" @click="handleClick">
      <div
        ref="action"
        v-hover:desktop="handleHovering"
        v-ripple="{ disabled: formReadonly || readonly || formDisabled || disabled || !ripple }"
        :class="
          classes(
            n('action'),
            [checked || isIndeterminate, n('--checked'), n('--unchecked')],
            [mergedError || checkboxGroupErrorMessage, n('--error')],
            [formDisabled || disabled, n('--disabled')],
          )
        "
        :style="{ color: checked || isIndeterminate ? checkedColor : uncheckedColor }"
        :tabindex="disabled || formDisabled ? undefined : '0'"
        @keydown="keyboard.keydown"
        @keyup="keyboard.keyup"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <slot v-if="isIndeterminate" name="indeterminate-icon">
          <MIconMinusBoxFill :class="n('icon')" :size="iconSize" mp-checkbox-cover />
        </slot>
        <slot v-if="checked && !isIndeterminate" name="checked-icon">
          <MIconCheckboxMarkedFill :class="n('icon')" :size="iconSize" mp-checkbox-cover />
        </slot>
        <slot v-if="!checked && !isIndeterminate" name="unchecked-icon">
          <MIconCheckboxBlank :class="n('icon')" :size="iconSize" mp-checkbox-cover />
        </slot>
        <mp-hover-overlay
          :hovering="!disabled && !formDisabled && hovering"
          :focusing="!disabled && !formDisabled && isFocusing"
        />
      </div>

      <div
        v-if="$slots.default"
        :class="
          classes(
            n('text'),
            [mergedError || checkboxGroupErrorMessage, n('--error')],
            [formDisabled || disabled, n('--disabled')],
          )
        "
        @click="handleTextClick"
      >
        <slot :checked="checked" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  IconCheckboxBlank as MIconCheckboxBlank,
  IconCheckboxMarkedFill as MIconCheckboxMarkedFill,
  IconMinusBoxFill as MIconMinusBoxFill,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import { useCheckboxControl } from '../checkbox/use-choice-control'
import { useChoiceKeyboard } from '../checkbox/use-choice-keyboard'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useCheckboxGroup, type CheckboxProvider } from './provide'
import { useChoiceRegistration } from './use-checkbox-group-methods'
import { useChoiceForm } from './use-choice-form'

const { name, n, classes } = createNamespace('checkbox')

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    MIconMinusBoxFill,
    MIconCheckboxMarkedFill,
    MIconCheckboxBlank,
    MpHoverOverlay,
  },
  props,
  emits: ['change', 'click', 'update:modelValue', 'focus', 'blur'],
  setup(props, { emit }) {
    const action = ref<HTMLElement | null>(null)
    const isFocusing = ref(false)
    const isIndeterminate = computed(() => props.indeterminate)
    const optionValue = computed(() => props.value)
    const { checkboxGroup, bindCheckboxGroup } = useCheckboxGroup()
    const { hovering, handleHovering } = useHoverOverlay()
    const state = useChoiceForm({
      get disabled() {
        return props.disabled ?? checkboxGroup?.disabled.value
      },
      get readonly() {
        return props.readonly ?? checkboxGroup?.readonly.value
      },
      get error() {
        return props.error ?? checkboxGroup?.errorMessage.value
      },
    })
    const { mergedError, eventHandlers } = state
    const mergedDisabled = computed(() => checkboxGroup?.disabled.value || state.mergedDisabled.value)
    const mergedReadonly = computed(() => checkboxGroup?.readonly.value || state.mergedReadonly.value)
    const { checked, toggle } = useCheckboxControl(
      props,
      (value, event) => {
        emit('update:modelValue', value)
        emit('change', value, event)
        eventHandlers.value.onChange?.(event)
      },
      () => mergedDisabled.value || mergedReadonly.value,
      checkboxGroup
        ? {
            value: () => checkboxGroup.modelValue.value,
            change: (next, event) => {
              next.includes(props.value)
                ? checkboxGroup.onChecked(props.value, event)
                : checkboxGroup.onUnchecked(props.value, event)
            },
          }
        : undefined,
    )

    useChoiceRegistration(checkboxGroup?.registerChoice, {
      value: () => props.value,
      disabled: () => mergedDisabled.value,
      readonly: () => mergedReadonly.value,
      element: () => action.value,
    })

    const checkboxProvider: CheckboxProvider = {
      value: optionValue,
      checked,
      disabled: mergedDisabled,
      readonly: mergedReadonly,
    }

    call(bindCheckboxGroup, checkboxProvider)

    const keyboard = useChoiceKeyboard(
      () => action.value?.click(),
      () => mergedDisabled.value || mergedReadonly.value,
    )

    function handleClick(e: Event) {
      if (mergedDisabled.value) {
        return
      }

      emit('click', e)

      if (mergedReadonly.value) {
        return
      }

      toggle(undefined, e)
    }

    function handleTextClick() {
      action.value!.focus()
    }

    return {
      action,
      keyboard,
      isFocusing,
      isIndeterminate,
      checked,
      mergedError,
      checkboxGroupErrorMessage: checkboxGroup?.errorMessage,
      formDisabled: mergedDisabled,
      formReadonly: mergedReadonly,
      hovering,
      n,
      classes,
      handleHovering,
      handleClick,
      handleTextClick,
      toggle,
      focus: (options?: FocusOptions) => {
        if (!mergedDisabled.value) {
          action.value?.focus(options)
        }
      },
      blur: () => action.value?.blur(),
      handleFocus(event: FocusEvent) {
        isFocusing.value = true
        emit('focus', event)
        eventHandlers.value.onFocus?.(event)
      },
      handleBlur(event: FocusEvent) {
        keyboard.reset()
        isFocusing.value = false
        emit('blur', event)
        eventHandlers.value.onBlur?.(event)
      },
    }
  },
})
</script>
