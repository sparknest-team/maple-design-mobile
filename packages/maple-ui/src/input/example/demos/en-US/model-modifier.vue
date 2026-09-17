<script setup>
import { ref } from 'vue'

const trimValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model.trim="trimValue" placeholder="Enter text with surrounding spaces" />
    <div class="input-example__value">Current value：“{{ trimValue }}”</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
