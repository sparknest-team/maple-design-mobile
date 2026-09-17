<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', department: '' })
</script>

<template>
  <mp-form :model="formData" layout="horizontal">
    <mp-form-item field="username" label="用户名" required>
      <mp-input v-model="formData.username" placeholder="请输入" />
    </mp-form-item>
    <mp-form-item field="department" label="部门">
      <mp-select v-model="formData.department" placeholder="请选择">
        <mp-option label="产品部" />
        <mp-option label="研发部" />
      </mp-select>
    </mp-form-item>
  </mp-form>
</template>
