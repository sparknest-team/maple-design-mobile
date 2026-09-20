<script setup>
import { ref } from 'vue'

const rangeValue = ref()
const rangeDisabledValue = ref()
</script>

<template>
  <div class="input-number-example">
    <mp-input-number v-model="rangeValue" :min="2" :max="10" clearable placeholder="请输入" />
    <mp-input-number v-model="rangeDisabledValue" :min="2" :max="10" clearable disabled placeholder="disabled" />
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
