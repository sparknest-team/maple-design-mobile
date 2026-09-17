<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maplejs/maple-cli/client'

const current = ref(0)
const basicStatus = ref('idle')
const errorStatus = ref('idle')
const customStatus = ref('idle')
const basicItems = ref([])
const errorItems = ref([])
const customItems = ref([])
let failedOnce = false

onThemeChange()

function append(items, status) {
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      items.value.push(items.value.length + 1)
    }
    status.value = items.value.length >= 60 ? 'finished' : 'idle'
  }, 600)
}

function loadBasic() {
  append(basicItems, basicStatus)
}

function loadWithError() {
  setTimeout(() => {
    if (!failedOnce && errorItems.value.length === 20) {
      failedOnce = true
      errorStatus.value = 'error'
      return
    }
    for (let i = 0; i < 20; i++) {
      errorItems.value.push(errorItems.value.length + 1)
    }
    errorStatus.value = errorItems.value.length >= 60 ? 'finished' : 'idle'
  }, 600)
}

function loadCustom() {
  append(customItems, customStatus)
}
</script>

<template>
  <mp-tabs v-model:active="current">
    <mp-tabs-navs>
      <mp-tab-nav :key="0">基本使用</mp-tab-nav>
      <mp-tab-nav :key="1">失败重试</mp-tab-nav>
      <mp-tab-nav :key="2">自定义状态</mp-tab-nav>
    </mp-tabs-navs>

    <mp-tabs-items>
      <mp-tab-item :key="0">
        <mp-infinite-scroll v-model:status="basicStatus" @load="loadBasic">
          <mp-cell v-for="item in basicItems" :key="item">列表项 {{ item }}</mp-cell>
        </mp-infinite-scroll>
      </mp-tab-item>

      <mp-tab-item :key="1">
        <mp-infinite-scroll v-model:status="errorStatus" @load="loadWithError" @retry="loadWithError">
          <mp-cell v-for="item in errorItems" :key="item">列表项 {{ item }}</mp-cell>
        </mp-infinite-scroll>
      </mp-tab-item>

      <mp-tab-item :key="2">
        <mp-infinite-scroll v-model:status="customStatus" bottom-offset="2rem" @load="loadCustom">
          <mp-cell v-for="item in customItems" :key="item">列表项 {{ item }}</mp-cell>
          <template #loading>正在努力加载</template>
          <template #finished>已加载全部内容</template>
        </mp-infinite-scroll>
      </mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
