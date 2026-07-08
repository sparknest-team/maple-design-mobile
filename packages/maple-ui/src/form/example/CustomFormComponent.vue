<script setup>
import { nextTick } from 'vue'
import Form from '..'
import MpFormDetails from '../../form-details'
import MpIcon from '../../icon'

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  rules: {
    type: Array,
  },
  validateTrigger: {
    type: Array,
    default: () => ['onToggle'],
  },
  extraMessage: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])

const { useForm, useValidation } = Form
const {
  errorMessage,
  validateWithTrigger: _validateWithTrigger,
  validate: _validate,
  resetValidation,
} = useValidation()
const { bindForm, form } = useForm()

const validate = () => _validate(props.rules, props.modelValue)

function reset() {
  emit('update:modelValue', false)
  resetValidation()
}

function validateWithTrigger(trigger) {
  nextTick(() => {
    const { validateTrigger, rules, modelValue } = props
    _validateWithTrigger(validateTrigger, trigger, rules, modelValue)
  })
}

function handleClick() {
  if (props.readonly || props.disabled || form?.readonly.value || form?.disabled.value) {
    return
  }

  emit('update:modelValue', !props.modelValue)
  validateWithTrigger('onToggle')
}

const apis = {
  reset,
  validate,
  resetValidation,
}

defineExpose(apis)
bindForm?.(apis)
</script>

<template>
  <div
    class="mp-custom-form-component"
    :class="{
      'mp-custom-form-component--disabled': disabled || form?.disabled.value,
      'mp-custom-form-component--error': errorMessage,
    }"
  >
    <div class="mp-custom-form-component__container" @click="handleClick">
      <mp-icon
        class="mp-custom-form-component__icon"
        :name="modelValue ? 'checkbox-marked-circle' : 'close-circle'"
        :transition="250"
      />
      <slot />
    </div>
    <mp-form-details :error-message="errorMessage" :extra-message="extraMessage" />
  </div>
</template>

<style scoped lang="less">
.mp-custom-form-component {
  cursor: pointer;

  &__container {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 6px;
    font-size: 24px;
  }

  &--mp-disabled {
    color: var(--mp-color-text-disabled);
    cursor: not-allowed;
  }

  &--mp-error {
    color: var(--mp-color-danger);
  }
}
</style>
