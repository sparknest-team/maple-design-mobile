<script setup>
import { ref } from 'vue'

const maxLengthValue = ref('Maple')
</script>

<template>
  <mp-input v-model="maxLengthValue" :max-length="10" clearable placeholder="最多输入 10 个字符" />
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
