<script setup>
import { ref } from 'vue'

const value = ref()
const errorValue = ref()
const disabledValue = ref()
const errorDisabledValue = ref()
</script>

<template>
  <div class="input-number-example">
    <mp-input-number v-model="value" clearable placeholder="请输入" />
    <mp-input-number v-model="errorValue" clearable error placeholder="error" />
    <mp-input-number v-model="disabledValue" clearable disabled placeholder="disabled" />
    <mp-input-number v-model="errorDisabledValue" clearable error disabled placeholder="error disabled" />
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
    color: var(--mp-field-color-text);
    font-size: 14px;
  }
}
</style>
