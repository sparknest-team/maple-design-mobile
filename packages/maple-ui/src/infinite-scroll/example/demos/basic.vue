<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'
import type { InfiniteScrollStatus } from '@maplejs/maple-ui'

const scroller = ref<HTMLElement>()
const status = ref<InfiniteScrollStatus>('idle')
const items = ref<number[]>([])
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})

function load() {
  setTimeout(() => {
    for (let index = 0; index < 12; index++) {
      items.value.push(items.value.length + 1)
    }
    status.value = items.value.length >= 60 ? 'finished' : 'idle'
  }, 500)
}
</script>

<template>
  <div ref="scroller" class="infinite-scroll-demo">
    <mp-infinite-scroll v-model:status="status" :target="scroller" :bottom-offset="24" @load="load">
      <mp-cell v-for="item in items" :key="item">{{ english ? 'List item' : '列表项' }} {{ item }}</mp-cell>
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
