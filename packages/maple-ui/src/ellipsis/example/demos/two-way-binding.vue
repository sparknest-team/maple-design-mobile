<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>

<template>
  <div class="ellipsis-demo">
    <mp-button @click="expanded = !expanded">外部切换: {{ expanded }}</mp-button>
    <mp-ellipsis
      v-model:expand="expanded"
      style="width: 240px; max-width: 100%"
      :line-clamp="2"
      expand-trigger="click"
      :tooltip="false"
    >
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
