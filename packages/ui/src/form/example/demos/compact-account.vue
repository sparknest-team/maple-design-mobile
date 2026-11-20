<script setup>
import { reactive, ref } from 'vue'

const compact = ref(false)
const model = reactive({ account: '' })
</script>

<template>
  <mp-checkbox v-model="compact">紧凑布局</mp-checkbox>
  <mp-form :model="model">
    <mp-form-item label="账户" :layout="compact ? 'vertical' : 'horizontal'" :hide-label="compact">
      <mp-form-item field="account" no-style>
        <mp-input v-model="model.account" aria-label="账户" />
      </mp-form-item>
    </mp-form-item>
  </mp-form>
</template>
