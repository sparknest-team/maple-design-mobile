<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ name: '', department: '', contact: '' })
const showExtra = ref(true)
const label = ref('Contact details')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Labels automatically align to the longest visible text. Try renaming or removing the extra field.</p>
    <label><input v-model="showExtra" type="checkbox" /> Allow extra field</label>
    <label>Rename the longest label <input v-model="label" /></label>
    <mp-form :model="model" layout="horizontal" auto-label-width label-align="left">
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="Department"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item v-if="showExtra" field="contact" :label="label">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
