<script setup lang="ts">
import { computed, ref } from 'vue'

const selected = ref<string[]>([])
const single = ref(false)
const columns = computed(() => [
  { title: '订单', dataIndex: 'key' },
  { title: '件数', dataIndex: 'units' },
])
const data = Array.from({ length: 6 }, (_, i) => ({ key: 'PO-' + (101 + i), units: i + 1, disabled: i === 2 }))
</script>

<template>
  <mp-checkbox v-model="single" edit-mode="direct" @change="selected = []">单选模式</mp-checkbox>
  <mp-table
    v-model:selected-keys="selected"
    :columns="columns"
    :data="data"
    :row-selection="{ type: single ? 'radio' : 'checkbox', showCheckedAll: true, onlyCurrent: false }"
    :pagination="{ defaultPageSize: 3 }"
  />
  <p role="status">已选订单 · {{ selected.join(', ') || '—' }}</p>
</template>
