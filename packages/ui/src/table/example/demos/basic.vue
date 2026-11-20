<script setup lang="ts">
const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Salary', dataIndex: 'salary' },
  { title: 'Address', dataIndex: 'address' },
]
const data = [
  { key: '1', name: 'Jane Doe', salary: 23000, address: '32 Park Road, London' },
  { key: '2', name: 'Alisa Ross', salary: 25000, address: '35 Park Road, London' },
  { key: '3', name: 'Kevin Sandra', salary: 22000, address: '31 Park Road, London' },
]
</script>
<template>
  <mp-table :columns="columns" :data="data" :pagination="false" />
</template>
