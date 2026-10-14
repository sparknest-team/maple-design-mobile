<script setup>
import { reactive, ref } from 'vue'

const hintValue = ref('')
const noHintValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="hintValue" hint :rows="3" placeholder="Floats on focus or with content" />
    <mp-textarea v-model="noHintValue" :hint="false" :rows="3" placeholder="Native placeholder" />
  </mp-space>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
