<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete default-value="Cedar" :options="options" readonly />
    <mp-auto-complete default-value="Maple" :options="options" disabled />
    <mp-auto-complete default-value="Invalid" :options="options" error clearable />
  </mp-space>
</template>

<script setup lang="ts">
const options = ['Cedar', 'Maple']
</script>
