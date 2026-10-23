<script setup>
import { ref } from 'vue'

const value = ref('2026-09-22')
const open = ref(false)
const closeRequests = ref(0)
const commits = ref(0)

function requestOpen(next) {
  if (next) {
    open.value = true
  } else {
    closeRequests.value++
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p>关闭请求会被父级拒绝；选择新日期后可再次确认，重复确认不应重复提交。</p>
    <mp-date v-model="value" :open="open" panel-type="calendar" @update:open="requestOpen" @change="commits++">
      <template #actions>
        <mp-button @click="open = false">允许关闭</mp-button>
      </template>
    </mp-date>
    <span data-test="date-transaction-state">值：{{ value }}；提交：{{ commits }}；拒绝关闭：{{ closeRequests }}</span>
  </div>
</template>
