<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import type { InfiniteScrollStatus } from '@maple-design/ui-vue'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
let timer: ReturnType<typeof setTimeout> | undefined
const items = ref<number[]>([])

function load() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    timer = undefined
    for (let index = 0; index < 12; index++) {
      items.value.push(items.value.length + 1)
    }
    status.value = items.value.length >= 48 ? 'finished' : 'idle'
  }, 500)
}
onBeforeUnmount(() => clearTimeout(timer))
onDeactivated(() => {
  clearTimeout(timer)
  timer = undefined
  if (status.value === 'loading') {
    status.value = 'idle'
  }
})
</script>

<template>
  <div ref="scroller" class="infinite-scroll-demo">
    <mp-infinite-scroll v-model:status="status" :target="scroller" bottom-offset="2rem" @load="load">
      <mp-cell v-for="item in items" :key="item">{{ english ? 'List item' : '列表项' }} {{ item }}</mp-cell>
      <template #loading>{{ english ? 'Loading more' : '正在努力加载' }}</template>
      <template #finished>{{ english ? 'All content loaded' : '已加载全部内容' }}</template>
    </mp-infinite-scroll>
  </div>
</template>

<style scoped>
.infinite-scroll-demo {
  height: 280px;
  overflow-y: auto;
  background: var(--mp-color-bg-1);
}
</style>
