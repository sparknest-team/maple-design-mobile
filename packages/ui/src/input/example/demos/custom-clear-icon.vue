<script setup>
import { ref } from 'vue'

const customClearValue = ref('Clear me')
</script>

<template>
  <mp-input v-model="customClearValue" clearable placeholder="可清除文本">
    <template #clear-icon="{ clear }"><m-icon-error @click="clear" /></template>
  </mp-input>
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
