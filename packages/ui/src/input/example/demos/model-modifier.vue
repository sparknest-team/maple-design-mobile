<script setup>
import { ref } from 'vue'

const trimValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model.trim="trimValue" placeholder="输入内容并在两侧保留空格" />
    <div class="input-example__value">当前值：“{{ trimValue }}”</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
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
