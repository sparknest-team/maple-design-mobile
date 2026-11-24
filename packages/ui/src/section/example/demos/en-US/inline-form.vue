<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ name: '', department: '' })
</script>

<template>
  <mp-form :model="model" layout="inline" edit-mode="direct">
    <mp-section title="Member details" show-marker>
      <mp-form-item field="name" label="Name">
        <mp-input v-model="model.name" />
      </mp-form-item>
      <mp-form-item field="department" label="Team">
        <mp-input v-model="model.department" />
      </mp-form-item>
    </mp-section>
  </mp-form>
</template>
