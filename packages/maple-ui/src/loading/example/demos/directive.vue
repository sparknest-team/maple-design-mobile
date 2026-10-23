<script setup>
import { ref } from 'vue'

const loading = ref(false)
const simpleDirectiveLoading = ref(false)
const configuredDirectiveLoading = ref(false)
</script>

<template>
  <mp-space direction="column">
    <h4 class="loading-demo__title">简单用法</h4>
    <mp-switch v-model="simpleDirectiveLoading" />
    <mp-card
      v-mp-loading="simpleDirectiveLoading"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />

    <h4 class="loading-demo__title">复杂配置</h4>
    <mp-switch v-model="configuredDirectiveLoading" />
    <mp-card
      v-mp-loading="{
        loading: configuredDirectiveLoading,
        tip: '加载中...',
        color: 'var(--mp-color-primary)',
        background: 'color-mix(in srgb, var(--mp-color-bg-white) 72%, transparent)',
      }"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}

.loading-demo__title {
  margin: 12px 0 4px;
  font-size: 14px;
}
</style>
