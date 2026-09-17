<script setup>
import { reactive, ref } from 'vue'

const basicValue = ref('')
</script>

<template>
  <mp-textarea v-model="basicValue" :rows="4" placeholder="请输入多行文本" />
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
