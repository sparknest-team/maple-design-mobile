<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', contact: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Fixed labels use 6rem; one field overrides this to 8rem. Numeric flex means a grow ratio.</p>
    <mp-form :model="model" layout="horizontal" label-col-flex="6rem" label-align="left">
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="contact" label="Contact details" label-col-flex="8rem">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
