<script setup>
const rows = Array.from({ length: 20 }, (_, index) => ({ id: index, name: '记录 ' + (index + 1) }))
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-list :data="rows" :max-height="180" :scrollbar="false">
      <template #header>原生滚动条</template>
      <template #item="{ item }"
        ><mp-list-item>{{ item.name }}</mp-list-item></template
      >
    </mp-list>
    <mp-list :data="rows" max-height="12rem" :scrollbar="{ type: 'track' }" size="sm" :split="false">
      <template #header>自定义滚动条，无分隔线</template>
      <template #item="{ item }"
        ><mp-list-item>{{ item.name }}</mp-list-item></template
      >
    </mp-list>
  </mp-space>
</template>
