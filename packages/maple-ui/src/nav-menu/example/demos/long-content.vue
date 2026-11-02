<script setup lang="ts">
import { ref } from 'vue'
import type { NavMenuKey, NavMenuOption } from '../../..'

const value = ref<NavMenuKey | null>(null)
const options: NavMenuOption[] = Array.from({ length: 40 }, (_, index) => ({ key: index, label: `选项 ${index + 1}` }))
const conditions = Array.from({ length: 40 }, (_, index) => ({ value: index, label: `条件 ${index + 1}` }))
const draft = ref<Array<string | number | boolean>>([])
const applied = ref<Array<string | number | boolean>>([])
function apply(close: () => void) {
  applied.value = [...draft.value]
  close()
}
function reset(close: () => void) {
  draft.value = []
  applied.value = []
  close()
}
</script>

<template>
  <div data-nav-long-demo>
    <mp-nav-menu>
      <mp-nav-menu-item v-model="value" label="长列表" :options="options" />
      <mp-nav-menu-item label="更多条件" popup-layout="full" :highlight="applied.length > 0" :hide-on-select="false">
        <template #content="{ close }">
          <div style="height: 100%; display: flex; flex-direction: column; gap: 16px">
            <strong>筛选条件</strong>
            <div data-nav-filter-body style="flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain">
              <mp-checkbox-group v-model="draft" :options="conditions" orientation="vertical" />
            </div>
            <mp-space>
              <mp-button @click="reset(close)">重置</mp-button>
              <mp-button @click="apply(close)">应用条件</mp-button>
            </mp-space>
          </div>
        </template>
      </mp-nav-menu-item>
    </mp-nav-menu>
    <p aria-live="polite">长列表选中：{{ value ?? '未选择' }}；已应用 {{ applied.length }} 项</p>
  </div>
</template>
