<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="divider = !divider">
      {{ divider ? 'Hide divider' : 'Show divider' }}
    </mp-button>
    <mp-collapse :default-value="[]" :divider="divider">
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

const divider = ref(true)
</script>
