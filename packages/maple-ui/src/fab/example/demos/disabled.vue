<script setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
  <mp-switch v-model="disabled" />
  <span class="fab-demo-label">禁用: {{ disabled }}</span>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :disabled="disabled" status="primary">
      <mp-button status="info" icon-container
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-label {
  margin-left: 8px;
}
.fab-demo-stage {
  position: relative;
  min-height: 180px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
