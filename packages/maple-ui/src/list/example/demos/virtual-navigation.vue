<script setup>
import { ref } from 'vue'

const list = ref()
const rows = Array.from({ length: 1000 }, (_, id) => ({ id, name: '记录 ' + (id + 1) }))
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space wrap>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'top' })">第 500 项置顶</mp-button>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'bottom' })">第 500 项置底</mp-button>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'auto' })">仅滚动到可见</mp-button>
    </mp-space>
    <mp-list
      ref="list"
      :data="rows"
      :virtual-list-props="{ height: 240, itemKey: 'id', estimatedSize: 48, buffer: 10 }"
    >
      <template #item="{ item, index }"
        ><mp-list-item
          ><template #prefix>{{ index + 1 }}</template
          >{{ item.name }}</mp-list-item
        ></template
      >
    </mp-list>
  </mp-space>
</template>
