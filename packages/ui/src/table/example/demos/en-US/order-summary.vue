<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumnData, TableData } from '@maple-design/ui-vue'

const columns = computed<TableColumnData[]>(() => [
  { title: 'Order', dataIndex: 'order' },
  { title: 'State', dataIndex: 'shipped', slotName: 'state' },
  { title: 'Amount (¥)', dataIndex: 'amount', align: 'right' },
])
const data = [
  { key: '1', order: 'PO-101', shipped: true, amount: 120 },
  { key: '2', order: 'PO-102', shipped: false, amount: 85 },
]
const summary = ({ data: rows }: { data: TableData[] }) => [
  {
    order: 'Total',
    amount: rows.reduce((sum, row) => sum + row.amount, 0),
  },
]
</script>

<template>
  <mp-table :columns="columns" :data="data" :summary="summary" :pagination="false">
    <template #state="{ record }">
      <span v-if="record.shipped !== undefined">{{ record.shipped ? 'Shipped' : 'Pending' }}</span>
    </template>
  </mp-table>
</template>
