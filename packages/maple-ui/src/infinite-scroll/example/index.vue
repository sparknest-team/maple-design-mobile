<script setup>
import { ref } from 'vue'
import { onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const current = ref(0)
const basicStatus = ref('idle')
const errorStatus = ref('idle')
const customStatus = ref('idle')
const basicItems = ref([])
const errorItems = ref([])
const customItems = ref([])
let failedOnce = false

watchLang(use)
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
  <mp-tabs v-model:active="current" sticky offset-top="14.4vmin">
    <mp-tab>{{ t('basicUsage') }}</mp-tab>
    <mp-tab>{{ t('loadFail') }}</mp-tab>
    <mp-tab>{{ t('customStatus') }}</mp-tab>
  </mp-tabs>

  <mp-tabs-items v-model:active="current">
    <mp-tab-item>
      <mp-infinite-scroll v-model:status="basicStatus" @load="loadBasic">
        <mp-cell v-for="item in basicItems" :key="item">{{ t('listItem') }} {{ item }}</mp-cell>
      </mp-infinite-scroll>
    </mp-tab-item>

    <mp-tab-item>
      <mp-infinite-scroll v-model:status="errorStatus" @load="loadWithError" @retry="loadWithError">
        <mp-cell v-for="item in errorItems" :key="item">{{ t('listItem') }} {{ item }}</mp-cell>
      </mp-infinite-scroll>
    </mp-tab-item>

    <mp-tab-item>
      <mp-infinite-scroll v-model:status="customStatus" bottom-offset="2rem" @load="loadCustom">
        <mp-cell v-for="item in customItems" :key="item">{{ t('listItem') }} {{ item }}</mp-cell>
        <template #loading>{{ t('customLoading') }}</template>
        <template #finished>{{ t('customFinished') }}</template>
      </mp-infinite-scroll>
    </mp-tab-item>
  </mp-tabs-items>
</template>
