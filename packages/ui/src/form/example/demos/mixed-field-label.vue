<script setup>
import { useId } from 'vue'

const contactLabelId = useId()
</script>

<template>
  <mp-form-item label="Contact" label-component="span" :label-attrs="{ id: contactLabelId }">
    <div role="group" :aria-labelledby="contactLabelId">
      <mp-input aria-label="Email" />
      <input aria-label="Phone" />
    </div>
  </mp-form-item>
</template>
