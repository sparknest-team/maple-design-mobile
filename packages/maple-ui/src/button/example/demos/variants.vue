<script setup lang="ts">
import { ref } from 'vue'

const variant = ref('default')
const size = ref('md')
const variants = ['default', 'text', 'outline', 'tonal']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Variant</span>
        <mp-select
          v-model="variant"
          :clearable="false"
          :options="variants.map((value) => ({ label: value, value }))"
          aria-label="Button variant"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          :clearable="false"
          :options="sizes.map((value) => ({ label: value, value }))"
          aria-label="Button size"
        />
      </div>
    </mp-space>
    <mp-space wrap>
      <mp-button v-for="status in statuses" :key="status" :status="status" :variant="variant" :size="size">{{
        status
      }}</mp-button>
    </mp-space>
  </mp-space>
</template>
