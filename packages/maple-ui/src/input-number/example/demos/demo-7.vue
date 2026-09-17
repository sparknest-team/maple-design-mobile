<script setup>
import { ref } from 'vue'

const customIconValue = ref()
</script>

<template>
  <div class="input-number-example">
    <mp-input-number v-model="customIconValue" clearable placeholder="Please enter something">
      <template #plus>
        <m-icon-plus />
      </template>
      <template #minus>
        <m-icon-minus />
      </template>
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
