<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumnData, TableData } from '@maple-design/ui-vue'

const columns = computed<TableColumnData[]>(() => [
  { title: '订单', dataIndex: 'order' },
  { title: '状态', dataIndex: 'shipped', slotName: 'state' },
  { title: '金额（元）', dataIndex: 'amount', align: 'right' },
])
const data = [
  { key: '1', order: 'PO-101', shipped: true, amount: 120 },
  { key: '2', order: 'PO-102', shipped: false, amount: 85 },
]
const summary = ({ data: rows }: { data: TableData[] }) => [
  {
    order: '合计',
    amount: rows.reduce((sum, row) => sum + row.amount, 0),
  },
]
</script>

<template>
  <mp-table :columns="columns" :data="data" :summary="summary" :pagination="false">
    <template #state="{ record }">
      <span v-if="record.shipped !== undefined">{{ record.shipped ? '已发货' : '待发货' }}</span>
    </template>
  </mp-table>
</template>
