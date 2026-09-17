<script setup>
import { ref } from 'vue'

const prefixValue = ref()
const prefixSplitValue = ref()
</script>

<template>
  <div class="input-number-example">
    <mp-input-number v-model="prefixValue" clearable placeholder="请输入">
      <template #prefix>+86</template>
      <template #suffix><span>RMB</span></template>
    </mp-input-number>
    <mp-input-number v-model="prefixSplitValue" clearable mode="button" placeholder="请输入">
      <template #prefix>
        <m-icon-refresh />
      </template>
      <template #suffix><span>RMB</span></template>
    </mp-input-number>
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
