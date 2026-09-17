<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', department: '' })
</script>

<template>
  <mp-form :model="formData" layout="horizontal">
    <mp-form-item field="username" label="Username" required>
      <mp-input v-model="formData.username" placeholder="Please input" />
    </mp-form-item>
    <mp-form-item field="department" label="Department">
      <mp-select v-model="formData.department" placeholder="Please select">
        <mp-option label="Product" />
        <mp-option label="Engineering" />
      </mp-select>
    </mp-form-item>
  </mp-form>
</template>
