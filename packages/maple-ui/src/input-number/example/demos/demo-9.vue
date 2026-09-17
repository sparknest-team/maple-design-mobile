<script setup>
import { ref } from 'vue'

const inputOnlyValue = ref(1)
</script>

<template>
  <div class="input-number-example">
    <mp-input-number v-model="inputOnlyValue" mode="input" clearable placeholder="请输入数量" />
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
