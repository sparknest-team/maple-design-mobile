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
        @focus="isFocusing = true"
        @blur="isFocusing = false"
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
import { call, preventDefault } from '@maplejs/maple-shared'
import { useEventListener, useVModel } from '@maplejs/maple-use'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { useCheckboxGroup, type CheckboxProvider } from './provide'

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
  emits: ['change', 'click', 'update:modelValue', 'update:indeterminate'],
  setup(props, { emit }) {
    const action = ref<HTMLElement | null>(null)
    const isFocusing = ref(false)
    const model = useVModel(props, 'modelValue', { emit, eventName: 'update:modelValue' })
    const isIndeterminate = useVModel(props, 'indeterminate', { emit, eventName: 'update:indeterminate' })
    const checked = computed(() => model.value === props.value)
    const optionValue = computed(() => props.value)
    const { checkboxGroup, bindCheckboxGroup } = useCheckboxGroup()
    const { hovering, handleHovering } = useHoverOverlay()
    const { form } = useForm()
    const { mergedError, eventHandlers } = useFormItem()

    const checkboxProvider: CheckboxProvider = {
      value: optionValue,
      checked,
      sync,
    }

    call(bindCheckboxGroup, checkboxProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function change(changedValue: any) {
      const { value: optionVal } = props

      model.value = changedValue
      emit('change', model.value, isIndeterminate.value)
      eventHandlers.value.onChange?.()
      changedValue === optionVal ? checkboxGroup?.onChecked(optionVal) : checkboxGroup?.onUnchecked(optionVal)
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

      if (isIndeterminate.value === true) {
        isIndeterminate.value = false
        emit('change', model.value, isIndeterminate.value)
        eventHandlers.value.onChange?.()
        return
      }

      const maximum = checkboxGroup ? checkboxGroup.checkedCount.value >= Number(checkboxGroup.max.value) : false

      if (!checked.value && maximum) {
        return
      }

      change(checked.value ? false : optionVal)
    }

    function handleTextClick() {
      action.value!.focus()
    }

    function sync(values: Array<any>) {
      const { value: optionVal } = props
      model.value = values.includes(optionVal) ? optionVal : false
    }

    // expose
    function toggle(changedValue?: any) {
      const { value: optionVal } = props

      const shouldReverse = ![optionVal, false].includes(changedValue)
      if (shouldReverse) {
        changedValue = checked.value ? false : optionVal
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

    return {
      action,
      isFocusing,
      isIndeterminate,
      checked,
      mergedError,
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
    }
  },
})
</script>
