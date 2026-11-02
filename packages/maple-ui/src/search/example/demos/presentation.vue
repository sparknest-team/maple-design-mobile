<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui'

const keyword = ref('')
const popup = ref(false)
const history = ref(['项目 A', '设备 B'])
const lastAction = ref('尚未搜索')
function recordSearch(result: SearchResult) {
  history.value = result.recentSearches
  lastAction.value = result.modelValue ?? ''
}
function recordAction(result: SearchResult) {
  lastAction.value = result.modelValue ?? ''
}
</script>
<template>
  <div class="search-demo">
    <mp-checkbox v-model="popup">popup 全屏搜索（关闭后为 direct）</mp-checkbox>
    <mp-search
      v-model="keyword"
      :edit-mode="popup ? 'popup' : 'direct'"
      :recent-searches="history"
      label="资源"
      placeholder="输入资源名称"
      clearable
      show-action
      action-text="取消"
      @cancel="lastAction = '已取消'"
      @search="recordSearch"
    />
    <mp-search
      v-model="keyword"
      search-button
      :button-props="{ variant: 'outline' }"
      placeholder="自定义按钮插槽"
      @search="recordAction"
    >
      <template #button-icon><span aria-hidden="true">⌕</span></template>
      <template #button-default>查找</template>
    </mp-search>
    <div>最近操作：{{ lastAction }}</div>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
</style>
