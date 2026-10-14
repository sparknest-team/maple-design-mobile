<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ name: '', notes: '' })
</script>

<template>
  <mp-form :model="model" layout="vertical">
    <mp-form-item
      field="name"
      label="Public name"
      required
      show-colon
      tooltip="Shown on your profile."
      :label-attrs="{ for: 'decorated-name' }"
    >
      <mp-input id="decorated-name" v-model="model.name" placeholder="Enter a public name" />
    </mp-form-item>
    <mp-form-item
      field="notes"
      label="Notes"
      label-component="div"
      :content-flex="false"
      content-class="decoration-grid"
    >
      <mp-input v-model="model.notes" placeholder="Custom content layout" />
      <small>Use content-flex=false to own the layout.</small>
    </mp-form-item>
  </mp-form>
</template>

<style scoped>
.decoration-grid {
  display: grid;
  gap: 8px;
}
</style>
