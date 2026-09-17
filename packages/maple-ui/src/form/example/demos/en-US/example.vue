<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', email: '', department: '', confirmed: false })
</script>

<template>
  <mp-form :model="formData" scroll-to-error="start">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
        <mp-input v-model="formData.username" placeholder="Username" />
      </mp-form-item>
      <mp-form-item field="email" :rules="[(value) => !!value || 'Email is required']">
        <mp-input v-model="formData.email" placeholder="Email" />
      </mp-form-item>
      <mp-form-item field="department" :rules="[(value) => !!value || 'Department is required']">
        <mp-select v-model="formData.department" placeholder="Department">
          <mp-option label="Product" />
          <mp-option label="Engineering" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="confirmed" :rules="[(value) => !!value || 'Please confirm']">
        <mp-checkbox v-model="formData.confirmed">I confirm the information</mp-checkbox>
      </mp-form-item>
    </mp-space>
  </mp-form>
</template>
