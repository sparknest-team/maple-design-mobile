<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-button style="margin-bottom: 8px" @click="loading = !loading">
    {{ loading ? '关闭' : '打开' }}
  </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card
      title="介绍"
      description="Maple 是一个基于Vue3开发的 Material 风格移动端组件库，全面拥抱Vue3生态，由社区的小伙伴开发和维护。"
    />
  </mp-loading>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
