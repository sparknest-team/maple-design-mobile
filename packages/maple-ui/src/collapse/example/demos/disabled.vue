<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? 'Enable' : 'Disable' }}
    </mp-button>
    <mp-collapse :default-value="[1]">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="1" :disabled="disabled">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2" :disabled="disabled">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>
