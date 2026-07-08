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
            [errorMessage || checkboxGroupErrorMessage, n('--error')],
            [formDisabled || disabled, n('--disabled')],
          )
        "
        :style="{ color: checked || isIndeterminate ? checkedColor : uncheckedColor }"
        :tabindex="disabled || formDisabled ? undefined : '0'"
        @focus="isFocusing = true"
        @blur="isFocusing = false"
      >
        <slot v-if="isIndeterminate" name="indeterminate-icon">
          <mp-icon :class="n('icon')" name="minus-box" :size="iconSize" mp-checkbox-cover />
        </slot>
        <slot v-if="checked && !isIndeterminate" name="checked-icon">
          <mp-icon :class="n('icon')" name="checkbox-marked" :size="iconSize" mp-checkbox-cover />
        </slot>
        <slot v-if="!checked && !isIndeterminate" name="unchecked-icon">
          <mp-icon :class="n('icon')" name="checkbox-blank-outline" :size="iconSize" mp-checkbox-cover />
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
            [errorMessage || checkboxGroupErrorMessage, n('--error')],
            [formDisabled || disabled, n('--disabled')],
          )
        "
        @click="handleTextClick"
      >
        <slot :checked="checked" />
      </div>
    </div>

    <mp-form-details :error-message="errorMessage" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import MpFormDetails from '../form-details'
import { useForm } from '../form/provide'
import Hover from '../hover'
import MpHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace, useValidation } from '../utils/components'
import { props, type CheckboxValidateTrigger } from './props'
import { useCheckboxGroup, type CheckboxProvider } from './provide'

const { name, n, classes } = createNamespace('checkbox')

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    MpIcon,
    MpFormDetails,
    MpHoverOverlay,
  },
  props,
  setup(props) {
    const action = ref<HTMLElement | null>(null)
    const isFocusing = ref(false)
    const value = useVModel(props, 'modelValue')
    const isIndeterminate = useVModel(props, 'indeterminate')
    const checked = computed(() => value.value === props.checkedValue)
    const checkedValue = computed(() => props.checkedValue)
    const { checkboxGroup, bindCheckboxGroup } = useCheckboxGroup()
    const { hovering, handleHovering } = useHoverOverlay()
    const { form, bindForm } = useForm()
    const {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation,
    } = useValidation()

    const checkboxProvider: CheckboxProvider = {
      checkedValue,
      checked,
      sync,
      validate,
      resetValidation,
      reset,
    }

    call(bindCheckboxGroup, checkboxProvider)
    call(bindForm, checkboxProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function validateWithTrigger(trigger: CheckboxValidateTrigger) {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props
        vt(validateTrigger, trigger, rules, modelValue)
      })
    }

    function change(changedValue: any) {
      const { checkedValue, onChange } = props

      value.value = changedValue
      call(onChange, value.value, isIndeterminate.value)
      validateWithTrigger('onChange')
      changedValue === checkedValue ? checkboxGroup?.onChecked(checkedValue) : checkboxGroup?.onUnchecked(checkedValue)
    }

    function handleClick(e: Event) {
      const { disabled, readonly, checkedValue, uncheckedValue, onClick } = props

      if (form?.disabled.value || disabled) {
        return
      }

      call(onClick, e)

      if (form?.readonly.value || readonly) {
        return
      }

      if (isIndeterminate.value === true) {
        isIndeterminate.value = false
        call(props.onChange, value.value, isIndeterminate.value)
        validateWithTrigger('onChange')
        return
      }

      const maximum = checkboxGroup ? checkboxGroup.checkedCount.value >= Number(checkboxGroup.max.value) : false

      if (!checked.value && maximum) {
        return
      }

      change(checked.value ? uncheckedValue : checkedValue)
    }

    function handleTextClick() {
      action.value!.focus()
    }

    function sync(values: Array<any>) {
      const { checkedValue, uncheckedValue } = props
      value.value = values.includes(checkedValue) ? checkedValue : uncheckedValue
    }

    // expose
    function reset() {
      value.value = props.uncheckedValue
      resetValidation()
    }

    // expose
    function toggle(changedValue?: any) {
      const { checkedValue, uncheckedValue } = props

      const shouldReverse = ![checkedValue, uncheckedValue].includes(changedValue)
      if (shouldReverse) {
        changedValue = checked.value ? uncheckedValue : checkedValue
      }

      change(changedValue)
    }

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

    // expose
    function validate() {
      return v(props.rules, props.modelValue)
    }

    return {
      action,
      isFocusing,
      isIndeterminate,
      checked,
      errorMessage,
      checkboxGroupErrorMessage: checkboxGroup?.errorMessage,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      hovering,
      n,
      classes,
      handleHovering,
      handleClick,
      handleTextClick,
      toggle,
      reset,
      validate,
      resetValidation,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../ripple/ripple';
@import '../form-details/formDetails';
@import '../icon/icon';
@import '../hover-overlay/hoverOverlay';
@import './checkbox';
</style>
