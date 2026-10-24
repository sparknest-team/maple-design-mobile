<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" @click.stop="open = !open">切换</mp-button>
  <span class="fab-demo-label">open: {{ open }}</span>
  <div class="fab-demo-stage">
    <mp-fab v-model:open="open" :fixed="false" :popup-container="false" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false" @click="open = false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" variant="tonal" :elevation="false" @click="open = false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
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
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
