<script setup>
import { onBeforeUnmount, onDeactivated, ref } from 'vue'

const data1 = Array(30).fill('列表项')
const data2 = Array(30).fill('新的列表项')
const isRefresh = ref(false)
const data = ref(data1)
let refreshTimer

function cancelRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = undefined
  isRefresh.value = false
}
onBeforeUnmount(cancelRefresh)
onDeactivated(cancelRefresh)

function refresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    refreshTimer = undefined
    data.value = data.value[0] === '列表项' ? data2 : data1
    isRefresh.value = false
  }, 2000)
}
</script>

<template>
  <div class="pull-refresh-demo__scroller">
    <mp-pull-refresh v-model="isRefresh" :success-duration="2000" @refresh="refresh">
      <mp-cell v-for="(item, index) in data" :key="index" border> {{ item }} {{ index + 1 }} </mp-cell>
    </mp-pull-refresh>
  </div>
</template>

<style scoped>
.pull-refresh-demo__scroller {
  height: 360px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
