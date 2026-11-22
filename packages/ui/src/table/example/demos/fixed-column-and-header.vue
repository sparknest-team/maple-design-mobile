<template>
  <p style="margin-bottom: 8px">
    同时设置 <code>height</code> 与左右 <code>fixed</code> 列：表头固定 + 横向滚动时固定列保持可见。
  </p>
  <mp-table :columns="columns" :data="data" :height="250" :pagination="false" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { TableColumnData } from '../../types'

const columns: TableColumnData[] = [
  {
    title: 'Date',
    dataIndex: 'date',
    fixed: 'left',
    width: 150,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: 'State',
    dataIndex: 'state',
    width: 120,
  },
  {
    title: 'City',
    dataIndex: 'city',
    width: 120,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    minWidth: 600,
  },
  {
    title: 'Zip',
    dataIndex: 'zip',
    width: 120,
  },
  {
    title: 'Operations',
    dataIndex: 'operations',
    fixed: 'right',
    width: 120,
  },
]

const data = reactive(
  Array.from({ length: 10 }, (_, index) => ({
    key: String(index + 1),
    date: `2016-05-${String(index + 1).padStart(2, '0')}`,
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    operations: 'Detail',
  })),
)
</script>
