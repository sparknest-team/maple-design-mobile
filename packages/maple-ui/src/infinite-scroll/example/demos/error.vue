<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'
import type { InfiniteScrollStatus } from '@maplejs/maple-ui'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
const items = ref<number[]>([])
let failedOnce = false
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})

function load() {
  setTimeout(() => {
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
</script>

<template>
  <div ref="scroller" class="infinite-scroll-demo">
    <mp-infinite-scroll v-model:status="status" :target="scroller" @load="load" @retry="load">
      <mp-cell v-for="item in items" :key="item">{{ english ? 'List item' : '列表项' }} {{ item }}</mp-cell>
      <template #error="{ retry }">
        {{ english ? 'Load failed.' : '加载失败，' }}
        <mp-link @click="retry">{{ english ? 'Try again' : '点击重试' }}</mp-link>
      </template>
    </mp-infinite-scroll>
  </div>
</template>

<style scoped>
.infinite-scroll-demo {
  height: 280px;
  overflow-y: auto;
  background: #fcfcfc;
}
</style>
