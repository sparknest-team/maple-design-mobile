<script setup lang="ts">
import { computed } from 'vue'

const columns = computed(() => [
  { title: 'Shipment', dataIndex: 'shipment' },
  { title: 'Parcels', dataIndex: 'parcels', width: 88 },
])
const data = Array.from({ length: 1000 }, (_, i) => ({
  key: String(i + 1),
  shipment: 'S-' + (10001 + i),
  parcels: 1 + (i % 4),
}))
</script>

<template>
  <mp-table
    :columns="columns"
    :data="data"
    :pagination="false"
    :expandable="{ width: 44 }"
    :height="280"
    :virtual-list-props="{ height: 280, estimatedSize: 44, fixedSize: false }"
    :default-expanded-keys="['1']"
  >
    <template #expand-row="{ record }">
      <div v-for="n in record.parcels" :key="n">Tracking number · {{ record.shipment }}-{{ n }}</div>
    </template>
  </mp-table>
</template>
