<script setup>
import { reactive } from 'vue'

const formData = reactive({ email: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="email" label="Email" help="Used for notifications" extra="Optional">
      <mp-input v-model="formData.email" placeholder="Please input" />
    </mp-form-item>
  </mp-form>
</template>
