<script setup>
import { reactive, ref } from 'vue'

const compact = ref(false)
const model = reactive({ account: '' })
</script>

<template>
  <mp-checkbox v-model="compact">Compact layout</mp-checkbox>
  <mp-form :model="model">
    <mp-form-item label="Account" :layout="compact ? 'vertical' : 'horizontal'" :hide-label="compact">
      <mp-form-item field="account" no-style>
        <mp-input v-model="model.account" aria-label="Account" />
      </mp-form-item>
    </mp-form-item>
  </mp-form>
</template>
