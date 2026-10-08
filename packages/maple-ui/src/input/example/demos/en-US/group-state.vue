<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space>
      <mp-button variant="outline" @click="disabled = !disabled">{{
        disabled ? 'Enable group' : 'Disable group'
      }}</mp-button>
      <mp-button variant="outline" @click="readonly = !readonly">{{
        readonly ? 'Allow editing' : 'Make group readonly'
      }}</mp-button>
    </mp-space>
    <mp-input-group variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input v-model="domain" placeholder="Domain" clearable />
      <mp-input-group-label>.com</mp-input-group-label>
    </mp-input-group>
    <mp-input-group variant="filled" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input v-model="first" placeholder="Inherit group state" clearable />
      <mp-input default-value="Independent override" :disabled="false" :readonly="false" clearable />
    </mp-input-group>
    <mp-input-group size="lg" variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>Password</mp-input-group-label>
      <mp-input-password v-model="password" placeholder="Password toggle inherits disabled" clearable />
    </mp-input-group>
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
const readonly = ref(false)
const domain = ref('example')
const first = ref('Inherited state')
const password = ref('CedarMaple')
</script>
