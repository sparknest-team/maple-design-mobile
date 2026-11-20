<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableColumnData } from '@maple-design/ui-vue'

const showStock = ref(false)
const longNames = ref(false)
const columns = computed<TableColumnData[]>(() => [
  { title: 'SKU', dataIndex: 'sku', width: 76 },
  { title: 'Product', dataIndex: 'name', minWidth: 108 },
  ...(showStock.value ? [{ title: 'Warehouse', dataIndex: 'warehouse', minWidth: 140 }] : []),
  { title: 'Qty', dataIndex: 'qty', width: 64, align: 'right' },
])
const data = computed(() => [
  {
    key: '1',
    sku: 'A-01',
    name: longNames.value ? 'Insulated stainless steel travel mug' : 'Mug',
    warehouse: 'WH-01',
    qty: 32,
  },
  { key: '2', sku: 'B-02', name: 'Coffee beans', warehouse: 'WH-02', qty: 18 },
])
</script>

<template>
  <mp-checkbox v-model="longNames" edit-mode="direct">Long product name</mp-checkbox>
  <mp-checkbox v-model="showStock" edit-mode="direct">Warehouse column</mp-checkbox>
  <mp-table :columns="columns" :data="data" :pagination="false" />
</template>
