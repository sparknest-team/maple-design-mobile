<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const topDivider = ref(false)
const bottomDivider = ref(false)
</script>

<template>
  <mp-button @click="open = true">分割线 / Dividers</mp-button>
  <mp-dialog v-model:open="open" title="分割线 / Dividers" :top-divider="topDivider" :bottom-divider="bottomDivider">
    <mp-space direction="column">
      <mp-checkbox v-model="topDivider">top-divider</mp-checkbox>
      <mp-checkbox v-model="bottomDivider">bottom-divider</mp-checkbox>
      <p>分割线默认关闭，可分别开启。 / Dividers are off by default and can be enabled independently.</p>
    </mp-space>
  </mp-dialog>
</template>
