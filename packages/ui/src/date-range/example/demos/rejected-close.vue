<script setup>
import { ref } from 'vue'

const value = ref(['2026-09-22', '2026-09-24'])
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
  <mp-space direction="column" size="12px">
    <p>关闭请求会被父级拒绝；修改起止日期后可再次确认，重复确认不应重复提交。</p>
    <mp-date-range v-model="value" :open="open" panel-type="calendar" @update:open="requestOpen" @change="commits++">
      <template #actions>
        <mp-button @click="open = false">允许关闭</mp-button>
      </template>
    </mp-date-range>
    <span data-test="date-range-transaction-state"
      >值：{{ value.join(' ~ ') }}；提交：{{ commits }}；拒绝关闭：{{ closeRequests }}</span
    >
  </mp-space>
</template>
