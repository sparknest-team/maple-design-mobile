<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]
</script>
<template>
  <section class="radio-demo">
    <div v-for="size in sizes" :key="size">
      <p>{{ size }}</p>
      <mp-radio-group variant="button" :size="size" default-value="week" :options="options" :aria-label="size" />
    </div>
    <p>Vertical and readonly</p>
    <mp-radio-group
      variant="button"
      direction="vertical"
      readonly
      default-value="day"
      :options="options"
      aria-label="Readonly period"
    />
  </section>
</template>
<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.radio-demo p {
  margin: 0 0 8px;
}
</style>
