<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', department: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Labels use responsive 6/24 columns; below 576px each occupies a full row.</p>
    <mp-form
      :model="model"
      layout="horizontal"
      label-align="left"
      :label-col-props="{ span: 6, xs: 24, sm: 6 }"
      :wrapper-col-props="{ span: 18, xs: 24, sm: 18 }"
    >
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="Department"><mp-input v-model="model.department" /></mp-form-item>
    </mp-form>
  </mp-space>
</template>
