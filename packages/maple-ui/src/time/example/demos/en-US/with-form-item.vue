<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const form = ref(null)
const formData = reactive({
  alarm: undefined,
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-form ref="form" :model="formData">
      <mp-form-item field="alarm" label="Alarm" required>
        <mp-time v-model="formData.alarm" format="HH:mm" placeholder="Select" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
