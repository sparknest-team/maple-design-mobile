<template>
  <mp-table
    :columns="columns"
    :data="data"
    :virtual-list-props="{ height: 400 }"
    :pagination="false" />
</template>

<script lang="ts" setup>
import type { TableColumnData } from '../../types'
import { reactive } from 'vue'
const columns: TableColumnData[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 140,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    minWidth: 400,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    minWidth: 300,
  },
]
const data = reactive(
  Array(1000)
    .fill(null)
    .map((_, index) => ({
      key: String(index),
      name: `User ${index + 1}`,
      address: '32 Park Road, London',
      email: `user.${index + 1}@example.com`,
    })),
)
</script>
