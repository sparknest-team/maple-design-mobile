<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(null)
</script>
<template>
  <mp-space direction="column">
    <p>null means unselected; repeated selection does not deselect. Current value:{{ value }}</p>
    <mp-radio ref="control" v-model="value" :value="false">Select the false option</mp-radio>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.select()">Select</mp-button>
      <mp-button size="sm" @click="control?.focus()">Focus</mp-button>
      <mp-button size="sm" @click="value = null">Reset</mp-button>
    </mp-space>

    <p>
      Read-only controls can receive focus; disabled controls cannot be edited. Enter/Space activates only this control.
    </p>
    <mp-radio :default-value="true" readonly>Read only</mp-radio>
    <mp-radio :default-value="true" disabled>Disabled</mp-radio>
  </mp-space>
</template>
