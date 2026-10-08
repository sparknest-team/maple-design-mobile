<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2" expand-trigger="click" :tooltip="false">
      This is a long description demonstrating text truncation inside a constrained container. Activate the text with a
      pointer or keyboard to expand it, and activate it again to collapse. Text follows the available container width.
    </mp-ellipsis>
    <p>Click the text, or focus it and press Enter / Space.</p>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
