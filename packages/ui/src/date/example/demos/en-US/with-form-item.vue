<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const form = ref(null)
const formData = reactive({
  birthday: undefined,
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-form ref="form" :model="formData">
      <mp-form-item field="birthday" label="Birthday" required>
        <mp-date v-model="formData.birthday" placeholder="Select" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
