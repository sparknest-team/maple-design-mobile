<template>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16" wrap>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar>{{ text }}</mp-avatar>
        <span class="label">圆形 · 自适应</span>
      </mp-space>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar shape="square">{{ text }}</mp-avatar>
        <span class="label">方形 · 自适应</span>
      </mp-space>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar :auto-fix-font-size="false">{{ text }}</mp-avatar>
        <span class="label">关闭自适应</span>
      </mp-space>
    </mp-space>
    <mp-input v-model="text" :style="{ width: '240px' }" placeholder="输入更长的文字看缩放" clearable />
  </mp-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('Cedar')
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
