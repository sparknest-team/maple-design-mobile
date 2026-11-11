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
      <mp-form-item field="period" label="时间段" required>
        <mp-date-range v-model="formData.period" placeholder="请选择" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
