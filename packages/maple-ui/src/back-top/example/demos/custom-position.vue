<script setup>
const lists = [...Array(40).keys()]
</script>

<template>
  <div class="back-top-section">
    <div id="position-scroll" class="back-top-section__scroll">
      <mp-cell v-for="list in lists" :key="`position-${list}`">Scroll to bottom {{ list }}</mp-cell>
    </div>
    <mp-back-top target-container="#position-scroll" :duration="300" right="80" bottom="80" />
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
