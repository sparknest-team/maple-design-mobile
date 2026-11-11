<script setup>
import { ref } from 'vue'

const outlineValue5 = ref()
const outlineValue6 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue5" variant="outline" placeholder="可清除" clearable>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue6" variant="outline" placeholder="使用插槽自定义清除图标" clearable>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>
  </mp-space>
</template>
