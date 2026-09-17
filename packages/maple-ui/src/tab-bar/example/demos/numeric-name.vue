<script setup>
import { ref } from 'vue'

const active = ref(0)
const reversed = ref(false)
</script>
<template>
  <p>名称 0、10、20 是稳定标识，重排后仍选中同一名称，而不是原来的位置。</p>
  <mp-button @click="reversed = !reversed">反转顺序</mp-button>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="id in reversed ? [20, 10, 0] : [0, 10, 20]" :key="id" :name="id" :label="String(id)" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中: {{ active }}</p>
</template>
