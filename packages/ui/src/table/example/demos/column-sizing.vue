<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableColumnData } from '@maple-design/ui-vue'

const showStock = ref(false)
const longNames = ref(false)
const columns = computed<TableColumnData[]>(() => [
  { title: 'SKU', dataIndex: 'sku', width: 76 },
  { title: '商品', dataIndex: 'name', minWidth: 108 },
  ...(showStock.value ? [{ title: '仓库', dataIndex: 'warehouse', minWidth: 140 }] : []),
  { title: '数量', dataIndex: 'qty', width: 64, align: 'right' },
])
const data = computed(() => [
  { key: '1', sku: 'A-01', name: longNames.value ? '带提手的不锈钢保温随行杯' : '随行杯', warehouse: 'WH-01', qty: 32 },
  { key: '2', sku: 'B-02', name: '咖啡豆', warehouse: 'WH-02', qty: 18 },
])
</script>

<template>
  <mp-checkbox v-model="longNames" edit-mode="direct">显示长商品名</mp-checkbox>
  <mp-checkbox v-model="showStock" edit-mode="direct">增加仓库列</mp-checkbox>
  <mp-table :columns="columns" :data="data" :pagination="false" />
</template>
