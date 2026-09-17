<script setup>
import { ref } from 'vue'

const value = ref()
const precisionValue = ref()
</script>

<template>
  <div class="input-number-example">
    <mp-input-number
      v-model="precisionValue"
      :step="1.2"
      :precision="2"
      clearable
      placeholder="请输入"
      :default-value="3.6"
    />
    <mp-input-number :step="1.22" clearable placeholder="请输入" :default-value="1.2" />
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
