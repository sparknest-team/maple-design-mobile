<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NavMenuKey, NavMenuOption } from '../../..'

const category = ref<NavMenuKey | null>(null)
const region = ref<NavMenuKey | null>(null)
const keyword = ref('')
const appliedKeyword = ref('')
const categories: NavMenuOption[] = [
  { key: 'all', label: '全部分类' },
  { key: 'design', label: '设计资源' },
  { key: 'development', label: '开发工具' },
]
const regions: NavMenuOption[] = [
  { key: 'all', label: '全部地区' },
  { key: 'east', label: '华东' },
  { key: 'south', label: '华南' },
  { key: 'north', label: '华北' },
]
const categoryLabel = computed(() => categories.find((item) => item.key === category.value)?.label ?? '未选择')
const regionLabel = computed(() => regions.find((item) => item.key === region.value)?.label ?? '未选择')
function resetFilters(close: () => void) {
  keyword.value = ''
  appliedKeyword.value = ''
  close()
}
function applyFilters(close: () => void) {
  appliedKeyword.value = keyword.value.trim()
  close()
}
</script>
<template>
  <div>
    <mp-nav-menu mode="horizontal">
      <mp-nav-menu-item v-model="category" label="分类" :options="categories" />
      <mp-nav-menu-item
        v-model="region"
        label="地区"
        :options="regions"
        options-mode="horizontal"
        popup-layout="full-width"
      />
      <mp-nav-menu-item label="更多筛选" :highlight="!!appliedKeyword" popup-layout="full" :hide-on-select="false">
        <template #content="{ close }">
          <div style="height: 100%; display: flex; flex-direction: column; gap: 16px">
            <div style="flex: 1; min-height: 0; overflow-y: auto">
              <mp-space direction="column" style="width: 100%">
                <strong>按关键词筛选</strong>
                <mp-input v-model="keyword" placeholder="输入资源名称" aria-label="资源名称" />
              </mp-space>
            </div>
            <mp-space>
              <mp-button @click="resetFilters(close)">重置</mp-button>
              <mp-button @click="applyFilters(close)">应用</mp-button>
            </mp-space>
          </div>
        </template>
      </mp-nav-menu-item>
    </mp-nav-menu>
    <p aria-live="polite">分类：{{ categoryLabel }}；地区：{{ regionLabel }}；关键词：{{ appliedKeyword || '不限' }}</p>
  </div>
</template>
