<template>
  <div :class="n('wrap')">
    <div role="radio" :aria-checked="checked" :class="n()" v-bind="$attrs" @click="handleClick">
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
        @focus="isFocusing = true"
        @blur="isFocusing = false"
      >
        <slot v-if="checked" name="checked-icon">
          <mp-icon :class="n('icon')" mp-radio-cover :size="iconSize"><MIconRadioMarked /></mp-icon>
        </slot>
        <slot v-else name="unchecked-icon">
          <mp-icon :class="n('icon')" mp-radio-cover :size="iconSize"><MIconRadioBlank /></mp-icon>
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
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import Hover from '../hover'
import MpHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useRadioGroup, type RadioProvider } from './provide'

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
  emits: ['click', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const action = ref<HTMLElement>()
    const isFocusing = ref(false)
    const model = useVModel(props, 'modelValue', { emit, eventName: 'update:modelValue' })
    const checked = computed(() => model.value === props.value)
    const { radioGroup, bindRadioGroup } = useRadioGroup()
    const { hovering, handleHovering } = useHoverOverlay()
    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()

    const tabIndex = computed(() => {
      const disabled = form?.disabled.value || props.disabled
      const isChecked = checked.value
      const hasCheckedInRadioGroup = radioGroup?.hasChecked.value

      if (disabled) {
        return
      }

      if (radioGroup && hasCheckedInRadioGroup && !isChecked) {
        return '-1'
      }

      return '0'
    })

    const radioProvider: RadioProvider = {
      sync,
      isFocusing: computed(() => isFocusing.value),
      // keyboard arrow move
      move() {
        action.value!.focus()
        action.value!.click()
      },
      moveable() {
        return !form?.disabled.value && !props.disabled && !form?.readonly.value && !props.readonly
      },
    }

    call(bindRadioGroup, radioProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function handleKeydown(event: KeyboardEvent) {
      if (!isFocusing.value) {
        return
      }

      const { key } = event

      if (key === 'Enter' || key === ' ') {
        preventDefault(event)
      }

      if (key === 'Enter') {
        action.value!.click()
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ') {
        preventDefault(event)
        action.value!.click()
      }
    }

    function change(changedValue: any) {
      const { value: optionVal } = props

      if (radioGroup && model.value === optionVal) {
        return
      }

      model.value = changedValue

      emit('change', model.value)
      radioGroup?.onToggle(optionVal)
      eventHandlers.value.onChange?.()
    }

    function handleClick(e: Event) {
      const { disabled, readonly, value: optionVal } = props

      if (form?.disabled.value || disabled) {
        return
      }

      emit('click', e)
      if (form?.readonly.value || readonly) {
        return
      }

      change(checked.value ? false : optionVal)
    }

    function handleTextClick() {
      action.value!.focus()
    }

    function sync(v: any) {
      const { value: optionVal } = props
      const isChecked = v === optionVal
      model.value = isChecked ? optionVal : false

      return isChecked
    }

    // expose
    function toggle(changedValue?: any) {
      const { value: optionVal } = props

      const shouldReverse = ![false, optionVal].includes(changedValue)
      if (shouldReverse) {
        changedValue = checked.value ? false : optionVal
      }

      change(changedValue)
    }

    return {
      action,
      isFocusing,
      checked,
      mergedError,
      radioGroupErrorMessage: radioGroup?.errorMessage,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      hovering,
      tabIndex,
      handleHovering,
      n,
      classes,
      handleClick,
      handleTextClick,
      toggle,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import '../icon/icon';
@import '../hover-overlay/hoverOverlay';
@import './radio';
</style>
