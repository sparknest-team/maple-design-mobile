<script setup lang="ts">
import { ref } from 'vue'

const timestamp = ref(new Date(2026, 8, 15).getTime())
const objectValue = ref(new Date(2026, 8, 16))
</script>
<template>
  <div class="date-contract-demo">
    <mp-date v-model="timestamp" value-format="timestamp" format="DD/MM/YYYY" />
    <p>时间戳模型：{{ timestamp }}</p>
    <mp-date v-model="objectValue" value-format="Date" format="YYYY年MM月DD日" />
    <p>Date 对象模型：{{ objectValue }}</p>
  </div>
</template>
<style scoped>
.date-contract-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.date-contract-demo p {
  margin: 0;
}
</style>
