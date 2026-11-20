<script setup lang="ts">
const columns = [{ title: 'Name', dataIndex: 'name' }, { title: 'Address', dataIndex: 'address' }]
</script>
<template>
  <mp-table :columns="columns" :data="[]" :pagination="false">
    <template #empty>暂无记录，请调整筛选条件后重试。</template>
  </mp-table>
</template>
