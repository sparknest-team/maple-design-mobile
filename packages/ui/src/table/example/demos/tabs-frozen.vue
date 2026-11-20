<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableColumnData } from '@maple-design/ui-vue'

const selected = ref('')
const columns = computed<TableColumnData[]>(() => [
  { title: '门店', dataIndex: 'store', fixed: 'left', width: 82 },
  ...['09:00', '12:00', '15:00', '18:00'].map((title, i) => ({ title, dataIndex: 'sales' + i, minWidth: 86 })),
  { title: '操作', slotName: 'actions', width: 80 },
])
const data = [
  { key: '1', store: 'A01', sales0: 12, sales1: 48, sales2: 33, sales3: 56 },
  { key: '2', store: 'B02', sales0: 18, sales1: 32, sales2: 26, sales3: 47 },
]
</script>

<template>
  <mp-tabs default-value="sales" swipeable>
    <mp-tab-pane name="sales" title="销售">
      <mp-table :columns="columns" :data="data" :pagination="false">
        <template #actions="{ record }">
          <button type="button" @click="selected = record.store">查看</button>
        </template>
      </mp-table>
    </mp-tab-pane>
    <mp-tab-pane name="stores" title="门店">A01 · B02</mp-tab-pane>
  </mp-tabs>
  <p v-if="selected" role="status">当前查看的门店 · {{ selected }}</p>
</template>
