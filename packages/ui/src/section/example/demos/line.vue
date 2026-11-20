<template>
  <mp-section title="发布记录">
    <template #extra>
      <mp-button :aria-expanded="expanded" @click="expanded = !expanded">
        {{ expanded ? '只看最新' : '查看全部' }}
      </mp-button>
    </template>
    <ul>
      <li>v1.2 · 新增项目导出</li>
      <li v-if="expanded">v1.1 · 新增成员管理</li>
    </ul>
  </mp-section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>
