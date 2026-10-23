<script setup>
import { reactive, ref } from 'vue'

const limitedValue = ref('')
</script>

<template>
  <p>Length counts UTF-16 code units. An emoji that does not fit is omitted without splitting its surrogate pair.</p>
  <mp-textarea
    v-model="limitedValue"
    clearable
    :max-length="100"
    show-word-limit
    placeholder="Up to 100 characters"
    resize
    :rows="4"
    variant="outline"
  />
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
