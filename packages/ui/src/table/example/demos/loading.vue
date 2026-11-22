<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Salary', dataIndex: 'salary' },
]
const data = [{ key: '1', name: 'Jane Doe', salary: 23000 }]
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-switch v-model="loading" aria-label="Loading" />
    <mp-table :columns="columns" :data="data" :loading="loading" :pagination="false" />
  </mp-space>
</template>
