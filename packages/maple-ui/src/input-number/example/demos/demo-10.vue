<script setup>
import { ref } from 'vue'

const value = ref()
const modelEventValue = ref(15)
</script>

<template>
  <div class="input-number-example">
    <mp-input-number v-model="modelEventValue" :min="10" :max="100" model-event="input" placeholder="Please Enter" />
    <div class="input-number-example__value">value: {{ modelEventValue }}</div>
  </div>
</template>

<style lang="less">
.input-number-example {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .mp-input-number {
    width: 320px;
    max-width: 100%;
  }

  &__value {
    color: var(--mp-field-control-text-color);
    font-size: 14px;
  }
}
</style>
