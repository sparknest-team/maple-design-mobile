<script setup>
import Form from '..'
import MpIcon from '../../icon'

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  readonly: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const { useForm, useFormItem } = Form
const { form } = useForm()
const { mergedError, eventHandlers } = useFormItem()

function handleClick() {
  if (props.readonly || props.disabled || form?.readonly.value || form?.disabled.value) {
    return
  }

  emit('update:modelValue', !props.modelValue)
  eventHandlers.value.onChange?.()
}
</script>

<template>
  <div
    class="mp-custom-form-component"
    :class="{
      'mp-custom-form-component--disabled': disabled || form?.disabled.value,
      'mp-custom-form-component--error': mergedError,
    }"
  >
    <div class="mp-custom-form-component__container" @click="handleClick">
      <m-icon-checkbox-marked-circle v-if="modelValue" class="mp-custom-form-component__icon" />
      <m-icon-close-circle v-else class="mp-custom-form-component__icon" />
      <slot />
    </div>
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
