<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '10:00'])
const open = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <p>非受控初始值，无需绑定 v-model</p>
    <mp-time-range :default-value="['09:00', '10:00']" format="HH:mm" clearable />
    <p>受控值与展开状态</p>
    <mp-time-range v-model="value" v-model:open="open" format="HH:mm" clearable />
    <span>{{ value }} / {{ open }}</span>
  </div>
</template>
