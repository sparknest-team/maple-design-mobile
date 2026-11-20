<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, ref } from 'vue'
import type { InfiniteScrollStatus } from '@maple-design/ui-vue'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
const items = ref<number[]>([])
let failedOnce = false
let timer: ReturnType<typeof setTimeout> | undefined

function load() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    timer = undefined
    if (!failedOnce && items.value.length >= 12) {
      failedOnce = true
      status.value = 'error'
      return
    }
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
    <mp-infinite-scroll v-model:status="status" :target="scroller" @load="load" @retry="load">
      <mp-cell v-for="item in items" :key="item">List item {{ item }}</mp-cell>
      <template #error="{ retry }">
        Load failed.
        <mp-button variant="text" size="sm" status="primary" @click="retry">Try again</mp-button>
      </template>
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
