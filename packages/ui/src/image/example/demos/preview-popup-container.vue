<template>
  <div id="image-demo-preview-popup-container" class="popup-container">
    <mp-image
      width="160"
      src="/cat.jpg"
      :preview-props="{
        popupContainer: '#image-demo-preview-popup-container',
        closable: false,
      }"
    />
  </div>
</template>

<style scoped>
.popup-container {
  position: relative;
  height: 220px;
  padding: 16px;
  overflow: hidden;
  background: var(--mp-color-fill-2);
}
</style>
