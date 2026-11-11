<script setup>
import { computed, useAttrs } from 'vue'
import { Form, useFormErrorDescription } from '@maple-design/ui-vue'

const props = defineProps({
  modelValue: Boolean,
  disabled: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
})

const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()
const { describe: describeError } = useFormErrorDescription()

const { mergedDisabled, mergedReadonly, mergedError, eventHandlers } = Form.useFormItem({
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),
})

function handleClick(event) {
  if (mergedReadonly.value || mergedDisabled.value) {
    return
  }

  emit('update:modelValue', !props.modelValue)
  eventHandlers.value.onChange?.(event)
}
</script>

<template>
  <div
    class="mp-custom-form-component"
    :class="{
      'mp-custom-form-component--disabled': mergedDisabled || mergedReadonly,
      'mp-custom-form-component--error': mergedError,
    }"
  >
    <mp-button
      html-type="button"
      role="checkbox"
      class="mp-custom-form-component__container"
      :aria-checked="modelValue"
      :aria-readonly="mergedReadonly"
      :aria-describedby="describeError(attrs['aria-describedby'])"
      :disabled="mergedDisabled"
      @click="handleClick"
      @focus="eventHandlers.onFocus?.($event)"
      @blur="eventHandlers.onBlur?.($event)"
    >
      <m-icon-checkbox-marked-circle-fill v-if="modelValue" class="mp-custom-form-component__icon" />
      <m-icon-close-circle-fill v-else class="mp-custom-form-component__icon" />
      <slot />
    </mp-button>
  </div>
</template>

<style scoped lang="less">
.mp-custom-form-component {
  cursor: pointer;

  &__container {
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: inherit;

    &:focus-visible {
      outline: 2px solid var(--mp-color-primary);
      outline-offset: 3px;
    }
  }

  &__icon {
    margin-right: 6px;
    font-size: 24px;
  }

  &--disabled {
    color: var(--mp-color-text-disabled);
    cursor: not-allowed;
  }

  &--error {
    color: var(--mp-color-danger);
  }
}
</style>
