<script setup lang="ts">
import { ref } from 'vue'

const value = ref(12)
const formatter = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const parser = (text: string) => text.replace(/,/g, '')
</script>
<template>
  <mp-input-number v-model="value" :formatter="formatter" :parser="parser" clearable mode="button">
    <template #prepend>Budget</template>
    <template #prefix>¥</template>
    <template #suffix>CNY</template>
    <template #append>Tax included</template>
    <template #plus>＋</template>
    <template #minus>－</template>
    <template #clear-icon="{ clear }"
      ><button type="button" aria-label="Clear amount" @click="clear">×</button></template
    >
  </mp-input-number>
</template>
