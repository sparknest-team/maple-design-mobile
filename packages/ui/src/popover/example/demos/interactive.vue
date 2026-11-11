<script setup>
import { ref } from 'vue'

const open = ref(false)
const draft = ref('')
</script>

<template>
  <mp-popover v-model:open="open" title="快速备注">
    <mp-button status="primary">编辑备注</mp-button>
    <template #content>
      <mp-space direction="column">
        <mp-input v-model="draft" placeholder="关闭后再次打开，草稿仍会保留" />
        <mp-button status="primary" block @click="open = false">完成</mp-button>
      </mp-space>
    </template>
  </mp-popover>
</template>
