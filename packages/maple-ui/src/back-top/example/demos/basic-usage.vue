<script setup>
const lists = [...Array(40).keys()]
</script>

<template>
  <div>
    <mp-cell v-for="list in lists" :key="list">Scroll to bottom {{ list }}</mp-cell>
    <mp-back-top :duration="300" />
  </div>
</template>

<style scoped>
.back-top-section {
  position: relative;
}

.back-top-hint {
  margin: 0 0 8px;
  color: var(--mp-color-text-secondary);
  font-size: 14px;
}

.back-top-section__scroll {
  height: 320px;
  overflow: auto;
  border: 1px solid var(--mp-border-color);
  border-radius: 8px;
}
</style>
