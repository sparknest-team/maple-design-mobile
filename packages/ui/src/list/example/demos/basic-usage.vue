<script setup>
const items = [
  { name: 'Alice', value: '138 0000 0001' },
  { name: 'Bob', value: '138 0000 0002' },
  { name: 'Carol', value: '138 0000 0003' },
]
</script>

<template>
  <mp-list :data="items" bordered>
    <template #header>联系人</template>
    <template #item="{ item, index }">
      <mp-list-item>
        <template #prefix>{{ index + 1 }}</template>
        {{ item.name }}
        <template #suffix>{{ item.value }}</template>
      </mp-list-item>
    </template>
    <template #footer>{{ items.length }} 项</template>
  </mp-list>
</template>
