<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="offset = !offset">
      {{ offset ? 'Hide offset' : 'Show offset' }}
    </mp-button>
    <mp-collapse v-model="activeNames" :offset="offset">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const offset = ref(true)
const activeNames = ref<(string | number)[]>(['1', '2'])
</script>
