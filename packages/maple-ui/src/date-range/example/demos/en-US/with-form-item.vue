<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const form = ref(null)
const formData = reactive({
  period: [],
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-form ref="form" :model="formData">
      <mp-form-item field="period" label="Period" required>
        <mp-date-range v-model="formData.period" placeholder="Select" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
