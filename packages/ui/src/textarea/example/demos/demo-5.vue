<script setup>
import { reactive, ref } from 'vue'

const limitedValue = ref('')
</script>

<template>
  <p>长度按 UTF-16 码元计算；边界不足时舍去整个 emoji，不拆开代理对。</p>
  <mp-textarea
    v-model="limitedValue"
    clearable
    :max-length="100"
    show-word-limit
    placeholder="最多输入 100 个字符"
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
