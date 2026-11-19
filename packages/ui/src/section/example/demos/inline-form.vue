<script setup lang="ts">
import { reactive } from 'vue'
import { copy } from '../messages'

const model = reactive({ name: '', department: '' })
</script>

<template>
  <mp-form :model="model" layout="inline" edit-mode="direct">
    <mp-section :title="copy.memberDetails" show-end-divider>
      <mp-form-item field="name" :label="copy.name">
        <mp-input v-model="model.name" />
      </mp-form-item>
      <mp-form-item field="department" :label="copy.department">
        <mp-input v-model="model.department" />
      </mp-form-item>
    </mp-section>
  </mp-form>
</template>
