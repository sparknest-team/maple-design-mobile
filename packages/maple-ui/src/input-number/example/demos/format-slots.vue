<script setup lang="ts">
import { ref } from 'vue'

const value = ref(12)
const formatter = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const parser = (text: string) => text.replace(/,/g, '')
</script>
<template>
  <mp-input-number v-model="value" :formatter="formatter" :parser="parser" clearable mode="button">
    <template #prepend>预算</template>
    <template #prefix>¥</template>
    <template #suffix>元</template>
    <template #append>含税</template>
    <template #plus>＋</template>
    <template #minus>－</template>
    <template #clear-icon="{ clear }"><button type="button" aria-label="清空金额" @click="clear">×</button></template>
  </mp-input-number>
</template>
