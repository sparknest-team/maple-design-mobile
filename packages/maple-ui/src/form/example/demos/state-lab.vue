<script setup>
import { reactive as __demoReactive, reactive } from 'vue'

const formData = reactive({ email: '' })
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-form :model="formData" v-bind="__demoState">
      <mp-form-item field="email" label="邮箱" help="用于接收通知" extra="选填">
        <mp-input v-model="formData.email" placeholder="请输入" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
