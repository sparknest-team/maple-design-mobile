<script setup>
import { reactive, ref } from 'vue'

const filledValue = ref('')
const outlineValue = ref('')
const standardValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="filledValue" :rows="3" variant="filled" placeholder="Filled" />
    <mp-textarea v-model="outlineValue" :rows="3" variant="outline" placeholder="Outline" />
    <mp-textarea v-model="standardValue" :rows="3" variant="standard" placeholder="Standard" />
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
