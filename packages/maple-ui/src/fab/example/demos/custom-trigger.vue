<template>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false">
      <mp-button status="info" variant="tonal" :elevation="false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" variant="tonal" :elevation="false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
      <template #trigger="{ open, triggerProps }">
        <mp-button v-bind="triggerProps" class="custom-trigger" status="primary">
          <template #icon>
            <m-icon-heart-fill v-if="open" :size="24" />
            <m-icon-heart-half-full v-else :size="24" />
          </template>
        </mp-button>
      </template>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
.custom-trigger {
  width: 64px !important;
  height: 64px !important;
  border-radius: 8px !important;
}
</style>
