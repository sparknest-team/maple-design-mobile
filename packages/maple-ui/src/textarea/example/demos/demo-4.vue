<script setup>
import { reactive, ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const sizeValues = reactive(Object.fromEntries(sizes.map((size) => [size, ''])))
</script>

<template>
  <template v-for="size in sizes" :key="size">
    <div class="textarea-example__caption">{{ size }}</div>
    <mp-textarea v-model="sizeValues[size]" :rows="2" :size="size" variant="outline" :placeholder="`${size} 尺寸`" />
  </template>
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
