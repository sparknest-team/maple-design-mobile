<script setup lang="ts">
import { reactive, useId } from 'vue'

const demoId = useId()
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
      :label-attrs="{ for: `${demoId}-name` }"
    >
      <mp-input :id="`${demoId}-name`" v-model="model.name" placeholder="Enter a public name" />
    </mp-form-item>
    <mp-form-item
      field="notes"
      label="Notes"
      label-component="div"
      :label-attrs="{ id: `${demoId}-notes-label` }"
      :content-flex="false"
      content-class="decoration-grid"
    >
      <mp-input v-model="model.notes" :aria-labelledby="`${demoId}-notes-label`" placeholder="Custom content layout" />
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
