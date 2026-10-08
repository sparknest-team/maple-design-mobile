<template>
  <div :class="n('wrap')">
    <div
      role="radio"
      :aria-checked="checked"
      :class="
        classes(
          n(),
          [mergedVariant === 'button', n('--button')],
          [checked, n('--checked')],
          [formDisabled, n('--disabled')],
          [mergedError, n('--error')],
        )
      "
      v-bind="$attrs"
      @click="handleClick"
    >
      <div
        ref="action"
        v-ripple="{ disabled: formReadonly || readonly || formDisabled || disabled || !ripple }"
        v-hover:desktop="handleHovering"
        :class="
          classes(
            n('action'),
            [checked, n('--checked'), n('--unchecked')],
            [mergedError || radioGroupErrorMessage, n('--error')],
            [formDisabled || disabled, n('--disabled')],
          )
        "
        :tabindex="tabIndex"
        :style="{ color: checked ? checkedColor : uncheckedColor }"
        @keydown="keyboard.keydown"
        @keyup="keyboard.keyup"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <span v-if="mergedVariant === 'button'" :class="n('button-label')"><slot :checked="checked" /></span>
        <template v-else>
          <slot v-if="checked" name="checked-icon">
            <mp-icon :class="n('icon')" mp-radio-cover :size="iconSize"><MIconRadioMarked /></mp-icon>
          </slot>
          <slot v-else name="unchecked-icon">
            <mp-icon :class="n('icon')" mp-radio-cover :size="iconSize"><MIconRadioBlank /></mp-icon>
          </slot>
        </template>
        <mp-hover-overlay
          :hovering="!disabled && !formDisabled && hovering"
          :focusing="!disabled && !formDisabled && isFocusing"
        />
      </div>
      <div
        v-if="$slots.default && mergedVariant !== 'button'"
        :class="
          classes(
            n('text'),
            [mergedError || radioGroupErrorMessage, n('--error')],
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
import { IconRadioBlank as MIconRadioBlank, IconRadioMarked as MIconRadioMarked } from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import { useRadioControl } from '../checkbox/use-choice-control'
import { useChoiceForm } from '../checkbox/use-choice-form'
import { useChoiceKeyboard } from '../checkbox/use-choice-keyboard'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useRadioGroup, type RadioProvider } from './provide'
import { useRadioRegistration } from './use-radio-navigation'

const { name, n, classes } = createNamespace('radio')

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    MIconRadioMarked,
    MIconRadioBlank,
    MpIcon,
    MpHoverOverlay,
  },
  inheritAttrs: false,
  props,
  emits: ['click', 'change', 'update:modelValue', 'focus', 'blur'],
  setup(props, { emit }) {
    const action = ref<HTMLElement>()
    const isFocusing = ref(false)
    const { radioGroup, bindRadioGroup } = useRadioGroup()
    const mergedVariant = computed(() => radioGroup?.variant.value ?? props.variant)
    const { hovering, handleHovering } = useHoverOverlay()
    const state = useChoiceForm({
      get disabled() {
        return props.disabled ?? radioGroup?.disabled.value
      },
      get readonly() {
        return props.readonly ?? radioGroup?.readonly.value
      },
      get error() {
        return props.error ?? radioGroup?.errorMessage.value
      },
    })
    const { mergedError, eventHandlers } = state
    const mergedDisabled = computed(() => radioGroup?.disabled.value || state.mergedDisabled.value)
    const mergedReadonly = computed(() => radioGroup?.readonly.value || state.mergedReadonly.value)
    const { checked, select } = useRadioControl(
      props,
      (value, event) => {
        emit('update:modelValue', value)
        emit('change', value, event)
        eventHandlers.value.onChange?.(event)
      },
      () => mergedDisabled.value || mergedReadonly.value,
      radioGroup
        ? {
            value: () => radioGroup.modelValue.value,
            change: (value, event) => radioGroup.onToggle(value, event),
          }
        : undefined,
    )

    const tabIndex = useRadioRegistration(radioGroup?.navigation, {
      element: () => action.value,
      checked: () => checked.value,
      disabled: () => mergedDisabled.value,
      readonly: () => mergedReadonly.value,
      select,
    })

    const radioProvider: RadioProvider = {
      checked,
      disabled: mergedDisabled,
      isFocusing: computed(() => isFocusing.value),
    }

    call(bindRadioGroup, radioProvider)

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

      select(e)
    }

    function handleTextClick() {
      action.value!.focus()
    }

    return {
      action,
      mergedVariant,
      keyboard,
      isFocusing,
      checked,
      mergedError,
      radioGroupErrorMessage: radioGroup?.errorMessage,
      formDisabled: mergedDisabled,
      formReadonly: mergedReadonly,
      hovering,
      tabIndex,
      handleHovering,
      n,
      classes,
      handleClick,
      handleTextClick,
      select,
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
