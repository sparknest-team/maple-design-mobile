<script setup>
import { ref } from 'vue'

const actionValue = ref('')
</script>

<template>
  <mp-search v-model="actionValue" placeholder="Search" show-action action-text="Cancel" />
</template>
