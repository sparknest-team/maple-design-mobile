<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button @click="open = true">打开弹出层</mp-button>
  <mp-popup v-model:open="open">
    <div style="padding: 24px">
      <p>弹出层的基础内容。</p>
      <mp-button @click="open = false">关闭</mp-button>
    </div>
  </mp-popup>
</template>
