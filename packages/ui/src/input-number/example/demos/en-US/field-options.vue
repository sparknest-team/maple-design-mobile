<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['outline', 'filled', 'standard'] as const
</script>
<template>
  <div class="number-demo">
    <label v-for="size in sizes" :key="size">{{ size }}<mp-input-number :size="size" :default-value="12" /></label>
    <label v-for="variant in variants" :key="variant"
      >{{ variant }}<mp-input-number :variant="variant" placeholder="Amount" :default-value="12"
    /></label>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
