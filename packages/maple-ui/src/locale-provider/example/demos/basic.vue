<script setup lang="ts">
import { computed, ref } from 'vue'

const custom = ref(false)
const messages = {
  'zh-CN': { emptyDescription: '暂无数据' },
  'en-US': { emptyDescription: 'No data' },
}
const activeMessages = computed(() =>
  custom.value
    ? {
        'zh-CN': { emptyDescription: '自定义暂无数据' },
        'en-US': { emptyDescription: 'Custom no data' },
      }
    : messages,
)
</script>

<template>
  <mp-checkbox v-model="custom">自定义语言包 / Custom messages</mp-checkbox>
  <mp-locale-provider locale="zh-CN" :messages="activeMessages">
    <mp-empty />
  </mp-locale-provider>
  <mp-locale-provider locale="en-US" :messages="activeMessages">
    <mp-empty />
  </mp-locale-provider>
</template>
