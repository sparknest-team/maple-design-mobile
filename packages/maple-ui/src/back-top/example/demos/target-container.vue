<script setup>
const lists = [...Array(40).keys()]
</script>

<template>
  <p class="back-top-hint">请在下方容器内滚动，按钮会出现在容器右下角</p>
  <div class="back-top-section">
    <div id="target-scroll" class="back-top-section__scroll">
      <mp-cell v-for="list in lists" :key="`target-${list}`">Scroll in container {{ list }}</mp-cell>
    </div>
    <mp-back-top
      target-container="#target-scroll"
      :visible-height="120"
      :duration="300"
      :popup-container="false"
      right="16"
      bottom="16"
    />
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
